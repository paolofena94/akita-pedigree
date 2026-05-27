// app/(main)/persons/[id]/[slug]/page.tsx
import { getPersonData } from "@/lib/db/person";
import { BiographyCard } from "./_components/biography-card";
import { ContactCard } from "./_components/contact-card";

interface PersonOverviewPageProps {
  params: Promise<{ id: string }>; 
}

export default async function PersonOverviewPage({ params }: PersonOverviewPageProps) {
  const { id } = await params;

  const person = await getPersonData(id);

  const contactInfo = {
    country: person!.country,
    address: person!.address_street,
    postalCode: person!.postal_code,
    city: person!.city,
    state: person!.state,
    websiteUrl: person!.website_url,
    email: person!.email,
    phone: person!.phone,
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 [&>*:last-child:nth-child(odd)]:lg:col-span-2">
      
      <ContactCard {...contactInfo} />
      
      {person!.bio && (
        <BiographyCard bio={person!.bio} />
      )}
      
    </div>
  );
}