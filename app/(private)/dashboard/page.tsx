import { Dog, PawPrint } from "lucide-react"
import { DashboardHero } from "./_components/hero-card"
import { DogsSection } from "./_components/akita-section"
import { MyKennelsSection } from "./_components/kennel-card"
import { LinkedPersonCard } from "./_components/linked-person-card"
import { ActivityCard } from "./_components/activity-card"
import { redirect } from "next/navigation"
import { getCurrentUserSnippet } from "@/lib/db/user"

export default async function OverviewPage() {
  // 1. Recupero i dati reali dal database
  const { user, profile } = await getCurrentUserSnippet();

  // 2. Protezione: Se l'utente non è loggato, reindirizza alla login
  if (!user) {
    redirect("/login");
  }

  // Mock Data rimanenti (che verranno sostituiti in futuro da altre fetch)
  const mockData = {
    isLinkedToPerson: true,
    person: { 
        firstName: "Paolo", // Usiamo i dati del profilo anche qui se necessario
        lastName: "Fenaroli", 
        country: "Italy" 
    },
    stats: { dogsOwned: 4, dogsBred: 12 },
    kennels: [
        { name: "Akita Valley", role: "Owner" }, 
        { name: "Northern Stars", role: "Handler" }
    ],
    activities: [
      { text: "Updated pedigree: Hachiko", time: "2h ago" },
      { text: "New photo: Yuki-Go", time: "1d ago" },
      { text: "Joined Kennel: Northern Stars", time: "3d ago" }
    ]
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10">
      
      {/* 3. Passiamo i dati reali ottenuti da Supabase */}
      <DashboardHero 
        username={profile?.username || "User"} 
        avatarUrl={profile?.avatar_url} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <DogsSection 
            title="My Akitas" 
            totalCount={mockData.stats.dogsOwned} 
            icon={Dog} 
            emptyText="No owned dogs linked." 
          />
          <DogsSection 
            title="My Breedings" 
            totalCount={mockData.stats.dogsBred} 
            icon={PawPrint} 
            emptyText="No bred dogs linked." 
          />
          <MyKennelsSection kennels={mockData.kennels} />
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <LinkedPersonCard 
            isLinked={mockData.isLinkedToPerson} 
            person={mockData.person} 
          />
          <ActivityCard activities={mockData.activities} />
        </aside>
      </div>
    </div>
  )
}