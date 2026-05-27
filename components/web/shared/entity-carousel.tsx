"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize, ChevronLeft, ChevronRight, X, Image as ImageIcon, Info, Copyright } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EntityMedia } from "@/types/media";

interface EntityCarouselProps {
    media: EntityMedia[] | null;
    fallbackText?: string;
    altText?: string;
    sizes?: string;
    className?: string;
    fallbackClassName?: string;
}

export function EntityCarousel({
    media,
    fallbackText = "",
    altText = "Immagine",
    sizes = "(max-width: 768px) 100vw, 400px",
    className,
    fallbackClassName
}: EntityCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const onSelect = useCallback(() => {
        if (!api) return;
        setActiveIndex(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);
    }, [api, onSelect]);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isLightboxOpen]);

    const validMedia = media && Array.isArray(media) ? media.filter(m => m.src) : [];

    // CASO 1: NESSUNA IMMAGINE
    if (validMedia.length === 0) {
        return (
            <div className={cn("relative z-20 flex items-center justify-center shrink-0 overflow-hidden shadow-sm bg-slate-100 text-slate-400", fallbackClassName, className)}>
                {fallbackText ? (
                    <span className="text-3xl font-semibold tracking-tight">{fallbackText}</span>
                ) : (
                    <ImageIcon className="w-1/3 h-1/3 opacity-50" />
                )}
            </div>
        );
    }

    const images = validMedia.map(m => m.src);

    // Stili condivisi per un'estetica e animazioni uniformi
    const actionButtonClass = "w-6 h-6 flex items-center justify-center rounded-full bg-black/40 text-white/90 hover:bg-black/60 transition-colors shadow-sm outline-none";
    const overlayWrapperClass = "absolute z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

    // CASO 2 & 3: UNA O PIÙ IMMAGINI
    return (
        <TooltipProvider delayDuration={150}>
            <div className={cn("relative z-20 group shadow-sm shrink-0 overflow-hidden bg-slate-100", className)}>
                <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent className="ml-0 h-full">
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="pl-0 w-full h-full">
                                <div className="relative w-full h-full aspect-square">
                                    <Image
                                        src={src}
                                        alt={`${altText} - Foto ${index + 1}`}
                                        fill
                                        sizes={sizes}
                                        className="object-cover"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        unoptimized={true}
                                    />

                                    {/* 🌟 TASTO INFO & TOOLTIP (In Alto a Sinistra) */}
                                    {validMedia[index].description && (
                                        <div className={cn("top-2 left-2", overlayWrapperClass)}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={(e) => e.preventDefault()}
                                                        className={actionButtonClass}
                                                        aria-label="Show Description"
                                                    >
                                                        <Info className="w-3.5 h-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" sideOffset={6} className="border-none text-white/95 text-[11px] leading-tight px-2.5 py-1.5 backdrop-blur-md shadow-lg max-w-45">
                                                    <p>{validMedia[index].description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    )}

                                    {/* 🌟 TASTO COPYRIGHT & TOOLTIP (In Basso a Destra) */}
                                    {validMedia[index].copyright && (
                                        <div className={cn("bottom-2 right-2", overlayWrapperClass)}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={(e) => e.preventDefault()}
                                                        className={actionButtonClass}
                                                        aria-label="Mostra copyright"
                                                    >
                                                        <Copyright className="w-3.5 h-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" sideOffset={6} className="border-none text-white/95 text-[11px] leading-tight px-2.5 py-1.5 backdrop-blur-md shadow-lg max-w-45">
                                                    <p>© {validMedia[index].copyright}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* 🌟 TASTO ESPANDI LIGHTBOX (In Alto a Destra) */}
                <div className={cn("top-2 right-2", overlayWrapperClass)}>
                    <button
                        onClick={() => setIsLightboxOpen(true)}
                        className={cn(actionButtonClass, "cursor-pointer")}
                        aria-label="Espandi immagine"
                    >
                        <Maximize className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Controlli di navigazione (SOLO SE > 1 IMMAGINE) */}
                {images.length > 1 && (
                    <>
                        {activeIndex > 0 && (
                            <button
                                onClick={() => api?.scrollPrev()}
                                className={cn(
                                    actionButtonClass,
                                    "absolute left-2 top-1/2 -translate-y-1/2",
                                    "opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
                                )} 
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                        )}

                        {activeIndex < images.length - 1 && (
                            <button
                                onClick={() => api?.scrollNext()}
                                className={cn(
                                    actionButtonClass,
                                    "absolute right-2 top-1/2 -translate-y-1/2",
                                    "opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
                                )}
                            >
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        )}

                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-30 pointer-events-none">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300 shadow-sm",
                                        activeIndex === index ? "bg-white w-3" : "bg-white/60 w-1.5"
                                    )}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* LIGHTBOX (Con Descrizione + Copyright centrali in basso) */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Tasto X (In Alto a Destra) */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 z-110"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto p-4 md:p-12 flex flex-col items-center justify-center gap-3">
                        
                        {/* Wrapper Immagine */}
                        <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={images[activeIndex]}
                                alt={`${altText} Full Screen ${activeIndex + 1}`}
                                className="max-w-full max-h-full object-contain cursor-default drop-shadow-2xl"
                                onClick={(e) => e.stopPropagation()} 
                            />
                        </div>

                        {/* Area Testi: Descrizione e Copyright */}
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col items-center gap-1 z-110"
                        >
                            {validMedia[activeIndex].description && (
                                <p className="text-white/90 text-center max-w-2xl text-sm">
                                    {validMedia[activeIndex].description}
                                </p>
                            )}
                            {validMedia[activeIndex].copyright && (
                                <p className="text-white/50 text-center max-w-2xl text-[11px]">
                                    © {validMedia[activeIndex].copyright}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Pulsanti di Navigazione (Sempre fuori dal box intermedio) */}
                    {images.length > 1 && (
                        <>
                            {activeIndex > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        api?.scrollPrev();
                                    }}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-200 z-110"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}

                            {activeIndex < images.length - 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        api?.scrollNext();
                                    }}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-200 z-110"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </TooltipProvider>
    );
}