import { Home, ArrowRight, HouseHeart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from "next/image";
import { getCountryName, getFlagEmoji } from "@/lib/nations"

export function AssociatedKennelsSection({ kennels, personId }: { kennels: any[], personId: string }) {
  if (!kennels || kennels.length === 0) return null;

  return (
    <section aria-label="Associated Kennels">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
          <Home className="w-5 h-5 text-primary" />
          Associated Kennels
        </h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-xs font-bold" asChild>
          <Link href={`/persons/${personId}/kennels`}>
            VIEW ALL <ArrowRight className="w-3 h-3 ml-1 stroke-[3px]" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kennels.slice(0, 2).map((kennel: any) => (
          <KennelCard key={kennel.id} kennel={kennel} />
        ))}
      </div>
    </section>
  );
}

function KennelCard({ kennel }: { kennel: any }) {
  return (
    <Link href={`/kennels/${kennel.id}`} className="block group">
      <Card className="rounded-3xl shadow-sm hover:shadow-md h-full overflow-hidden transition-all duration-300">
        <CardContent className="p-5 flex items-center gap-4 h-full">

          {/* Container Logo Kennel */}
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-accent border border-primary/10 shrink-0 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            {kennel.logo ? (
              <Image
                src={kennel.logo}
                alt={`${kennel.name} logo`}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <HouseHeart className="w-6 h-6 text-primary/30" />
            )}
          </div>

          {/* Informazioni Testuali */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate text-base mb-1">
              {kennel.name}
            </h3>

            <div className="flex items-center gap-2">
              {/* Ruolo */}
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">
                {kennel.role}
              </span>

              {/* Pallino separatore */}
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" />

              {/* Nazione */}
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 truncate">
                {kennel.country ? (
                  <>
                    <span className="text-sm leading-none">{getFlagEmoji(kennel.country)}</span>
                    <span className="truncate">{getCountryName(kennel.country)}</span>
                  </>
                ) : (
                  <span className="truncate">Unknown</span>
                )}
              </span>
            </div>
          </div>

          {/* Icona Freccia Hover */}
          <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}