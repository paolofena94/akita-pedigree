import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ChevronDown, Network } from "lucide-react";

export function FamilyNetwork() {
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