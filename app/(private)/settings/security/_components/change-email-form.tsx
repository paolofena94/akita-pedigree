"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"
import { Mail } from "lucide-react"
import { updateEmailAction } from "@/app/actions/security"

export default function ChangeEmailForm({ currentEmail }: { currentEmail: string | undefined }) {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleUpdateEmail(formData: FormData) {
    setLoading(true)
    const result = await updateEmailAction(formData)
    
    if (result.success) {
      toast.success("Check your new email inbox for a confirmation link!")
      formRef.current?.reset() // Svuota il campo
    } else {
      toast.error(result.error)
    }
    setLoading(false)
  }

  return (
    <form ref={formRef} action={handleUpdateEmail} className="space-y-6">
      {/* max-w-md frena la larghezza del blocco di input */}
      <div className="space-y-12 max-w-md">
        <div className="space-y-1">
          <label className="text-[13px] font-medium text-muted-foreground">Current Email</label>
          <p className="text-sm font-medium">{currentEmail}</p>
        </div>

        <Field>
          <FieldLabel>New Email Address</FieldLabel>
          <Input name="email" type="email" placeholder="Enter new email..." required className="rounded-xl h-11" disabled={loading} />
        </Field>
      </div>

      <Button type="submit" disabled={loading} className="rounded-full px-6 gap-2">
        <Mail className="w-4 h-4" />
        {loading ? "Updating..." : "Update Email"}
      </Button>
    </form>
  )
}