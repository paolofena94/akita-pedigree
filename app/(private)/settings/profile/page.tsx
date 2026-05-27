import { Suspense } from "react" // <-- Importato per gestire il caricamento asincrono
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileForm from "./_components/profile-form"
import { redirect } from "next/navigation"
import { getCurrentUserSnippet } from "@/lib/db/user"
import AvatarUpload from "./_components/avatar-upload"

// --- 1. IL SOTTO-COMPONENTE ASINCRONO (DINAMICO) ---
// Questo componente si occupa solo di scaricare i dati e renderizzare il Form + Avatar
async function ProfileSettingsFormContainer() {
  const { user, profile } = await getCurrentUserSnippet()

  if (!user) redirect("/login")
  if (!profile) return <div className="p-8 text-center text-muted-foreground">Profile data not found.</div>

  return (
    <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-8 justify-between items-start">
      {/* SINISTRA: Form del Profilo */}
      <div className="w-full md:w-3/5 max-w-xl shrink-0">
        <ProfileForm initialData={profile} />
      </div>

      {/* DESTRA: Zona Upload Avatar */}
      <aside className="flex-1 w-full flex flex-col items-center border-b md:border-none pb-8 md:pb-0">
        <AvatarUpload 
          currentAvatarUrl={profile.avatar_url} 
          username={profile.username} 
        />
      </aside>
    </div>
  )
}

// --- 2. UNO SCHELETRO DI CARICAMENTO (SKELETON) ---
// Questo apparirà per una frazione di secondo al posto del form mentre Supabase risponde
function ProfileSettingsSkeleton() {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-slate-800 animate-spin" />
      <p className="text-xs text-slate-400 font-medium">Loading profile data...</p>
    </div>
  )
}

// --- 3. IL COMPONENTE PRINCIPALE (LA SCOCCA STATICA) ---
export default function SettingsProfilePage() {
  return (
    <div className="mt-0">
      <Card className="shadow-sm border-transparent md:border-muted p-6 md:p-10 rounded-3xl">
        
        <CardHeader className="mb-6 px-0 pt-0 ">
          <CardTitle className="text-2xl font-bold tracking-tight">Public Profile</CardTitle>
          <CardDescription className="text-base">
            This is how you will be displayed to other users on the portal.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-0 pb-4">
          {/* Avvolgiamo chirurgicamente solo il container dei dati dentro Suspense.
            L'errore sparisce e la pagina si caricherà istantaneamente mostrando subito il titolo!
          */}
          <Suspense fallback={<ProfileSettingsSkeleton />}>
            <ProfileSettingsFormContainer />
          </Suspense>
        </CardContent>
        
      </Card>
    </div>
  )
}