import Link from "next/link"
import { cn } from "@/lib/utils"

const settingsTabs = [
  { title: "Personal", href: "/settings/profile" },
  { title: "Login & Security", href: "/settings/security" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      {/* Intestazione della sezione */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* TABS ORIZZONTALI */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {settingsTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors hover:text-foreground",
                // TODO: Aggiungeremo la logica per il tab attivo (border-primary text-foreground) con usePathname
                "border-transparent text-muted-foreground hover:border-border" 
              )}
            >
              {tab.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Qui verrà renderizzato il ProfileForm, SecurityForm, ecc. */}
      <div className="pt-4 pb-16">
        {children}
      </div>
    </div>
  )
}