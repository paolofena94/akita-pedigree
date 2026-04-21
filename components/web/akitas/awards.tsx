import { ChevronDown, Medal, LucideIcon, Trophy, AwardIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Award } from "@/app/types/akita";
import { cn } from "@/lib/utils";
import { AWARD_COLOR_MAP, AWARD_ICON_MAP } from "@/config/award";

interface AwardsProps {
  awards: Award[];
}

export function Awards({ awards }: AwardsProps) {
  const hasAwards = awards && awards.length > 0;

  return (
    <div className="py-4 px-8 bg-card rounded-4xl border border-slate-200 shadow-lg overflow-hidden">
      <Accordion type="single" collapsible defaultValue={hasAwards ? "awards" : undefined}>
        <AccordionItem
          value="awards"
          className="border-b-0"
          disabled={!hasAwards}
        >
          <AccordionTrigger
            className={cn(
              "group hover:no-underline px-0 [&>svg]:hidden! cursor-pointer",
              !hasAwards && "opacity-70 cursor-default"
            )}
          >
            <div className="flex items-center justify-between w-full pr-4 text-left">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground/90 flex items-center gap-3">
                  <AwardIcon className="text-primary w-6 h-6 shrink-0" />

                  Titles & Awards
                  <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
                    ({awards?.length || 0})
                  </span>
                </h2>
              </div>

              {hasAwards && (
                <ChevronDown
                  className="w-5 h-5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 stroke-[2.5]"
                />
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pt-8 border-t border-slate-200">
            <div className="grid grid-cols-1 gap-x-12 gap-y-6">
              {awards.map((award) => {
                const Icon = AWARD_ICON_MAP[award.icon] as LucideIcon;
                const style = AWARD_COLOR_MAP[award.color]; // Recuperiamo l'oggetto con tutti gli stili

                return (
                  <div key={award.id} className="flex items-center gap-4">
                    {/* Contenitore Icona: Cerchio bianco con bordo e bg leggero */}
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border shadow-md bg-white",
                      style.bg,
                      style.border
                    )}>
                      <Icon className={cn("w-4 h-4", style.text)} />
                    </div>

                    <div className="flex flex-col">
                      <p className="font-bold text-sm text-foreground/90 leading-none mb-1!">
                        {award.title}
                      </p>
                      {/* Subtitle: reso più elegante, uppercase e coordinato col colore dell'award */}
                      <p className={cn(
                        "text-[10px] font-bold uppercase leading-none tracking-tight",
                        style.label
                      )}>
                        {award.subtitle}
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