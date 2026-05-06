import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUserProfile } from "@/lib/db/user"
import { redirect } from "next/navigation"
import ChangeEmailForm from "./_components/change-email-form"
import ChangePasswordForm from "./_components/change-password-form"
import DeleteAccountSection from "./_components/delete-account-section"

export default async function SecurityPage() {
  const { user } = await getCurrentUserProfile()

  if (!user) redirect("/login")

  // Controlliamo se l'utente ha usato una password o un provider social (Google, GitHub, ecc.)
  const isPasswordUser = user.app_metadata.provider === 'email'

  return (
    <div className="mt-0 flex flex-col gap-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* CARD EMAIL: La mostriamo sempre, ma potremmo disabilitare il form se non è 'email' user */}
        <Card className="shadow-sm border-transparent md:border-muted p-2 md:p-6 rounded-3xl h-full">
          <CardHeader className="mb-4">
            <CardTitle className="text-xl font-bold tracking-tight">Email Address</CardTitle>
            <CardDescription>
              {isPasswordUser 
                ? "Change the email address associated with your account."
                : "Your account is linked to Google. Email management is handled by your provider."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPasswordUser ? (
              <ChangeEmailForm currentEmail={user.email} />
            ) : (
              <div className="p-4 bg-muted/50 rounded-xl text-sm font-medium text-muted-foreground">
                {user.email}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CARD PASSWORD: La mostriamo solo se l'utente ha una password */}
        {isPasswordUser ? (
          <Card className="shadow-sm border-transparent md:border-muted p-2 md:p-6 rounded-3xl h-full">
            <CardHeader className="mb-4">
              <CardTitle className="text-xl font-bold tracking-tight">Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm border-transparent md:border-muted p-2 md:p-6 rounded-3xl h-full opacity-60">
            <CardHeader className="mb-4">
              <CardTitle className="text-xl font-bold tracking-tight italic">Password</CardTitle>
              <CardDescription>
                Password management is not available for social accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                 You are logged in via <strong>Google</strong>. You don't need a password to access your account.
               </p>
            </CardContent>
          </Card>
        )}

      </div>

      <div className="mt-4">
        <DeleteAccountSection />
      </div>
    </div>
  )
}