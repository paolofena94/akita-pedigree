"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsTabs = [
  { title: "Profile", href: "/settings/profile" },
  { title: "Login & Security", href: "/settings/security" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs
        value={pathname}
        onValueChange={(value) => router.push(value)}
        className="w-full"
      >

        <TabsList
          variant="line"
          className="w-full justify-start gap-8 border-b border-border bg-transparent p-0 rounded-none h-auto"
        >
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.href}
              value={tab.href}
              className="flex-none py-3 border-b-2 border-transparent text-muted-foreground rounded-none shadow-none data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary!"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="pt-4 pb-16">
        {children}
      </div>

    </div>
  )
}