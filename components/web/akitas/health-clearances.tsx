import { ChevronDown, Eye, Heart, HeartPulse, LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HealthClearance } from "@/types/akita";
import { HEALTH_ICON_MAP, HEALTH_COLOR_MAP } from "@/config/health";
import { cn } from "@/lib/utils";

interface HealthClearancesProps {
  health: HealthClearance[];
}

export function HealthClearances({ health }: HealthClearancesProps) {
  const hasHealth = health && health.length > 0;

  return (
    <div className="py-4 px-8 bg-card rounded-4xl border border-slate-200 shadow-lg overflow-hidden">
      <Accordion type="single" collapsible defaultValue={hasHealth ? "health" : undefined}>
        <AccordionItem
          value="health"
          className="border-b-0"
          disabled={!hasHealth}
        >

          <AccordionTrigger
            className={cn(
              "group hover:no-underline px-0 [&>svg]:hidden!",
              !hasHealth && "cursor-default opacity-70"
            )}
          >
            <div className="flex items-center justify-between w-full pr-4 text-left">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground/90 flex items-center gap-3">
                  <HeartPulse className="text-primary w-6 h-6 shrink-0" />
                  Health Clearances
                  <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
                    ({health?.length || 0})
                  </span>
                </h2>
              </div>

              {hasHealth && (
                <ChevronDown
                  className="w-5 h-5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary stroke-[2.5]"
                />
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pt-8 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              {health.map((item) => {
                const Icon = HEALTH_ICON_MAP[item.icon] as LucideIcon;
                // Usiamo una mappa che definisce colori per testo e bordi/bg
                const colorStyles = HEALTH_COLOR_MAP[item.color];

                return (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Contenitore Icona Dinamico */}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 bg-white border",
                      colorStyles.border
                    )}>
                      <Icon className={cn("w-5 h-5", colorStyles.text)} />
                    </div>

                    <div>
                      <p className={cn(
                        "text-[10px] font-bold uppercase leading-none mb-1!",
                        colorStyles.label // Un colore leggermente più chiaro per il label
                      )}>
                        {item.title}
                      </p>
                      <p className={cn("font-bold text-sm leading-tight", colorStyles.value)}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>

        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function HealthClearances1() {
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