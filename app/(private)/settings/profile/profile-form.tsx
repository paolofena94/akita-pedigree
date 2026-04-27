"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { toast } from "sonner" 

const profileSchema = z.object({
  username: z.string().min(3, "Minimo 3 caratteri").max(25, "Massimo 25 caratteri"),
  bio: z.string().max(160, "Massimo 160 caratteri").nullable(),
  avatar_url: z.url().nullable().optional(),
})

export default function ProfileForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData?.username || "",
      bio: initialData?.bio || "",
      avatar_url: initialData?.avatar_url || "",
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setLoading(true)
    try {
      // TODO: Inseriremo qui la Server Action: await updateProfile(values)
      console.log(values)
      
      // Simuliamo un'attesa del server
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Profilo aggiornato con successo!")
    } catch (error) {
      toast.error("Errore durante l'aggiornamento del profilo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Username</FieldLabel>
            <Input 
              {...field} 
              id={field.name} 
              placeholder="akitalover" 
              maxLength={25} 
              aria-invalid={fieldState.invalid} 
              disabled={loading} 
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            <p className="text-[13px] text-muted-foreground mt-1">
              Il tuo nome pubblico univoco.
            </p>
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
              placeholder="Appassionato di Akita Inu dal 2010..." 
              className="resize-none"
              maxLength={160}
              aria-invalid={fieldState.invalid} 
              disabled={loading}
              value={field.value || ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Salvataggio in corso...' : 'Salva modifiche'}
      </Button>
    </form>
  )
}