"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Definiamo l'interfaccia per le Props
interface ProfileGalleryProps {
    images: string[];
    sizes?: string;
}

// 2. Passiamo le props al componente con valori di default
export function ProfileGallery({ 
    images = [], 
    sizes = "(max-width: 768px) 100vw, 400px" 
}: ProfileGalleryProps) {
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

    // 3. Controllo di sicurezza: se non ci sono immagini, non renderizziamo nulla (o puoi mettere un placeholder)
    if (!images || images.length === 0) {
        return null; 
    }

    return (
        <>
            <div className="relative z-20 w-full aspect-square overflow-hidden group shadow-sm shrink-0">

                <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent className="ml-0 h-full">
                        {images.map((src, index) => (
                            <CarouselItem key={index} className="pl-0 w-full h-full">
                                <div className="relative w-full aspect-square h-full">
                                    <Image
                                        src={src}
                                        alt={`Foto ${index + 1}`}
                                        fill
                                        sizes={sizes} // 4. Applichiamo la prop sizes qui
                                        className="object-cover"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* TASTO ESPANDI */}
                <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-slate-800 shadow-inner opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/90 active:scale-95 z-30"
                    aria-label="Espandi immagine"
                >
                    <Maximize className="w-4 h-4" />
                </button>

                {/* Controlli di navigazione */}
                {images.length > 1 && (
                    <>
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-slate-950/25 to-transparent pointer-events-none z-20" />

                        {activeIndex > 0 && (
                            <button
                                onClick={() => api?.scrollPrev()}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 shadow-md text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 z-30" aria-label="Immagine precedente"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}

                        {activeIndex < images.length - 1 && (
                            <button
                                onClick={() => api?.scrollNext()}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 shadow-md text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 z-30"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}

                        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-30">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300 shadow-sm",
                                        activeIndex === index ? "bg-white w-4" : "bg-white/60 w-1.5 hover:bg-white/90"
                                    )}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* LIGHTBOX */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 z-110"
                        aria-label="Chiudi"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto p-4 md:p-12 flex items-center justify-center">
                        <Image
                            src={images[activeIndex]}
                            alt={`Foto a tutto schermo ${activeIndex + 1}`}
                            fill
                            className="object-contain"
                            quality={100}
                            priority
                        />
                    </div>

                    {images.length > 1 && (
                        <>
                            {activeIndex > 0 && (
                                <button
                                    onClick={() => api?.scrollPrev()}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-200 z-110"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}

                            {activeIndex < images.length - 1 && (
                                <button
                                    onClick={() => api?.scrollNext()}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-200 z-110"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}


export function ProfileGalleryWithThumbnails() {
    const [mainApi, setMainApi] = useState<CarouselApi>();
    const [thumbApi, setThumbApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);

    // Scrolla l'immagine principale quando si clicca una miniatura
    const onThumbClick = useCallback(
        (index: number) => {
            if (!mainApi) return;
            mainApi.scrollTo(index);
        },
        [mainApi]
    );

    // Sincronizza lo stato quando l'immagine principale viene scorsa
    const onSelect = useCallback(() => {
        if (!mainApi || !thumbApi) return;
        const selected = mainApi.selectedScrollSnap();
        setActiveIndex(selected);
        thumbApi.scrollTo(selected);
    }, [mainApi, thumbApi]);

    useEffect(() => {
        if (!mainApi) return;
        onSelect();
        mainApi.on("select", onSelect);
        mainApi.on("reInit", onSelect);
    }, [mainApi, onSelect]);

    const images = [
        "https://images.unsplash.com/photo-1512568555509-049820d30edb?q=80&w=1172&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1714668006514-672860318bfe?q=80&w=724&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580064755419-883acc42900b?q=80&w=1170&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1594228072372-ff7776c6a0d9?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1670269828655-689caf8aa01a?q=80&w=687&auto=format&fit=crop",
    ];

    return (
        <div className="relative z-20 w-full md:w-80 space-y-4 shrink-0">
            {/* Carosello Principale */}
            <Carousel setApi={setMainApi} className="w-full aspect-square rounded-2xl shadow-sm overflow-hidden">
                <CarouselContent className="h-full ml-0">
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="pl-0 w-full">
                            <div className="relative w-full aspect-square">
                                <Image
                                    src={src}
                                    alt={`Foto ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 320px"
                                    className="object-cover"
                                    loading={index === 0 ? "eager" : "lazy"} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Miniature (Thumbnails) */}
            <Carousel setApi={setThumbApi} opts={{ containScroll: "keepSnaps", dragFree: true }} className="w-full">
                <CarouselContent className="ml-0 flex gap-3 pt-2 mx-2">
                    {images.map((src, index) => (
                        <div key={index} className="pl-0 shrink-0">
                            <button
                                type="button"
                                onClick={() => onThumbClick(index)}
                                className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all  ${index === activeIndex
                                    ? "ring-2 ring-primary/80 ring-offset-2 opacity-100"
                                    : "opacity-50 hover:opacity-100"
                                    }`}
                            >
                                <Image src={src} alt={`Thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" />
                            </button>
                        </div>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}