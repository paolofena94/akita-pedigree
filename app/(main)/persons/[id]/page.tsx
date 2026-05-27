import { redirect, notFound } from 'next/navigation';
import { getPersonData } from '@/lib/db/person';
import { connection } from 'next/server';
import { Suspense } from 'react';

interface RedirectPageProps {
    params: Promise<{ id: string }>;
}

// 🌟 1. IL MOTORE (Asincrono): Qui facciamo il lavoro pesante e dinamico
async function RedirectLogic({ params }: RedirectPageProps) {
    await connection(); // Dichiariamo che stiamo leggendo dati dinamici

    const { id } = await params;
    
    const person = await getPersonData(id);

    if (!person) {
        notFound();
    }

    // Eseguiamo il redirect all'URL completo
    redirect(`/persons/${id}/${person.slug}`);
    
    return null;
}

// 🌟 2. LA PAGINA (Sincrona): Involucro che rispetta le regole di streaming di Next.js 16
export default function PersonIdRedirectPage({ params }: RedirectPageProps) {
    return (
        // Il fallback può essere null, o un tuo Skeleton se vuoi mostrare un 
        // effetto di caricamento al posto del contenuto per quel millisecondo.
        <Suspense fallback={null}>
            <RedirectLogic params={params} />
        </Suspense>
    );
}