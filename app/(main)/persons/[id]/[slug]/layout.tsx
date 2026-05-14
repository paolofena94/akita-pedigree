'use client'

import { usePathname, useParams, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPen } from 'lucide-react'
import { ProfileInfoCard } from './_components/person-info-card'
import { EntryMetadataCard } from './_components/entry-metadata-card'
import { BiographyCard } from './_components/biography-card'
import { MOCK_PERSON } from '@/__mock__/mock-person'
import { PersonProfile } from '@/types/person'
import { UserLinkedCard } from './_components/user-linked-card'

export default function PersonProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const person = MOCK_PERSON;

    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();

    const baseUrl = `/persons/${params.id}${params.slug ? `/${params.slug}` : ''}`;

    const profileTabs = [
        { title: "Overview", value: baseUrl, count: null },
        { title: "Breedings", value: `${baseUrl}/breedings`, count: person.bred_dogs?.length || 0 },
        { title: "Owned Akitas", value: `${baseUrl}/owned`, count: person.owned_dogs?.length || 0 },
        { title: "Kennels", value: `${baseUrl}/kennels`, count: person.kennels?.length || 0 },
        { title: "Statistics", value: `${baseUrl}/stats`, count: null },
    ];

    let activeTab = baseUrl;
    if (pathname.includes('/kennels')) activeTab = `${baseUrl}/kennels`;
    else if (pathname.includes('/breedings')) activeTab = `${baseUrl}/breedings`;
    else if (pathname.includes('/owned')) activeTab = `${baseUrl}/owned`;
    else if (pathname.includes('/stats')) activeTab = `${baseUrl}/stats`;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-500">

            {/* GRIGLIA PRINCIPALE (3 colonne su desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

                {/* --- COLONNA SINISTRA: SIDEBAR --- */}
                <div className="lg:col-span-1 space-y-6">
                    <PersonSidebar person={person} />
                </div>

                {/* --- COLONNA DESTRA: MAIN CONTENT --- */}
                <div className="lg:col-span-2 space-y-6 flex flex-col h-full min-w-0">

                    {/* MENU A SCHEDE */}
                    <ProfileNavigationTabs
                        activeTab={activeTab}
                        profileTabs={profileTabs}
                        onTabChange={(value) => router.push(value)}
                    />

                    <main className="flex-1">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    )
}


interface ProfileTab {
    title: string;
    value: string;
    count: number | null;
}

function ProfileNavigationTabs({
    activeTab,
    profileTabs,
    onTabChange
}: {
    activeTab: string;
    profileTabs: ProfileTab[];
    onTabChange: (value: string) => void;
}) {
    return (
        <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className="w-full"
        >
            <TabsList
                variant="line"
                className="w-full justify-start overflow-x-auto gap-8 border-b border-border bg-transparent p-0 rounded-none h-auto"
            >
                {profileTabs.map((tab) => {
                    const isDisabled = tab.count === 0;

                    return (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            disabled={isDisabled}
                            className="flex-none flex items-center gap-2 py-3 border-b-2 border-transparent text-sm text-muted-foreground rounded-none shadow-none data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none hover:text-blue-500! disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {tab.title}
                            {tab.count !== null && (
                                <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-xs">
                                    {tab.count}
                                </span>
                            )}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
        </Tabs>
    )
}

interface PersonSidebarProps {
    person: PersonProfile
}

function PersonSidebar({ person }: PersonSidebarProps) {
    const pathname = usePathname();

    // Dividiamo l'URL in segmenti. Es: "/it/persons/123/mario" -> ['it', 'persons', '123', 'mario']
    const segments = pathname.split('/').filter(Boolean);

    // Troviamo a che posizione sta la parola "persons"
    const personsIndex = segments.indexOf('persons');

    // L'Overview si ha quando l'URL finisce esattamente con lo slug (ovvero 3 pezzi: persons -> id -> slug)
    // Se c'è un pezzo in più (es: kennels), la lunghezza sarà maggiore.
    const isOverviewPage = segments.length === personsIndex + 3;

    return (
        <aside className="space-y-6">
            {/* La Profile Info Card c'è sempre, fa da ancoraggio visivo */}
            <ProfileInfoCard person={person} />
            <UserLinkedCard person={person} />
            <EntryMetadataCard person={person} />


        </aside>
    )
}