import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PersonActions } from "./person-actions";
import { getFlagEmoji, getCountryName } from "@/lib/nations";
import { PersonImage } from "./person-image";
import { PersonData } from "@/types/person";
import { EntityCarousel } from "@/components/web/shared/entity-carousel";

interface PersonInfoCardProps {
    person: PersonData
    currentUserId?: string;
}

export async function PersonInfoCard({ person, currentUserId }: PersonInfoCardProps) {

    const initials = `${person.first_name?.[0] || ''}${person.last_name?.[0] || ''}`.toUpperCase();
    const fullName = `${person.first_name || ''} ${person.last_name || ''}`.trim();

    const derivedRoles: string[] = [];

    if (person.stats.ownedDogsCount > 0) derivedRoles.push("Owner");
    if (person.stats.bredDogsCount > 0) derivedRoles.push("Breeder");
    if (person.stats.kennelsCount > 0) derivedRoles.push("Kennel Member");

    return (
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden relative">

            {/* Gradiente */}
            <div className="h-20 bg-linear-to-r from-blue-500/20 to-blue-500/5 w-full relative flex justify-end items-start p-3">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-white/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    Person Profile
                </span>
            </div>

            {/* AZIONI UTENTE (Isolate in Client Component) */}
            <PersonActions
                person={person}
                currentUserId={currentUserId ?? null}
            />

            <CardContent className="px-8 pb-12 pt-0 text-center relative">

                {/* AVATAR (Isolato in Client Component) */}
                <EntityCarousel
                    media={person.media}
                    fallbackText={initials}
                    altText={fullName}
                    className="mx-auto w-40 h-40 md:w-56 md:h-56 rounded-xl mb-6 -mt-12 border-4 border-white shadow-md"
                    fallbackClassName="bg-blue-300 text-white"
                />

                <div className="space-y-2">
                    {/* Ruoli */}
                    {derivedRoles.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mb-1">
                            {derivedRoles.map((role) => (
                                <Badge
                                    key={role}
                                    variant="secondary"
                                    className={`text-[10px] uppercase tracking-wider ${getRoleBadgeStyle(role)}`}
                                >
                                    {role}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Nome e Cognome */}
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {person.first_name} {person.last_name}
                    </h1>

                    {/* Location Pulita */}
                    <div className="mt-3 flex items-center justify-center gap-3 text-muted-foreground text-sm max-w-sm mx-auto overflow-hidden relative z-10">
                        <span className="text-xl leading-none">{getFlagEmoji(person.country)}</span>
                        <div className="flex items-center gap-1.5 text-left leading-snug min-w-0">
                            <span className="font-medium text-slate-700 truncate text-sm">
                                {[
                                    person.country ? getCountryName(person.country) : null,
                                    person.state
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
    // Normalizziamo tutto in minuscolo per evitare problemi di case sensitivity
    // Così "Owner", "OWNER" o "owner" funzioneranno tutti allo stesso modo.
    const normalizedRole = role.toLowerCase();

    switch (normalizedRole) {
        case 'breeder':
            // Verde smeraldo: Ottimo per chi "crea" / alleva
            return 'bg-emerald-100 text-emerald-700 border-transparent hover:bg-emerald-200';

        case 'owner':
            // Blu cielo: Elegante e distinto per i proprietari
            return 'bg-blue-100 text-blue-700 border-transparent hover:bg-blue-200';

        case 'kennel member':
            // Viola/Lilla: Ottimo per indicare l'appartenenza a un'organizzazione (Kennel)
            return 'bg-violet-100 text-violet-700 border-transparent hover:bg-violet-200';

        default:
            // Grigio neutro: Fallback di sicurezza se in futuro aggiungi nuovi ruoli
            return 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200';
    }
};