import { Navbar } from "@/components/web/layout/navbar"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* La Navbar globale in alto */}
      <Navbar /> 
      
      {/* Qui dentro Next.js inietterà in automatico il SettingsLayout (la sidebar) o la Dashboard */}
      <main className="flex-1 bg-muted/20"> 
        {children}
      </main>
    </div>
  )
}