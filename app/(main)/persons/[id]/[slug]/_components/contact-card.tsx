// app/(main)/persons/[id]/[slug]/_components/contact-card.tsx
import { Contact, MapPin, Globe, Mail, Phone, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountryName, getFlagEmoji } from "@/lib/nations";

interface ContactCardProps {
  country: string;
  address?: string | null;
  postalCode?: string | null;
  city?: string | null;
  state?: string | null;
  websiteUrl?: string | null;
  email?: string | null;
  phone?: string | null;
}

export function ContactCard({
  country,
  address,
  postalCode,
  city,
  state,
  websiteUrl,
  email,
  phone,
}: ContactCardProps) {
  
  // Logica della città/provincia: (Bergamo)
  const formattedState = state ? (city ? `(${state})` : state) : null;
  
  const cityLine = [
    postalCode,
    city,
    formattedState
  ].filter(Boolean).join(" ");

  const hasLocalAddress = address || cityLine;

  const countryName = getCountryName(country);
  const flag = getFlagEmoji(country);

  return (
    <Card className="rounded-3xl border-none shadow-md h-full overflow-hidden">
      <CardHeader className="border-b border-slate-100 px-6 py-4">
        <CardTitle className="flex items-center gap-3">
          <Contact className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Contact Details</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* 1. Location Section */}
          {hasLocalAddress && (
            <ContactItem 
              icon={<MapPin className="w-3.5 h-3.5" />} 
              label="Location"
            >
              {/* 🌟 Entrambe le righe dei VALORI sono text-foreground */}
              <div className="flex flex-col text-sm text-foreground">
                {address && <span className="font-semibold">{address}</span>}
                {/* Tolto il muted-foreground! Ora è ben visibile. */}
                {cityLine && <span className="font-medium">{cityLine}</span>}
              </div>
            </ContactItem>
          )}

          {/* 2. Country Section */}
          <ContactItem 
            icon={<Flag className="w-3.5 h-3.5" />} 
            label="Country"
          >
            {/* 🌟 Valore: text-foreground */}
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="text-lg leading-none">{flag}</span>
              <span className="truncate">{countryName}</span>
            </div>
          </ContactItem>

          {/* 3. Website - Colore speciale */}
          {websiteUrl && (
            <ContactItem icon={<Globe className="w-3.5 h-3.5" />} label="Website">
              <a
                href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors truncate block"
              >
                {websiteUrl.replace(/^https?:\/\//, '')}
              </a>
            </ContactItem>
          )}

          {/* 4. Email */}
          {email && (
            <ContactItem icon={<Mail className="w-3.5 h-3.5" />} label="Email">
              {/* 🌟 Valore: text-foreground */}
              <span className="text-sm font-bold text-foreground break-all">
                {email}
              </span>
            </ContactItem>
          )}

          {/* 5. Phone */}
          {phone && (
            <ContactItem icon={<Phone className="w-3.5 h-3.5" />} label="Phone">
              {/* 🌟 Valore: text-foreground */}
              <span className="text-sm font-bold text-foreground">
                {phone}
              </span>
            </ContactItem>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

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
        {/* 🌟 Questa è la LABEL (es. "LOCATION"), rimane sbiadita (muted-foreground) */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        {/* Qui dentro ci finiscono i VALORI, che ora usano il text-foreground */}
        {children}
      </div>
    </div>
  );
}