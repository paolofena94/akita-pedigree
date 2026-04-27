import { User, Settings, ShieldCheck, Bell } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const sidebarNavItems = [
  {
    title: "Profilo",
    href: "/settings/profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    title: "Sicurezza",
    href: "/settings/security",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-6xl py-10 px-4 md:px-6">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start hover:bg-muted gap-2"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}