import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="w-full relative min-h-[calc(100vh-62px)] py-12 flex flex-col items-center justify-center mt-[navbar-height] overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/akita-hero-1.jpg"
          alt="Akita Dog portrait horizontal"
          fill
          sizes="100vw"
          className="h-full w-full object-cover md:object-center object-bottom-right"
          priority 
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/*FILTRO: Overlay Scuro */}
      <div className="absolute inset-0 z-10 bg-black/50"></div>

      {/* max-w-7xl px-6 py-12 md:py-20 flex flex-col items-center gap-12 per allineamento centrale e padding */}
      <div className="relative z-20 w-full mx-auto max-w-7xl px-6 flex flex-col items-center text-center text-accent">

        {/* Testo in primo piano (usiamo bianco/chiaro) */}
        <h1 id="hero-heading" className="text-xl md:text-4xl font-extrabold leading-tight">
          The Global <span className="text-primary">Akita Inu</span> Pedigree Database
        </h1>
        <p className="text-lg md:text-xl text-stone-200 max-w-4xl">
          Explore thousands of pedigrees and discover bloodlines from around the world.
        </p>

        {/* LA NUOVA BARRA DI RICERCA */}
        <div className="mt-10 w-full max-w-xl">
          <form className="flex w-full items-center space-x-2 bg-background/80 backdrop-blur-lg p-1 rounded-full shadow-2xl transition-all focus-within:ring-4 focus-within:ring-primary/70">

            {/* Icona Lente d'ingrandimento */}
            <Search className="h-6 w-6 text-muted-foreground ml-4 shrink-0" aria-hidden="true" />

            {/* Input shadcn customizzato */}
            <Input
              type="text"
              placeholder="Search for an Akita by name or pedigree"
              aria-label="Search for an Akita by name or pedigree"
              className="flex-1 border-0 bg-background/80 text-base md:text-md text-black focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
            />

            {/* Bottone shadcn */}
            <Button type="submit" size="lg" className="rounded-full p-3 text-base md:text-sm font-semibold shrink-0 transition-all duration-200 hover:brightness-110 active:scale-95">
              Search
            </Button>

          </form>

        </div>

      </div>
    </section>
  );
}