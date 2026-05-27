"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { claimPersonAction } from "@/actions/person";
import { toast } from "sonner";

interface ClaimPersonDialogProps {
    personId: string;
    personPublicId: number | string;
    personSlug: string | null;
    isLoggedIn: boolean;
    onRequireLogin: () => void; // Funzione per rimandare al login
}

export function ClaimPersonDialog({
    personId,
    personPublicId,
    personSlug,
    isLoggedIn,
    onRequireLogin
}: ClaimPersonDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

    const handleConfirmClaim = () => {
        if (!hasAcceptedTerms) return;

        startTransition(async () => {
            const result = await claimPersonAction(
                personId,
                personPublicId.toString(),
                personSlug
            );

            setIsDialogOpen(false);

            if (result.success) {
                toast.success("Profile claimed successfully!");
            } else {
                toast.error(result.error || "Failed to claim profile.");
            }
        });
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setHasAcceptedTerms(false); // Resetta se chiude senza salvare
        }}>
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => {
                        if (!isLoggedIn) {
                            e.preventDefault(); // Blocca l'apertura del modale
                            onRequireLogin();   // Lancia il redirect
                        }
                    }}
                    disabled={isPending}
                    size="sm"
                    className="rounded-full shadow-sm w-full sm:w-auto border-0 bg-red-400 hover:bg-red-500 text-white gap-2 cursor-pointer shrink-0 transition-all"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    {isPending ? "Claiming..." : "Claim Profile"}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25 bg-card">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        Claiming a Profile
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="pt-3 pb-2 space-y-3 text-sm text-foreground">
                            <p className="text-foreground">
                                By claiming this profile, you unlock the ability to manage its data, add private contact information, and link your dogs.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                <li>You must be the <strong>actual person</strong> (or an authorized representative) to claim this profile.</li>
                                <li>False claims are considered impersonation and may lead to an immediate account ban.</li>
                                <li>Any extra data you provide will be subject to our privacy policy.</li>
                            </ul>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-start space-x-3 py-4 mt-2">
                    <Checkbox
                        id="terms"
                        checked={hasAcceptedTerms}
                        onCheckedChange={(checked) => setHasAcceptedTerms(checked as boolean)}
                        className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="impersonation-check"
                            className="text-sm font-medium text-foreground leading-tight cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I declare that I am this person or an authorized representative. I understand that false claims will result in a permanent account ban.
                        </label>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between bg-card">
                    <Button
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={isPending}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmClaim}
                        disabled={!hasAcceptedTerms || isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Claiming...
                            </>
                        ) : (
                            "Confirm Claim"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}