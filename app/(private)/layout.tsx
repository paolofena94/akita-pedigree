// app/(private)/layout.tsx
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/web/layout/navbar"
import { Sidebar, SidebarGroup } from "@/components/web/layout/sidebar"
import { UserCircle, Activity, Contact, Home, Dog, LayoutDashboard } from "lucide-react"

const DASHBOARD_MENU: SidebarGroup[] = [
  {
    label: "OVERVIEW",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    ]
  },
  {
    label: "REGISTRY RECORDS",
    items: [
      { title: "Linked Person", href: "/registry/person", icon: <Contact className="w-4 h-4" /> },
      { title: "Managed Kennels", href: "/registry/kennels", icon: <Home className="w-4 h-4" /> },
      { title: "Owned & Bred Akitas", href: "/registry/akitas", icon: <Dog className="w-4 h-4" /> },
    ]
  },
  {
    label: "USER",
    items: [
      { title: "Settings", href: "/settings/profile", icon: <UserCircle className="w-4 h-4" /> },
      { title: "Activity Log", href: "/activity", icon: <Activity className="w-4 h-4" /> },
    ]
  }
]

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <div className="shrink-0">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Passiamo i gruppi come prop */}
        <Sidebar groups={DASHBOARD_MENU} />

        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-8 lg:p-12 relative">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
          <Toaster position="bottom-center"/>
        </main>
      </div>
    </div>
  )
}