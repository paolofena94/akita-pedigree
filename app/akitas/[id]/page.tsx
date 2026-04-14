import {
Eye, Heart, ChevronDown, Network, Medal,
    Trophy,
    HeartPulse,
    ArrowRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeroDetails } from "@/components/web/akitas/hero-details";


export default function AkitaDetailsPage({ params }: { params: { slug: string } }) {
    return (
        <div className="max-w-screen-2xl mx-auto px-6 py-8 animate-in fade-in duration-500">

            <HeroDetails />

            {/* --- CONTENT GRID --- */}
            <div className="space-y-8">

                {/* SEZIONE SUPERIORE: Health + Titles (2 Colonne) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Health Clearances */}
                    <HealthClearances />

                    {/* Titles & Awards */}
                    <Awards />
                </div>

                {/* SEZIONE INFERIORE: Family Network (Tutta larghezza, 3 Colonne) */}
                <FamilyNetwork />

            </div>
        </div>
    );
}

function HealthClearances() {
    return (
        <div className="py-4 px-8 bg-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Accordion type="single" collapsible defaultValue="health">
                <AccordionItem value="health" className="border-b-0">

                    {/* Trigger coerente con Awards */}
                    <AccordionTrigger className="group hover:no-underline px-0 [&>svg]:hidden!">
                        <div className="flex items-center justify-between w-full pr-4 text-left">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                                    Health Clearances
                                    <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
                                        (3)
                                    </span>
                                    <HeartPulse className="text-primary w-6 h-6 shrink-0" />
                                </h3>
                            </div>
                            <ChevronDown
                                className="w-5 h-5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary stroke-[2.5]"
                            />
                        </div>
                    </AccordionTrigger>

                    {/* Contenuto con Grid per gestire più voci sulla stessa riga */}
                    <AccordionContent className="pt-8 border-t border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">

                            {/* Hips */}
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm">
                                    A
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-blue-600/70 uppercase leading-none mb-1!">
                                        Hips (OFA/HD)
                                    </p>
                                    <p className="font-bold text-blue-900 text-sm leading-tight">
                                        Excellent/A
                                    </p>
                                </div>
                            </div>

                            {/* Eyes */}
                            <div className="flex items-center gap-4">
                                <div className="text-emerald-500 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-600/70 uppercase leading-none mb-1!">
                                        Eyes (CERF)
                                    </p>
                                    <p className="font-bold text-emerald-900 text-sm leading-tight">
                                        Clear (2022)
                                    </p>
                                </div>
                            </div>

                            {/* Cardiac */}
                            <div className="flex items-center gap-4">
                                <div className="text-sky-500 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-sky-600/70 uppercase leading-none mb-1!">
                                        Cardiac
                                    </p>
                                    <p className="font-bold text-sky-900 text-sm leading-tight">
                                        Normal
                                    </p>
                                </div>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

function Awards() {
    return (
        <div className="py-4 px-8 bg-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Accordion type="single" collapsible defaultValue="awards">
                <AccordionItem value="awards" className="border-b-0">

                    <AccordionTrigger className="group hover:no-underline px-0 [&>svg]:hidden!">
                        <div className="flex items-center justify-between w-full pr-4 text-left">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                                    Titles & Awards
                                    <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
                                        (4)
                                    </span>
                                    <Medal className="text-primary w-6 h-6 shrink-0" />
                                </h3>
                            </div>
                            <ChevronDown
                                className="w-5 h-5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary stroke-[2.5]"
                            />
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-8 border-t border-slate-200">
                        {/* --- GRID A 2 COLONNE --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">

                            {/* Trofeo 1 */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                    <Trophy className="w-4 h-4 text-amber-400" />
                                </div>                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-foreground leading-none mb-1!">Grand Champion (JKC)</p>
                                    <p className="text-xs text-slate-500 leading-none">Highest Rank Achieved</p>
                                </div>
                            </div>

                            {/* Trofeo 2 */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                    <Trophy className="w-4 h-4 text-amber-400" />
                                </div>                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-foreground leading-none mb-1!">Best in Show</p>
                                    <p className="text-xs text-slate-500 leading-none">Niigata Specialty 2017</p>
                                </div>
                            </div>

                            {/* Trofeo 3 */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                    <Trophy className="w-4 h-4 text-amber-400" />
                                </div>                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-foreground leading-none mb-1!">Club Winner</p>
                                    <p className="text-xs text-slate-500 leading-none">Tokyo Akita Expo 2019</p>
                                </div>
                            </div>

                            {/* Trofeo 4 */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                    <Trophy className="w-4 h-4 text-amber-400" />
                                </div>                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-foreground leading-none mb-1!">Excellent 1</p>
                                    <p className="text-xs text-slate-500 leading-none">World Dog Show 2015</p>
                                </div>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

function FamilyNetwork() {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header fisso */}
      <div className="bg-accent/50 px-8 py-5 border-b border-slate-100">
        <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
          Family Network <Network className="w-5 h-5 text-primary" />
        </h3>
      </div>

      <Accordion type="multiple" defaultValue={["littermates", "siblings", "offspring"]} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">

          {/* --- LITTERMATES (2) --- */}
          <AccordionItem value="littermates" className="border-b-0 flex flex-col">
            <AccordionTrigger className="p-6 hover:no-underline group [&>svg]:hidden!">
              <div className="flex justify-between items-center w-full">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                  Littermates <span className="text-slate-400 ml-1">(2)</span>
                </h4>
                <ChevronDown className="w-4 h-4 text-slate-400 stroke-3 transition-all duration-200 group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <ul className="space-y-3">
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">Yoshi Go of Mountain View</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">Sakurako Go</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* --- HALF-SIBLINGS (4) --- */}
          <AccordionItem value="siblings" className="border-b-0 flex flex-col">
            <AccordionTrigger className="p-6 hover:no-underline group [&>svg]:hidden!">
              <div className="flex justify-between items-center w-full">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                  Half-Siblings <span className="text-slate-400 ml-1">(4)</span>
                </h4>
                <ChevronDown className="w-4 h-4 text-slate-400 stroke-3 transition-all duration-200 group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <ul className="space-y-3">
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">Taro No Ryu</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">Benihime Go</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">Hokuto Go</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">Yuna of Shiba World</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* --- OFFSPRING (12) --- */}
          <AccordionItem value="offspring" className="border-b-0 flex flex-col">
            <AccordionTrigger className="p-6 hover:no-underline group [&>svg]:hidden!">
              <div className="flex justify-between items-center w-full">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                  Offsprings <span className="text-slate-400 ml-1">(12)</span>
                </h4>
                <ChevronDown className="w-4 h-4 text-slate-400 stroke-3 transition-all duration-200 group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <ul className="space-y-3">
                {[...Array(12)].map((_, i) => (
                  <li key={i} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm text-slate-600 font-medium group-hover:text-primary transition-colors">
                      Akita Progeny Name {i + 1}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

        </div>
      </Accordion>
    </div>
  );
}
