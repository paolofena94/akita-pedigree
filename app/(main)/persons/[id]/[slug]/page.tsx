import { BiographyCard } from "./_components/biography-card"
import { ContactCard } from "./_components/contact-card"
import { MOCK_PERSON } from "@/__mock__/mock-person";

export default function PersonOverviewPage() {
  const person = MOCK_PERSON;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 [&>*:last-child:nth-child(odd)]:lg:col-span-2">

      {/* Contatti (ContactCard ha già logica interna, ma se è completamente vuota puoi condizionarla) */}
      <ContactCard person={person} />
      
      {person.bio && (
        <BiographyCard bio={person.bio} />
      )}
    </div>
  )
}