import { Awards } from "@/components/web/akitas/awards";
import { OwnershipInfo } from "@/components/web/akitas/ownership";
import { HealthClearances } from "@/components/web/akitas/health-clearances";
import { MOCK_DOG } from "@/__mock__/mock-akita";

export default function AkitaOverviewPage() {
  // const dog = await getDogBySlug(params.slug);

  return (

    <div className="z-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">

      {/* Prende 1 colonna sia su tablet che su desktop */}
      <section className="col-span-1">
        {/* <Awards awards={MOCK_DOG.awards} /> */}
        <OwnershipInfo
          breeder={MOCK_DOG.breeder}
          kennel={MOCK_DOG.kennel}
          owner={MOCK_DOG.owner}
        />
      </section>

      {/* Prende 1 colonna su tablet, 2 colonne su desktop */}
      <section className="col-span-1 lg:col-span-2 flex flex-col gap-6">
        {/* <OwnershipInfo
          breeder={MOCK_DOG.breeder}
          kennel={MOCK_DOG.kennel}
          owner={MOCK_DOG.owner}
        /> */}
        <Awards awards={MOCK_DOG.awards} />
        <HealthClearances health={MOCK_DOG.health} />
      </section>

    </div>
  );
}