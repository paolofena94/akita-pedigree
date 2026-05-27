"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { ClaimPersonDialog } from "./claim-person-dialog"; // Adegua il path

interface UserLinkedCardProps {
    personId: string;
    personPublicId: number | string;
    personSlug: string | null;
    username?: string | null;
    currentUserId?: string | null;
    currentUserHasPersonLinked: boolean;
}

export function UserLinkedCard({ 
    personId, 
    personPublicId, 
    personSlug, 
    username, 
    currentUserId,
    currentUserHasPersonLinked 
}: UserLinkedCardProps) {
    const router = useRouter();
    const pathname = usePathname();

    const isClaimed = !!username;
    const isLoggedIn = !!currentUserId;

    if (!isClaimed && currentUserHasPersonLinked) {
        return null;
    }

    const handleRequireLogin = () => {
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
    };

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
                            <p className="text-sm text-slate-700 font-bold truncate">@{username}</p>
                        </div>
                    </div>

                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-100 shrink-0 ml-2"
                    >
                        <Link href={`/users/${encodeURIComponent(username)}`}>
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

                    {/* 🌟 Ecco il nostro componente pulito e incapsulato! */}
                    <ClaimPersonDialog 
                        personId={personId}
                        personPublicId={personPublicId}
                        personSlug={personSlug}
                        isLoggedIn={isLoggedIn}
                        onRequireLogin={handleRequireLogin}
                    />
                </div>
            )}
        </Card>
    );
}