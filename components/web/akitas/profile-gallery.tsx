"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export function ProfileGallery() {
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