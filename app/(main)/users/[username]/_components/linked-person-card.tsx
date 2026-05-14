import Link from "next/link";
import { BadgeCheck, ShieldQuestion, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Interfaccia per i dati della persona collegata.
 * Segue la struttura snake_case proveniente dal layer database/mock.
 */
interface LinkedPerson {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
}

interface LinkedPersonCardProps {
  person?: LinkedPerson | null;
}

export function LinkedPersonCard({ person }: LinkedPersonCardProps) {
  return (
    <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
      {person ? (
        /* STATO: PROFILO COLLEGATO (VERIFICATO) */
        <div className="p-4 bg-emerald-100/50 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* Icona di verifica con background dedicato per gerarchia visiva */}
            <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <BadgeCheck className="w-5 h-5" />
            </div>
            
            <div className="min-w-0 pr-2">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">
                Linked Person
              </p>
              <p className="text-sm text-slate-800 font-bold truncate">
                {person.first_name} {person.last_name}
              </p>
            </div>
          </div>

          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 shrink-0 ml-2"
          >
            {/* 
                Utilizzo di asChild per delegare il rendering al componente Link di Next.js.
                Ottimizza il prefetching lato client nell'App Router.
            */}
            <Link href={`/persons/${person.id}/${person.slug}`}>
              View <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      ) : (
        /* STATO: NESSUN PROFILO COLLEGATO (FALLBACK) */
        <div className="p-4 bg-slate-50 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
            <ShieldQuestion className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Linked Person
            </p>
            <p className="text-sm text-slate-500 font-medium truncate">
              No person linked
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}