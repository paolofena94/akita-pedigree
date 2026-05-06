"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"
import { KeyRound } from "lucide-react"
import { updatePasswordAction } from "@/app/actions/security"

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleUpdatePassword(formData: FormData) {
    setLoading(true)
    const result = await updatePasswordAction(formData)
    
    if (result.success) {
      toast.success("Password updated successfully!")
      formRef.current?.reset() // Svuota i campi password
    } else {
      toast.error(result.error)
    }
    setLoading(false)
  }

  return (
    <form ref={formRef} action={handleUpdatePassword} className="space-y-6">
      <div className="space-y-5 max-w-md">
        <Field>
          <FieldLabel>Current Password</FieldLabel>
          <Input name="current" type="password" placeholder="••••••••" required className="rounded-xl h-11" disabled={loading} />
        </Field>

        <Field>
          <FieldLabel>New Password</FieldLabel>
          <Input name="new" type="password" placeholder="••••••••" required className="rounded-xl h-11" disabled={loading} />
        </Field>
        
        <Field>
          <FieldLabel>Confirm New Password</FieldLabel>
          <Input name="confirm" type="password" placeholder="••••••••" required className="rounded-xl h-11" disabled={loading} />
        </Field>
      </div>

      <Button type="submit" disabled={loading} className="rounded-full px-6 gap-2">
        <KeyRound className="w-4 h-4" />
        {loading ? "Saving..." : "Update Password"}
      </Button>
    </form>
  )
}