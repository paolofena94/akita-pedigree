import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileForm from "./_components/profile-form"
import { redirect } from "next/navigation"
import { getCurrentUserProfile } from "@/lib/db/user"
import AvatarUpload from "./_components/avatar-upload"

export default async function SettingsProfilePage() {
  const { user, profile } = await getCurrentUserProfile()

  if (!user) redirect("/login")
  if (!profile) return <div className="p-8 text-center text-muted-foreground">Profile data not found.</div>

  return (
    <div className="mt-0">
      
      {/* 1. Aumentato il padding generale della Card (p-6 md:p-10) */}
      <Card className="shadow-sm border-transparent md:border-muted p-6 md:p-10 rounded-3xl">
        
        {/* 2. Aumentato il margine inferiore dell'Header (mb-8) */}
        <CardHeader className="mb-6 px-0 pt-0 ">
          <CardTitle className="text-2xl font-bold tracking-tight">Public Profile</CardTitle>
          <CardDescription className="text-base">
            This is how you will be displayed to other users on the portal.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-0 pb-4">
          <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-8 justify-between items-start">
            
            {/* SINISTRA: Prende tutto lo spazio che gli serve, ma si ferma a max-w-xl (circa 576px) */}
            <div className="w-full md:w-3/5 max-w-xl shrink-0">
              <ProfileForm initialData={profile} />
            </div>

            {/* DESTRA: flex-1 lo fa espandere in tutto lo spazio rimanente a destra, 
                e items-center posiziona l'avatar perfettamente al centro di questa "colonna" */}
            <aside className="flex-1 w-full flex flex-col items-center border-b md:border-none pb-8 md:pb-0">
              <AvatarUpload 
                currentAvatarUrl={profile.avatar_url} 
                username={profile.username} 
              />
            </aside>

          </div>
        </CardContent>
        
      </Card>
      
    </div>
  )
}