import { Contact, MapPin, Globe, Mail, Phone, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountryName, getFlagEmoji } from "@/lib/nations";

// Definizione rigorosa del modello dati
interface Person {
  claimed_by?: string | null;
  address?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  country: string; // Obbligatorio
  website_url?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface ContactCardProps {
  person: Person;
}

export function ContactCard({ person }: ContactCardProps) {
  const isClaimed = !!person.claimed_by;

  const cityLine = [
    person.postal_code,
    person.city,
    person.state ? `(${person.state})` : null
  ].filter(Boolean).join(" ");

  const countryName = getCountryName(person.country);
  const flag = getFlagEmoji(person.country);

  return (
    <Card className="rounded-3xl border-none shadow-md h-full overflow-hidden">
      {/* Header con separazione visiva netta */}
      <CardHeader className="border-b border-slate-100 px-6 py-4">
      <CardTitle className="flex items-center gap-3">
          <Contact className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Contact Details</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Grid Layout: 2 colonne su schermi medi, singola su mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* 1. Address Section - Solo se claimed o se presente address */}
          {(isClaimed && (person.address || cityLine)) && (
            <ContactItem 
              icon={<MapPin className="w-3.5 h-3.5" />} 
              label="Street Address"
            >
              <div className="flex flex-col text-sm font-semibold text-slate-700">
                <span>{person.address}</span>
                <span className="text-slate-500 font-medium">{cityLine}</span>
              </div>
            </ContactItem>
          )}

          {/* 2. Country Section - Sempre visibile */}
          <ContactItem 
            icon={<Flag className="w-3.5 h-3.5" />} 
            label="Country / Region"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <span className="text-lg leading-none">{flag}</span>
              <span className="truncate">{countryName}</span>
              {!isClaimed && person.state && (
                <span className="text-slate-400 font-normal">({person.state})</span>
              )}
            </div>
          </ContactItem>

          {/* 3. Website */}
          {person.website_url && (
            <ContactItem icon={<Globe className="w-3.5 h-3.5" />} label="Website">
              <a
                href={person.website_url.startsWith('http') ? person.website_url : `https://${person.website_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors truncate block"
              >
                {person.website_url.replace(/^https?:\/\//, '')}
              </a>
            </ContactItem>
          )}

          {/* 4. Email & Phone Group (spesso visualizzati insieme) */}
          {person.email && (
            <ContactItem icon={<Mail className="w-3.5 h-3.5" />} label="Email">
              <span className="text-sm font-bold text-slate-700 break-all">
                {person.email}
              </span>
            </ContactItem>
          )}

          {person.phone && (
            <ContactItem icon={<Phone className="w-3.5 h-3.5" />} label="Phone">
              <span className="text-sm font-bold text-slate-700">
                {person.phone}
              </span>
            </ContactItem>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Sub-componente interno per mantenere il principio DRY 
 * e garantire coerenza visiva tra i blocchi dati.
 */
function ContactItem({ 
  icon, 
  label, 
  children 
}: { 
  icon: React.ReactNode; 
  label: string; 
  children: React.ReactNode 
}) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <div className="mt-1 bg-slate-100 p-2 rounded-xl text-slate-600 shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}