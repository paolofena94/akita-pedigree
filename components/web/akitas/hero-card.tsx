"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ProfileGallery } from "./profile-gallery";
import { Calendar, Mars, Palette, Ruler, Share, Weight, CheckCircle2, ChevronDown, ChevronUp, Dna, Share2, Globe, Cross, Star, Rainbow, Venus, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { getCountryName, getFlagEmoji } from "@/lib/nations";

// --- TIPI CONDIVISI ---
interface DogData {
    slug: string;
    name: string;
    callName: string;
    sex: string;
    color: string;
    height: string;
    weight: string;
    dob: string;
    dod: string;
    landOfBirth: string;
    landOfStanding: string;
    birthYear: string;
    photoUrl: string;
}

interface HeroCardProps {
    dog: DogData;
    basePath: string;
    onToggleExpand: (expanded: boolean) => void;
}

const images = [
    "https://images.unsplash.com/photo-1512568555509-049820d30edb?q=80&w=1172&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1714668006514-672860318bfe?q=80&w=724&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580064755419-883acc42900b?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594228072372-ff7776c6a0d9?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1670269828655-689caf8aa01a?q=80&w=687&auto=format&fit=crop",
];

const dog: DogData = {
    slug: "kashi-go",
    name: "Shiratoriseiza No Tenshi Of The Heavenly Mountain",
    callName: "Kashi",
    sex: "Male",
    color: "Red",
    height: "66.0 cm",
    weight: "42.0 kg",
    dob: "June 12, 2014",
    dod: "April 21, 2023",
    landOfBirth: "JP",
    landOfStanding: "IT",
    birthYear: "2014",
    photoUrl: "https://images.unsplash.com/photo-1512568555509-049820d30edb?q=80&w=1172&auto=format&fit=crop"
};

// ==========================================
// COMPONENTE PRINCIPALE (CONTROLLER)
// ==========================================
export function HeroCard() {
    const pathname = usePathname();
    const basePath = `/akitas/${dog.slug}`;

    // Rimuoviamo eventuali slash finali per garantire la corrispondenza esatta con il basePath
    const safePathname = pathname?.replace(/\/$/, '');
    const isOverviewRoute = safePathname === basePath;

    const [isExpanded, setIsExpanded] = useState(isOverviewRoute);

    useEffect(() => {
        setIsExpanded(isOverviewRoute);
    }, [isOverviewRoute]);

    if (isExpanded) {
        return <FullHeroCard dog={dog} basePath={basePath} onToggleExpand={setIsExpanded} />;
    }

    return <CompactHeroCard dog={dog} basePath={basePath} onToggleExpand={setIsExpanded} />;
}

const akitaThemes = {
    // 🐕 Akita Fulvo/Rosso (Red)
    Red: {
        gradient: "from-orange-500/80 to-transparent",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        accentText: "text-orange-600",
        badge: "text-orange-500 bg-orange-50/50 border-orange-200"
    },
    // 🐕 Akita Bianco (White) - Usiamo un grigio ghiaccio/ardesia elegantissimo
    White: {
        gradient: "from-slate-400/70 to-transparent",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
        accentText: "text-slate-600",
        badge: "text-slate-500 bg-slate-50 border-slate-200"
    },
    // 🐕 Akita Tigrato (Brindle) - Toni terra/pietra scuri
    Brindle: {
        gradient: "from-stone-700/80 to-transparent",
        iconBg: "bg-stone-100",
        iconColor: "text-stone-700",
        accentText: "text-stone-700",
        badge: "text-stone-600 bg-stone-50 border-stone-300"
    },
    // 🐕 Akita Sesamo (Sesame) - Toni ruggine/mogano
    Sesame: {
        gradient: "from-red-800/80 to-transparent",
        iconBg: "bg-red-50",
        iconColor: "text-red-700",
        accentText: "text-red-700",
        badge: "text-red-600 bg-red-50 border-red-200"
    },
    // Fallback di sicurezza se il colore non è specificato
    Default: {
        gradient: "from-emerald-600/80 to-transparent",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        accentText: "text-emerald-600",
        badge: "text-emerald-600 bg-emerald-50 border-emerald-200"
    }
};

// ==========================================
// VERSIONE ESTESA
// ==========================================
function FullHeroCard({ dog, basePath, onToggleExpand }: HeroCardProps) {
    const theme = akitaThemes[dog.color as keyof typeof akitaThemes] || akitaThemes.Default;
    const completionPercentage = calculateProfileCompletion(dog);

    return (
        <section className="flex-1 overflow-y-auto pb-8">

            {/* GRIGLIA*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 md:gap-6 max-w-7xl mx-auto">

                <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-start gap-6 w-full">

                    {/* CARD GALLERY (Mantiene sempre le proporzioni quadrate perfette) */}
                    <div className="w-full aspect-square flex flex-col items-center justify-center rounded-4xl shrink-0 border border-slate-200 bg-white shadow-lg overflow-hidden">
                        <ProfileGallery
                            images={images}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 400px"
                        />
                    </div>

                    {/* ZONA BOTTONI */}
                    <div className="flex justify-center gap-4">

                        {/* Tasto Share (Grigino neutro) */}
                        <Button
                            variant="ghost" // Rimuove gli sfondi predefiniti aggressivi di shadcn
                            size="lg"
                            className="flex items-center shadow-md gap-2 px-4 rounded-full font-medium bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-100! hover:text-slate-900! transition-all duration-200 hover:brightness-95 active:scale-95 cursor-pointer"
                        >
                            <Share2 className="w-4 h-4" /> Share
                        </Button>

                        {/* Tasto Testmating (Colore principale/Vibrante) */}
                        <Button
                            size="lg"
                            className="flex items-center shadow-md border-0 gap-2 px-4 rounded-full font-medium bg-primary text-white hover:bg-primary transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
                        >
                            <Dna className="w-4 h-4" /> Testmating
                        </Button>

                    </div>
                </div>

                {/* CARD INFO (Si allunga in base al contenuto) */}
                <div className="col-span-1 md:col-span-2 relative p-6 md:p-8 flex flex-col bg-white rounded-4xl shadow-lg border border-slate-200">

                    {/* INTESTAZIONE E DATE */}
                    <div className="relative z-10 w-full mb-6 shrink-0">

                        <div className="font-mono text-foreground/50 mb-3 text-sm">#LO1998270</div>

                        <div className="flex items-start gap-4 md:gap-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-none mb-3">
                                {dog.name}
                            </h1>
                            <ProfileProgressBar percentage={50} size="sm" />
                        </div>


                        <div className="flex flex-wrap items-center gap-6">
                            <p className="text-xl font-medium italic text-foreground/90">
                                "{dog.callName}"
                            </p>

                            <div className="flex items-center gap-2 text-sm text-foreground/80 bg-accent/50 px-3 py-1.5 rounded-full border border-accent/60">
                                <Calendar className="w-4 h-4 text-foreground/50 stroke-[2.5]" />
                                <span className="font-semibold">{dog.dob}</span>

                                {dog.dod && (
                                    <>
                                        <span className="text-foreground/30 mx-1">-</span>
                                        <Rainbow className="w-4 h-4 text-foreground/50 stroke-[2.5]" />
                                        <span className="font-semibold">{dog.dod}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CONTENITORE UNICO COMBINATO */}
                    <div className="flex flex-col xl:flex-row gap-6 w-full relative z-10 p-4 md:p-5 border-t border-slate-200">

                        {/* COLONNA SINISTRA: Griglia Dati */}
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-5">
                                Info
                            </h3>

                            <div className="grid grid-cols-2 gap-y-8">
                                <InfoItem
                                    icon={<Mars className="w-4 h-4 text-blue-500 stroke-[2.5]" />}
                                    iconBgClass="bg-white p-2 shadow-sm"
                                    label="Sex"
                                    value={dog.sex}
                                />
                                <InfoItem
                                    icon={<span className="text-lg leading-none">{getFlagEmoji(dog.landOfBirth)}</span>}
                                    iconBgClass="bg-white p-2 shadow-sm"
                                    label="Born in"
                                    value={getCountryName(dog.landOfBirth)}
                                />
                                <InfoItem
                                    icon={<div className="w-3 h-3 rounded-full bg-orange-600 shadow-sm border border-orange-700/10" />}
                                    iconBgClass="bg-white p-2.5 shadow-sm"
                                    label="Color"
                                    value={dog.color}
                                />
                                <InfoItem
                                    icon={<span className="text-lg leading-none">{getFlagEmoji(dog.landOfStanding)}</span>}
                                    iconBgClass="bg-white p-2 shadow-sm"
                                    label="Staying in"
                                    value={getCountryName(dog.landOfStanding)}
                                />
                                <InfoItem
                                    icon={<Ruler className="w-4 h-4 text-slate-500 stroke-[2.5]" />}
                                    iconBgClass="bg-white p-2 shadow-sm"
                                    label="Height"
                                    value={dog.height}
                                />
                                <InfoItem
                                    icon={<Weight className="w-4 h-4 text-slate-500 stroke-[2.5]" />}
                                    iconBgClass="bg-white p-2 shadow-sm"
                                    label="Weight"
                                    value={dog.weight}
                                />
                            </div>
                        </div>


                        {/* COLONNA DESTRA: Pedigree */}
                        <div className="flex-1 flex flex-col pt-4 xl:pt-0">
                            <h3 className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-3">
                                Parents
                            </h3>

                            {/* MAGIA RESPONSIVE: in colonna su mobile, riga su tablet, colonna su desktop */}
                            <div className="flex flex-col md:flex-row xl:flex-col gap-3">

                                {/* SIRE (Padre) */}
                                <div className="flex-1 flex items-center gap-3 p-2 rounded-2xl bg-white border border-transparent shadow-sm hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                                    <div className="p-2 rounded-xl shrink-0 flex items-center justify-center leading-none bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                        <Mars className="w-4 h-4 text-blue-500 stroke-[2.5]" />
                                    </div>
                                    <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
                                        <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Sire</p>
                                        <span className="text-sm font-bold text-foreground/80 truncate">
                                            Yuki Bo
                                        </span>
                                    </div>
                                </div>

                                {/* DAM (Madre) */}
                                <div className="flex-1 flex items-center gap-3 p-2 rounded-2xl bg-white border border-transparent shadow-sm hover:border-pink-200 hover:bg-pink-50/50 transition-colors cursor-pointer group">
                                    <div className="p-2 rounded-xl shrink-0 flex items-center justify-center leading-none bg-pink-50 group-hover:bg-pink-100 transition-colors">
                                        <Venus className="w-4 h-4 text-pink-500 stroke-[2.5]" />
                                    </div>
                                    <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
                                        <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Dam</p>
                                        <span className="text-sm font-bold text-foreground/80 truncate">
                                            Urufu Go Aka
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleExpand(false)}
                            className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50! rounded-full px-4 transition-colors cursor-pointer"
                        >
                            Collapse <ChevronUp className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}


// ==========================================
// VERSIONE COMPATTA
// ==========================================
function CompactHeroCard({ dog, onToggleExpand }: HeroCardProps) {
    return (
        <section className="flex-1 overflow-y-auto pb-8">
            <div className="top-14.25 z-40 bg-white/80 backdrop-blur-md border border-slate-200 rounded-4xl p-6 md:p-8 shadow-lg flex items-center justify-between transition-all duration-300 animate-in fade-in slide-in-from-top-2">

                {/* Blocco Sinistro: Immagine + Dati Incolonnati */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-sm relative">
                        <Image src={dog.photoUrl} alt={dog.name} fill sizes="48px" className="object-cover" />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-primary leading-tight line-clamp-1">{dog.name}</h2>

                        <div className="flex items-center gap-3 mt-0.5 text-sm font-medium text-slate-500">
                            <span className="flex items-center gap-1">
                                <Mars className="w-4 h-4 text-blue-500" /> {dog.sex}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-orange-600" /> {dog.color}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-slate-400" /> {dog.birthYear}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Blocco Destro: Tasto Espandi */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleExpand(true)}
                    className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50! rounded-full px-4 transition-colors cursor-pointer"
                >
                    Expand <ChevronDown className="w-4 h-4" />
                </Button>

            </div>
        </section>
    );
}


// Definiamo le props (se usi TypeScript)
interface InfoItemProps {
    icon: React.ReactNode;
    iconBgClass: string;
    label: string;
    value: string;
}

function InfoItem({ icon, iconBgClass, label, value }: InfoItemProps) {
    return (
        <div className="flex items-center gap-3 shrink-0 w-full">
            <div className={`p-2 rounded-xl shrink-0 flex items-center justify-center leading-none ${iconBgClass}`}>
                {icon}
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
                <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest truncate">{label}</p>
                <span className="text-sm font-bold text-foreground/80 truncate">{value}</span>
            </div>
        </div>
    );
}

// Funzione per calcolare la percentuale di completamento del profilo
function calculateProfileCompletion(dogData: any) {
    // Definiamo i campi che consideriamo "chiave" per un profilo completo
    const keyFields = [
        'sex',
        'landOfBirth',
        'dob',
        'color',
        'landOfStanding',
        'sire',
        'dam'
    ];

    let filledFields = 0;

    keyFields.forEach(field => {
        // Se il campo esiste, non è null, non è undefined e non è una stringa vuota
        if (dogData[field] && dogData[field].trim() !== '') {
            filledFields++;
        }
    });

    // Calcoliamo la percentuale e arrotondiamo all'intero più vicino
    const percentage = Math.round((filledFields / keyFields.length) * 100);
    return percentage;
}

interface ProgressBarProps {
    percentage: number;
    size?: "sm" | "md" | "lg" | "xl"; // Aggiunta la prop opzionale
}

function ProfileProgressBar({ percentage, size = "md" }: ProgressBarProps) {
    // 1. Logica per assegnare il colore in base alla percentuale
    let colorClass = "text-red-500"; // <= 50% (Rosso)

    if (percentage >= 91) {
        colorClass = "text-emerald-400";  // 91-100%
    } else if (percentage >= 81) {
        colorClass = "text-green-500";    // 81-90%
    } else if (percentage >= 71) {
        colorClass = "text-lime-400";     // 71-80%
    } else if (percentage >= 61) {
        colorClass = "text-yellow-400";   // 61-70%
    } else if (percentage >= 51) {
        colorClass = "text-orange-500";   // 51-60%
    }

    // 2. Logica per assegnare le dimensioni al contenitore e al testo
    const sizeConfig = {
        sm: {
            container: "w-20 h-12", // Molto piccolo
            text: "text-sm",
            offsetY: "pb-0",        // Nessun padding dal fondo
        },
        md: {
            container: "w-28 h-16", // Dimensione standard (quella che avevi prima)
            text: "text-xl",
            offsetY: "pb-0.5",
        },
        lg: {
            container: "w-40 h-24", // Grande
            text: "text-3xl",
            offsetY: "pb-1",
        },
        xl: {
            container: "w-56 h-32", // Gigante (es. per una hero o un cruscotto)
            text: "text-5xl",
            offsetY: "pb-2",
        }
    };

    // Estraiamo le classi corrette in base alla size passata (default: "md")
    const { container, text, offsetY } = sizeConfig[size];

    return (
        // Usiamo la dimensione dinamica per il contenitore
        <div className={`relative shrink-0 ${container}`}>
            <svg
                viewBox="0 0 100 60"
                className="absolute top-0 left-0 w-full h-full overflow-visible"
            >
                {/* Sfondo Grigio (Traccia vuota) */}
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-200"
                    strokeWidth="10"
                    strokeLinecap="round"
                />

                {/* Arco Colorato (Il Progresso) */}
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    className={colorClass}
                    strokeWidth="10"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset={100 - percentage}
                    style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
                />
            </svg>

            {/* Applichiamo le classi dinamiche per il testo e il suo posizionamento */}
            <div className={`absolute bottom-0 left-0 w-full flex justify-center ${offsetY}`}>
                <span className={`font-extrabold leading-none ${text} ${colorClass}`}>
                    {percentage}%
                </span>
            </div>
        </div>
    );
}