'use client'

import Link from 'next/link'
import { AlertTriangle, User, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter 
} from '@/components/ui/dialog'
// Importa la tua utility per le nazioni
import { getCountryName } from '@/lib/nations'

interface DuplicatePerson {
    id: string | number;
    profile_id: string | number;
    slug: string;
    first_name: string | null;
    last_name: string;
    country: string;
    state?: string | null;
}

interface DuplicateWarningDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    duplicates: DuplicatePerson[] | null;
    searchedCountry: string;
    onBypass: () => void;
}

export function DuplicateWarningDialog({
    isOpen,
    onOpenChange,
    duplicates,
    searchedCountry,
    onBypass
}: DuplicateWarningDialogProps) {
    
    if (!duplicates || duplicates.length === 0) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-background">
                <DialogHeader className="flex flex-col items-center justify-center text-center space-y-2 pt-2">
                    <div className="bg-amber-100 p-3 rounded-full mb-1">
                        <AlertTriangle className="h-8 w-8 text-amber-600" />
                    </div>
                    <DialogTitle className="text-xl font-bold">Wait a second!</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground leading-snug">
                        We found existing profiles in <span className="font-bold text-foreground">{getCountryName(searchedCountry)}</span> that look similar.
                    </DialogDescription>
                </DialogHeader>

                {/* Lista rimpicciolita */}
                <div className="py-2 space-y-2 max-h-[35vh] overflow-y-auto px-1">
                    {duplicates.map((dupe) => (
                        <Link
                            key={dupe.id}
                            href={`/persons/${dupe.profile_id}/${dupe.slug}`}
                            className="group flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-xs hover:border-primary/50 hover:bg-slate-50/50 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                {/* Icona più piccola */}
                                <div className="bg-accent p-2 rounded-full text-slate-400">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {dupe.first_name ? `${dupe.first_name} ` : ''}{dupe.last_name}
                                    </p>
                                    <p className="text-[12px] text-muted-foreground leading-tight">
                                        {dupe.state ? `${dupe.state}, ` : ''}{getCountryName(dupe.country)}
                                    </p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                        </Link>
                    ))}
                </div>

                <DialogFooter className="mt-4 flex flex-col sm:flex-col gap-2 bg-background">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs font-bold border-slate-200 cursor-pointer hover:bg-slate-50! w-full"
                        onClick={onBypass}
                    >
                        None of these. Continue creating.
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}