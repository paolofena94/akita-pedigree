// components/web/layout/dashboard-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

interface DashboardSidebarProps {
  groups: SidebarGroup[]
}

export function Sidebar({ groups }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden sticky top-16.75 h-[calc(100vh-57px)] overflow-y-auto md:flex w-64 shrink-0 flex-col border-r bg-white pt-6 pb-10 px-4">
      <nav className="flex flex-col gap-6">
        {groups.map((group, index) => (
          <div key={index} className="flex flex-col gap-2">
            {/* Titolo del Gruppo */}
            <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </h4>

            <div className="flex flex-col gap-1">
              {group.items.map((item) => {

                // LOGICA AGGIORNATA PER I SOTTOPATH
                const baseSection = item.href === "/" ? "/" : `/${item.href.split('/')[1]}`;

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(baseSection);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-start gap-3 px-2 font-medium transition-all duration-200",
                      isActive
                        ? "bg-accent text-primary hover:bg-accent hover:text-primary"
                        : "text-foreground"
                    )}
                  >
                    <span className={cn(isActive ? "text-primary" : "text-foreground")}>
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}