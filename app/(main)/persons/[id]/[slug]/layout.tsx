import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { PersonProfileTabs } from './_components/person-profile-tabs';
import { PersonSidebar } from './_components/person-sidebar';
import { getPersonData } from '@/lib/db/person';
import { Loader2 } from 'lucide-react'; // O usa la grafica del tuo skeleton

// --- SEO: Generazione dinamica dei metadati ---
export async function generateMetadata({ 
    params 
}: { 
    params: Promise<{ id: string; slug: string }>
}) {
    const { id } = await params;
    const person = await getPersonData(id);

    if (!person) {
        return { title: 'Person Not Found' };
    }

    return {
        title: `${person.first_name || ''} ${person.last_name}`.trim(),
        description: person.bio ? person.bio.substring(0, 160) : `Person page of ${person.last_name}`,
    };
}

// -------------------------------------------------------------------------
// 1. IL GUSCIO SINCRONO (Protegge la rotta dal "Blocking Route")
// -------------------------------------------------------------------------
export default function PersonProfileLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string; slug: string }>;
}) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-500">
            <Suspense fallback={
                <div className="flex items-center justify-center h-[60vh] text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            }>
                <PersonLayoutContent params={params}>
                    {children}
                </PersonLayoutContent>
            </Suspense>
        </div>
    );
}

// -------------------------------------------------------------------------
// 2. IL MOTORE ASINCRONO (Il vero "Guardiano" della rotta)
// -------------------------------------------------------------------------
async function PersonLayoutContent({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string; slug: string }>;
}) {
    const { id, slug } = await params;
    
    const person = await getPersonData(id);

    if (!person) {
        notFound();
    }

    // Controllo Canonical URL (reindirizza se lo slug è vecchio)
    if (person.slug !== decodeURIComponent(slug)) {
        redirect(`/persons/${id}/${person.slug}`);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

            {/* --- COLONNA SINISTRA: SIDEBAR --- */}
            <div className="lg:col-span-1 space-y-6">
                <PersonSidebar person={person} />
            </div>

            {/* --- COLONNA DESTRA: MAIN CONTENT --- */}
            <div className="lg:col-span-2 space-y-6 flex flex-col h-full min-w-0">

                {/* I tab non hanno più bisogno di Suspense qui, ci pensa il guscio esterno */}
                <PersonProfileTabs stats={person.stats} />
                
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}