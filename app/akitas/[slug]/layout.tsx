import { HeroCard } from "@/components/web/akitas/hero-card";
import { SidebarNav } from "@/components/web/layout/sidebar";
import { ReactNode } from "react";

export default async function AkitaProfileLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        
        <div className="flex min-h-screen items-start bg-background">

            {/* SIDEBAR */}
            {/* top-[57px] calcolato prima per incastrarsi sotto la navbar */}
            <aside className="sticky top-14.25 h-[calc(100vh-57px)] border-r border-slate-200 bg-white hidden md:flex flex-col shrink-0 overflow-y-auto">
                
                
                {/* Il trucco per centrare: my-auto.
                  Questo div prenderà tutto lo spazio sopra e sotto, 
                  mettendo il Titolo e il Menu esattamente al centro dello schermo.
                */}
                <div className="flex flex-col my-auto w-full py-8">
                    <div className="px-8">
                        <span className="font-bold text-xs tracking-widest text-muted-foreground uppercase">
                            Akita Profile
                        </span>
                    </div>
                    
                    <SidebarNav slug={slug} />
                </div>
            </aside>


            {/* MAIN CONTENT */}
            <main className="flex-1 relative w-full p-6 lg:p-8">
                
                {/* Contenitore unico max-w-6xl.
                  In questo modo la Hero e le sezioni sotto (Overview, Health, ecc.)
                  saranno sempre larghe uguali e centrate perfettamente.
                */}
                <div className="max-w-6xl mx-auto flex flex-col">
                    
                    {/* La Hero Card */}
                    <HeroCard />

                    {/* Il contenuto della rotta specifica */}
                    <div className="w-full">
                        {children}
                    </div>
                    
                </div>
            </main>

        </div>
    );
}