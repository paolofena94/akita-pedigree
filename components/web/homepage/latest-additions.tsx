"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Clock, HouseHeart, ShieldUser } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import React from "react";
import { Button } from "../../ui/button";

const isoFlagMap: Record<string, string> = {
  "Japan": "jp",
  "Italy": "it",
  "USA": "us",
  "France": "fr",
  "Germany": "de",
  "Spain": "es",
  "UK": "gb",
};

export type RecentAkita = {
  id: string;
  name: string;
  country: string;
  birthYear: string;
  image: string;
  sex: "male" | "female";
  color: "Red" | "White" | "Brindle" | "Sesame";
  kennel?: string;
  breeder?: string;
};

export const recentAkita: RecentAkita[] = [
  {
    id: "1",
    name: "Kenjiro Go Shirai",
    country: "Japan",
    birthYear: "2023",
    image: "/images/kashi.jpg",
    sex: "male",
    color: "Red",
    kennel: "Shirai Kensha",
  },
  {
    id: "2",
    name: "Hachiko Lineage Kuma",
    country: "Italy",
    birthYear: "2022",
    image: "/images/miharashi.jpg",
    sex: "male",
    color: "Brindle",
    breeder: "Giovanni Fenaroli",
  },
  {
    id: "3",
    name: "Sakura No Tenshi",
    country: "USA",
    birthYear: "2024",
    image: "/images/akita-hero-1.jpg",
    sex: "female",
    color: "White",
    kennel: "Tenshi Akitas",
    breeder: "Jane Doe",
  },
  {
    id: "4",
    name: "Taro Tora Go",
    country: "France",
    birthYear: "2021",
    image: "/images/akita-puppy.jpg",
    sex: "male",
    color: "Red",
  },
  {
    id: "5",
    name: "Yuki No Hana",
    country: "Japan",
    birthYear: "2024",
    image: "/images/akita-puppy.jpg",
    sex: "female",
    color: "White",
    kennel: "Tora Kensha",
  },
  {
    id: "6",
    name: "Kuro Go",
    country: "France",
    birthYear: "2021",
    image: "/images/akita-puppy.jpg",
    sex: "female",
    color: "Brindle",
    breeder: "Pierre Dubois",
  },
  {
    id: "7",
    name: "Taro Tora Go",
    country: "France",
    birthYear: "2021",
    image: "/images/akita-puppy.jpg",
    sex: "male",
    color: "Sesame", // Esempio del rarissimo Sesamo
  },
  {
    id: "8",
    name: "Lumiere Stella",
    country: "France",
    birthYear: "2021",
    image: "/images/akita-puppy.jpg",
    sex: "female",
    color: "Red",
    kennel: "Lumiere Akitas",
  },
  {
    id: "9",
    name: "Taro Tora Go",
    country: "France",
    birthYear: "2021",
    image: "/images/akita-puppy.jpg",
    sex: "male",
    color: "Red",
  },
  {
    id: "10",
    name: "Marie's Pride",
    country: "France",
    birthYear: "2021",
    image: "/images/akita-puppy.jpg",
    sex: "female",
    color: "White",
    breeder: "Marie Curie",
  },
];

export function LatestAdd() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section aria-labelledby="latest-additions-heading" className="w-full bg-background">
      <div className="mx-auto">

        {/* Intestazione */}
        <div className="mb-4 md:mb-8 flex items-end justify-between">
          <div className="flex flex-col gap-2">

            <div className="flex items-center gap-3">
              <h2 id="latest-additions-heading" className="text-2xl font-extrabold tracking-tight text-foreground md:text-2xl">
                Recently Added
              </h2>

              <Clock className="size-8 text-primary stroke-3" aria-hidden="true" />
            </div>


            <p className="text-muted-foreground text-md">
              Discover the newest Akitas registered by our community.
            </p>
          </div>

          <Link
            href="/search?sort=newest"
            className="group hidden md:flex items-center gap-2 text-lg font-bold text-primary transition-transform duration-300 ease-out hover:translate-x-1"
          >
            View all
            <ArrowRight className="size-5 stroke-3 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>

        </div>

        {/* IL CAROUSEL SHADCN */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Il gap negativo (-ml-4) compensa il padding sinistro degli item */}
          <CarouselContent className="-ml-4 py-4">

            {recentAkita.map((dog) => (
              // basis-full = 1 su mobile, md:basis-1/2 = 2 su tablet, lg:basis-1/4 = 4 su desktop
              <CarouselItem key={dog.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <AkitaCard {...dog} />
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* Frecce Opzionali su mobile*/}
          {isMounted && (
            <div>
              <CarouselPrevious variant="default"
                className="-left-10 h-6 w-6 md:h-10 md:w-10 md:-left-14 bg-background text-primary transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-90 [&_svg]:stroke-[3px] [&_svg]:w-4! [&_svg]:h-4! md:[&_svg]:w-6! md:[&_svg]:h-6!" />
              <CarouselNext variant="default"
                className="-right-10 h-6 w-6 md:h-10 md:w-10 md:-right-14 bg-background text-primary transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-90 [&_svg]:stroke-[3px] [&_svg]:w-4! [&_svg]:h-4! md:[&_svg]:w-6! md:[&_svg]:h-6!" />
            </div>
          )}
        </Carousel>

        {/* Link Mobile */}
        <div className="flex justify-center mt-4 md:hidden">
          <Button asChild size="lg" className="p-5 transition-all duration-200 active:scale-95">
            <Link href="/search?sort=newest" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors ">
              View all
              <ArrowRight className="size-5 stroke-2 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}

function AkitaCard({
  image,
  name,
  id,
  country,
  birthYear,
  sex,
  color,
  kennel,
  breeder
}: RecentAkita) {
  return (
    <div className="p-1 h-full">
      <div className="group relative h-full flex flex-col rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden">

        {/* Immagine */}
        <div className="relative aspect-4/3 w-full overflow-hidden shrink-0">
          <Image
            src={image}
            alt={`Portrait of ${name}`}
            fill
            sizes="400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Dettagli Card */}
        <div className="px-5 flex flex-col grow">

          <div className="pt-4 pb-2 flex flex-row gap-2 text-xs font-mono text-muted-foreground">

            {/* Badge Colore (SX) */}
            <div className={`px-2 py-0.5 rounded-md uppercase shrink-0 ${color === "Red" ? "bg-orange-100 text-orange-700" :
              color === "White" ? "bg-slate-100 text-slate-400" :
                color === "Brindle" ? "bg-stone-200 text-stone-800" :
                  "bg-amber-100 text-amber-800"
              }`}>
              {color}
            </div>

            {/* Badge Sesso (DX) */}
            <div className={`px-2 py-0.5 rounded-md uppercase shrink-0 ${sex.toLowerCase() === "male"
              ? "bg-blue-50 text-blue-700"
              : "bg-pink-50 text-pink-700"
              }`}
            >
              {sex}
            </div>

          </div>

          {/* Nome del Cane */}
          <div className="flex items-start justify-between gap-2 group-hover:text-primary transition-colors duration-200">
            <h3 className="truncate text-lg font-bold leading-tight min-w-0">
              <Link href={`/akitas/${id}`} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {name}
              </Link>
            </h3>


          </div>

          {/* Griglia Informazioni */}
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">


            {/* RIGA 2: Country (SX) - Birth Year (DX) */}
            <div className="my-4 flex items-center justify-between gap-2 border-t pt-3">
              <div className="flex items-center gap-2 min-w-0">
                {isoFlagMap[country] ? (
                  <img
                    src={`https://flagcdn.com/w20/${isoFlagMap[country]}.png`}
                    srcSet={`https://flagcdn.com/w40/${isoFlagMap[country]}.png 2x`}
                    width="20"
                    alt={country}
                    className="h-2.5 w-auto rounded-[2px] shrink-0 shadow-xs"
                  />
                ) : (
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span className="truncate">{country}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{birthYear}</span>
              </div>
            </div>


            {/* RIGA 3 (Opzionale): Kennel o Breeder */}
            {(kennel || breeder) && (
              <div className="pb-2 flex justify-center items-center text-xs gap-2 min-w-0">
                
                {kennel ? (
                  <HouseHeart className="h-3 w-3 shrink-0" />
                ) : (
                  <ShieldUser className="h-3 w-3 shrink-0" />
                )}
                
                <span className="truncate" title={kennel || breeder}>
                  {kennel || breeder}
                </span>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}