import { HeroCard } from "@/components/web/akitas/hero-card";
import { Home, HeartPulse, Network, Users, PawPrint, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import { Sidebar, SidebarGroup } from "@/components/web/layout/sidebar";

export default async function AkitaProfileLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ id: string; slug: string }>;
}) {
    const { id, slug } = await params;
    const basePath = `/akitas/${id}/${slug}`;

    const akitaMenu: SidebarGroup[] = [
        {
            label: "Akita Profile",
            items: [
                { title: "Overview", href: basePath, icon: <Home className="w-4 h-4" /> },
                { title: "Health & Genetics", href: `${basePath}/health`, icon: <HeartPulse className="w-4 h-4" /> },
                { title: "Pedigree & Lineage", href: `${basePath}/lineage`, icon: <Network className="w-4 h-4" /> },
                { title: "Family Network", href: `${basePath}/family`, icon: <Users className="w-4 h-4" /> },
                { title: "Offspring", href: `${basePath}/offspring`, icon: <PawPrint className="w-4 h-4" /> },
                { title: "Media", href: `${basePath}/media`, icon: <ImageIcon className="w-4 h-4" /> },
            ]
        }
    ];

    return (
        <div className="flex min-h-screen items-start bg-background">
            {/* 
               La Sidebar rimane fuori dal contenitore main. 
               Essendo il genitore 'items-start', la sidebar manterrà 
               la sua altezza sticky definita nel componente. 
            */}
            <Sidebar groups={akitaMenu} />

            {/* 
                1. AGGIUSTAMENTO DISTANZE: 
                Usiamo lo stesso padding del PrivateLayout: p-4 md:p-8 lg:p-12
            */}
            <main className="flex-1 p-4 md:p-8 lg:p-12 relative bg-muted/10">
                
                {/* 
                    2. AGGIUSTAMENTO LARGHEZZA: 
                    Usiamo max-w-5xl per matchare la Dashboard
                */}
                <div className="mx-auto max-w-6xl flex flex-col">
                    <HeroCard />
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}