import { ChevronDown, Contact, HouseHeart, ShieldUser, User, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Aggiunto l'import nativo di Next.js

interface OwnershipInfoProps {
  breeder?: string;
  kennel?: string;
  owner?: string;
}

export function OwnershipInfo({ breeder, kennel, owner }: OwnershipInfoProps) {
  const infoItems = [
    {
      id: "breeder",
      label: "Breeder",
      value: breeder,
      icon: ShieldUser,
      iconColor: "text-blue-500",
      href: `/profile/${breeder?.toLowerCase().replace(/ /g, '-')}`,
    },
    {
      id: "kennel",
      label: "Kennel",
      value: kennel,
      icon: HouseHeart,
      iconColor: "text-emerald-500",
      href: `/kennel/${kennel?.toLowerCase().replace(/ /g, '-')}`,
    },
    {
      id: "owner",
      label: "Owner",
      value: owner,
      icon: User,
      iconColor: "text-purple-500",
      href: `/profile/${owner?.toLowerCase().replace(/ /g, '-')}`,
    },
  ].filter((item) => item.value && item.value.trim() !== "");

  const hasInfo = infoItems.length > 0;

  return (
    <div className="py-4 px-8 bg-card rounded-4xl border border-slate-200 shadow-lg overflow-hidden h-full">
      <Accordion type="single" collapsible defaultValue={hasInfo ? "ownership" : undefined}>
        <AccordionItem
          value="ownership"
          className="border-b-0"
          disabled={!hasInfo}
        >
          <AccordionTrigger
            className={cn(
              "group hover:no-underline px-0 [&>svg]:hidden! cursor-pointer",
              !hasInfo && "opacity-70 cursor-default"
            )}
          >
            <div className="flex items-center justify-between w-full pr-4 text-left">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground/90 flex items-center gap-3">
                  <Contact className="text-primary w-6 h-6 shrink-0" />

                  Origins & Ownership
                  <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
                    ({infoItems.length})
                  </span>
                </h2>
              </div>

              {hasInfo && (
                <ChevronDown
                  className="w-5 h-5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 stroke-[2.5]"
                />
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent className="pt-6 pb-2 border-t border-slate-200">
            <div className="flex flex-row flex-wrap items-start gap-4">

              {infoItems.map((item) => {
                const Icon = item.icon;

                return (

                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 shrink-0 cursor-pointer no-underline! hover:no-underline"
                  >

                    <div className="p-2 rounded-xl flex items-center justify-center leading-none bg-white border border-slate-100 shadow-sm shrink-0">
                      <Icon className={cn("w-4 h-4 stroke-[2.5]", item.iconColor)} />
                    </div>

                    <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
                      <p className="text-[10px] font-bold text-foreground/50 uppercase leading-none tracking-widest mb-2!">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-foreground/80 truncate group-hover:text-primary transition-colors leading-none">
                        {item.value}
                      </p>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-slate-300 ml-2 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </Link>
                );
              })}

            </div>
          </AccordionContent>

        </AccordionItem>
      </Accordion>
    </div>
  );
}