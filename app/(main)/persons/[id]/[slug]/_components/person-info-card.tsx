import { PersonProfile } from "@/types/person";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "@/components/ui/sheet";
import { getFlagEmoji, getCountryName } from "@/lib/nations";
import { AlertTriangle, Edit, Globe, Info, Mail, Maximize, Phone } from "lucide-react";

interface ProfileInfoCardProps {
    person: PersonProfile
}

export function ProfileInfoCard({ person }: ProfileInfoCardProps) {
    const initials = `${person.first_name?.[0] || ''}${person.last_name[0]}`.toUpperCase();

    const isClaimed = !!person.claimed_by;

    // Costruiamo la stringa in base allo stato
    const locationLine = isClaimed
        ? [
            person.postal_code,
            person.city,
            person.state ? `(${person.state})` : null
        ].filter(Boolean).join(" ")
        : [
            person.state,
            person.country ? getCountryName(person.country) : null
        ].filter(Boolean).join(", ");

    return (
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden relative">

            {/* Gradiente blu per l'entità Person */}
            <div className="h-20 bg-linear-to-r from-blue-500/20 to-blue-500/5 w-full relative flex justify-end items-start p-3">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-white/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    Person Profile
                </span>
            </div>

            {/* TASTI AZIONE: Avvolti correttamente nei loro Provider */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">

                {/* DIALOG PER REPORT */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:bg-transparent! hover:text-red-600 rounded-full transition-all duration-200 cursor-pointer aria-expanded:bg-transparent aria-expanded:text-red-600"
                        >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='bg-card'>
                        <DialogHeader>
                            <DialogTitle>Report Incorrect Information</DialogTitle>
                            <DialogDescription>
                                Please provide details about what needs to be fixed.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 text-sm text-center text-muted-foreground border-2 border-dashed border-slate-200 rounded-lg">
                            [Form di segnalazione in costruzione]
                        </div>
                    </DialogContent>
                </Dialog>

                {/* SHEET PER EDIT */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground border border-transparent hover:bg-transparent! hover:text-foreground rounded-full transition-all duration-200 cursor-pointer aria-expanded:bg-transparent aria-expanded:text-foreground"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full px-4 sm:max-w-xl overflow-y-auto bg-card">
                        <SheetHeader>
                            <SheetTitle>Edit Person</SheetTitle>
                            <SheetDescription>
                                Update the person's informations.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-8 py-12 text-sm text-center text-muted-foreground border-2 border-dashed border-slate-200 rounded-lg">
                            [Form di modifica in costruzione]
                        </div>
                    </SheetContent>
                </Sheet>

            </div>

            {/* Aggiunto pt-0 per compensare il gradiente */}
            <CardContent className="px-8 pb-12 pt-0 text-center relative">

                {/* Aggiunto -mt-12 per far sormontare l'immagine al gradiente */}
                <div className="inline-block mb-6 relative group -mt-12">
                    {person.media?.avatar_url ? (
                        <>
                            {/* L'immagine base */}
                            <img
                                src={person.media.avatar_url}
                                className="w-55 h-55 rounded-3xl object-cover border-4 border-white bg-slate-100 shadow-sm relative z-10"
                                alt={`${person.first_name || ''} ${person.last_name}`}
                            />

                            {/* BOTTONE INGRANDISCI (In alto a sx SULL'IMMAGINE) */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-2 left-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white/90 shadow-inner transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                                    >
                                        <Maximize className="h-3 w-3" />
                                    </Button>
                                </DialogTrigger>

                                {/* Modale a grandezza massima */}
                                <DialogContent className="max-w-[95vw] w-fit p-0 bg-transparent border-none shadow-none flex justify-center items-center">
                                    <DialogTitle className="sr-only">Profile Picture</DialogTitle>
                                    <DialogDescription className="sr-only">
                                        Enlarged view of the profile picture.
                                    </DialogDescription>
                                    <img
                                        src={person.media.avatar_url}
                                        className="max-h-[80vh] max-w-[80vw] object-contain"
                                        alt={`${person.first_name || ''} ${person.last_name} (Ingrandita)`}
                                    />
                                </DialogContent>
                            </Dialog>

                            {/* BOTTONE INFO / COPYRIGHT (In alto a dx SULL'IMMAGINE) */}
                            {(person.media.description || person.media.copyright) && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white/90 shadow-inner transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                                        >
                                            <Info className="h-3.5 w-3.5" />
                                        </Button>
                                    </PopoverTrigger>
                                    {/* Aggiunto bg-card, side="right" e align="start" */}
                                    <PopoverContent className="p-4 w-64 text-sm bg-card" align="start" side="right" sideOffset={10}>
                                        <div className="space-y-6">
                                            {person.media.description && (
                                                <div>
                                                    <h4 className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Description</h4>
                                                    <p>{person.media.description}</p>
                                                </div>
                                            )}
                                            {person.media.copyright && (
                                                <div>
                                                    <h4 className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Copyright</h4>
                                                    <p className="font-medium">© {person.media.copyright}</p>
                                                </div>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </>
                    ) : (
                        <div className="w-40 h-40 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold border-4 border-background shadow-lg relative z-10">
                            {initials}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex flex-wrap justify-center gap-1 mb-1">
                        {person.roles?.map((role: string) => (
                            <Badge
                                key={role}
                                variant="secondary"
                                className={`text-[10px] uppercase tracking-wider ${getRoleBadgeStyle(role)}`}
                            >
                                {role}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {person.first_name} {person.last_name}
                    </h1>

                    {/* Indirizzo */}
                    <div className="mt-3 flex items-center justify-center gap-3 text-muted-foreground text-sm max-w-sm mx-auto overflow-hidden relative z-10">

                        <span className="text-xl leading-none">{getFlagEmoji(person.country)}</span>
                        <div className="flex items-center gap-1.5 text-left leading-snug min-w-0">
                            {/* Nome Nazione, Provincia */}
                            <span className="font-medium text-slate-700 truncate text-sm">
                                {[
                                    person.country ? getCountryName(person.country) : null,
                                    person.state // la tua provincia
                                ].filter(Boolean).join(", ") || "Location unknown"}
                            </span>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

const getRoleBadgeStyle = (role: string) => {
    const normalizedRole = role.toLowerCase();

    switch (normalizedRole) {
        case 'breeder':
            // Verdino
            return 'bg-emerald-100 text-emerald-700 border-transparent hover:bg-emerald-200';
        case 'owner':
            // Bianco con contorno
            return 'bg-white border-slate-200 text-slate-700 hover:bg-slate-300';
        case 'kennel founder':
        case 'founder':
            // Violetto/Bluastro elegante
            return 'bg-violet-100 text-violet-700 border-transparent hover:bg-violet-200';
        default:
            // Stile di default (grigino) per eventuali altri ruoli futuri
            return 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200';
    }
};