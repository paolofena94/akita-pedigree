"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { toast } from "sonner"
import { ProfileInput, userProfileSchema } from "@/lib/validations/user"
import { updateUserProfileAction } from "@/app/actions/user"

export default function ProfileForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)

  const form = useForm<ProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: initialData?.username || "",
      bio: initialData?.bio || "",
    },
  })

  async function onSubmit(values: ProfileInput) {
    setLoading(true)
    try {
      const changedValues: Partial<ProfileInput> = {};

      if (values.username !== (initialData?.username || "")) {
        changedValues.username = values.username;
      }
      if (values.bio !== (initialData?.bio || "")) {
        changedValues.bio = values.bio;
      }

      if (Object.keys(changedValues).length === 0) {
        toast.info("No changes detected.")
        setLoading(false)
        return
      }

      const result = await updateUserProfileAction(changedValues)

      if (result.success) {
        form.reset(values)
        toast.success("Profile updated successfully!")
      } else {
        toast.error(result.error || "An unknown error occurred.")
      }

    } catch (error) {
      toast.error("A critical error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Username</FieldLabel>
            <p className="text-[13px] text-muted-foreground">
              Your unique public display name.
            </p>
            <Input
              {...field}
              id={field.name}
              placeholder="akitalover"
              maxLength={25}
              aria-invalid={fieldState.invalid}
              disabled={loading}
              className="rounded-xl h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="bio"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              placeholder="Passionate about Akita Inus since 2010..."
              className="resize-none rounded-xl min-h-25"
              maxLength={160}
              aria-invalid={fieldState.invalid}
              disabled={loading}
              value={field.value ?? ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="pt-2">
        <Button type="submit" disabled={loading} className="rounded-full px-6">
          {loading ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}