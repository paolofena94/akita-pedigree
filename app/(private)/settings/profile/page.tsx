import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ProfileForm from "./profile-form"

export default async function SettingsProfilePage() {
  const supabase = await createClient()

  // Recuperiamo i dati dell'utente loggato
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Recuperiamo il profilo pubblico dal database public.users
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profilo</h3>
        <p className="text-sm text-muted-foreground">
          Questo è il modo in cui verrai visualizzato dagli altri utenti sul portale.
        </p>
      </div>
      <Separator />
      <ProfileForm initialData={profile} />
    </div>
  )
}