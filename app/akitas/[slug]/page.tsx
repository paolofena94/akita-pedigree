import { HeroDetails } from "@/components/web/akitas/hero-details";
import { FamilyNetwork } from "@/components/web/akitas/family-network";
import { HealthClearances } from "@/components/web/akitas/health-clearances";
import { Awards } from "@/components/web/akitas/awards";
import { notFound } from "next/navigation";
import { MOCK_DOG } from "@/lib/mock-data";
import { OwnershipInfo } from "@/components/web/akitas/ownership";


// app/akitas/[slug]/page.tsx
// import { RegistryIdentity } from "@/components/RegistryIdentity";

export default function AkitaOverviewPage() {
  // Qui recupererai i dati del cane in base allo slug
  // const dog = await getDogBySlug(params.slug);

  return (

    <div className="z-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">

      {/* Prende 1 colonna sia su tablet che su desktop */}
      <section className="col-span-1">
        <Awards awards={MOCK_DOG.awards} />
      </section>

      {/* Prende 1 colonna su tablet, 2 colonne su desktop */}
      <section className="col-span-1 lg:col-span-2">
        <OwnershipInfo
          breeder={MOCK_DOG.breeder}
          kennel={MOCK_DOG.kennel}
          owner={MOCK_DOG.owner}
        />
      </section>

    </div>
  );
}

export async function AkitaDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Recuperiamo lo slug (in Next.js 15+ params va aspettato se è una Promise)
  const { slug } = await params;

  // 2. Cerchiamo il cane nel database tramite lo slug
  // const dog = await getDogBySlug(slug);
  const dog = slug === MOCK_DOG.slug ? MOCK_DOG : null;

  // 3. Se il cane non esiste, mandiamo l'utente alla pagina 404 di Next.js
  if (!dog) {
    notFound();
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      {/* 4. Passiamo i dati del cane ai componenti */}
      <HeroDetails /* dog={dog} */ />

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <HealthClearances health={dog.health} />
          <Awards awards={dog.awards} />
        </div>

        <FamilyNetwork /* family={dog.family} */ />
      </div>
    </div>
  );
}