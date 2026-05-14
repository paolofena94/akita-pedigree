import { PersonProfile } from "@/types/person";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, BadgeCheck, UserPlus } from "lucide-react";
import Link from "next/link";

export function UserLinkedCard({ person }: { person: PersonProfile }) {
    // Se c'è un username salvato, il profilo è claimato
    const isClaimed = !!person.claimed_by;

    return (
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
            {isClaimed ? (
                // STATO: PROFILO GESTITO (VERIFIED)
                <div className="p-4 bg-emerald-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                            <BadgeCheck className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Claimed by</p>
                            <p className="text-sm text-slate-700 font-bold truncate">@{person.claimed_by}</p>
                        </div>
                    </div>

                    {/* Pulsante per visitare il profilo utente */}
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-100 shrink-0 ml-2"
                    >
                        {/* L'uso di Link garantisce prefetching automatico nel viewport e client-side routing */}
                        <Link href={`/users/${encodeURIComponent(person.claimed_by ?? '')}`}>
                            View User <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                    </Button>
                </div>
            ) : (
                // STATO: PROFILO NON GESTITO (UNCLAIMED)
                <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-red-100/50">
                    <div className="text-center sm:text-left">
                        <p className="text-sm font-bold text-foreground">Is this you?</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Claim this profile to manage its content.</p>
                    </div>

                    <Button size="sm" className="rounded-full shadow-sm w-full sm:w-auto border-0 bg-red-400 hover:bg-red-500 gap-2 cursor-pointer shrink-0">
                        <UserPlus className="w-4 h-4" />
                        Claim Profile
                    </Button>
                </div>
            )}
        </Card>
    )
}