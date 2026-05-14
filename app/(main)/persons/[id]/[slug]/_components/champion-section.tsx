
import { ArrowRight, Trophy, Medal} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from "next/image";

export function ChampionSection({ featuredDog }: { featuredDog: any }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch" aria-label="Featured Dog and Achievements">
      <div className="lg:col-span-2 h-full">

        {featuredDog ? (
          <Card className="rounded-3xl border-none py-0 shadow-sm overflow-hidden bg-linear-to-br from-white to-amber-200/20 relative h-full">
            <div className="flex flex-col sm:flex-row relative z-10 h-full">
              <div className="sm:w-2/5 aspect-square sm:aspect-auto bg-amber-200 shrink-0">
                <Image
                  src={featuredDog.image || "/images/akita-champion.png"}
                  alt={featuredDog.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Contenitore Testo: padding p-6 uniforme per allinearsi con la card di destra, e flex-col per gestire mt-auto */}
              <div className="py-10 px-6 flex flex-col items-center sm:w-3/5 h-full">

                {/* Elementi ancorati in alto */}
                <div className="flex flex-col h-full justify-center">
                  <Badge className="w-fit bg-amber-500/30 text-amber-600 border-none text-[10px] font-bold uppercase tracking-widest">
                    <Trophy className="w-3 h-3 mr-2" /> Champion
                  </Badge>

                  <div className="gap-2 mt-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2">{featuredDog.name}</h3>
                    <p className="text-foreground/70 font-semibold text-md flex items-center gap-2">
                      Champion with <span className="text-amber-600">{featuredDog.trophies || 0}</span> trophies in his career
                    </p>
                  </div>
                </div>

                {/* Bottone ancorato in basso tramite mt-auto, ora identico all'altro */}
                <Button
                  className="mt-auto w-full  bg-amber-100 hover:bg-amber-200! text-amber-900 rounded-2xl text-sm font-bold shadow-none transition-all"
                  asChild
                >
                  <Link href="#">
                    View Details <ArrowRight className="w-4 h-4 ml-1.5 stroke-[3px]" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="rounded-3xl border-dashed border-2 flex items-center justify-center p-10 h-full">
            <p className="text-muted-foreground italic text-sm">No breeding dogs found to feature.</p>
          </Card>
        )}
      </div>

      <div className="h-full">

        <Card className="rounded-3xl shadow-sm flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-amber-200/20 to-white pointer-events-none" />

          <CardHeader className="p-6 pb-0 relative z-10">

            <CardDescription className="py-1 text-[10px] font-bold uppercase tracking-widest text-amber-600/80">
              Achievements
            </CardDescription>

          </CardHeader>

          <CardContent className="p-6 pt-4 flex flex-col flex-1 gap-8 relative z-10">

            <div className="flex items-center gap-5">

              <div className="h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                <Medal className="w-7 h-7" />
              </div>

              <div className="flex flex-col">
                <p className="text-5xl font-bold text-foreground leading-none mb-1">
                  12
                </p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Titled Akitas
                </p>
              </div>
            </div>

            <Button
              className="mt-auto w-full bg-amber-100 hover:bg-amber-200! text-amber-900 rounded-2xl text-sm font-bold shadow-none transition-all"
              asChild
            >
              <Link href="#">
                View All Champions <ArrowRight className="w-4 h-4 ml-1.5 stroke-[3px]" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}