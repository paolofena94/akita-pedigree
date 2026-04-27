import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface BrandLogoProps {
  size?: LogoSize;
  inverse?: boolean; // Se true, fa diventare le scritte bianche per fondi scuri/colorati
  withLink?: boolean; // Nuova prop per controllare il link
  className?: string;
}

// Qui "fotografiamo" le tue proporzioni esatte e le scaliamo matematicamente
const sizeConfig = {
  sm: {
    container: "gap-1.5",
    image: "h-7 w-7",
    topText: "text-sm",
    bottomText: "text-[10px]",
    imageSize: "28px",
  },
  md: { // La tua misura base originale
    container: "gap-2.5",
    image: "h-10 w-10",
    topText: "text-lg",
    bottomText: "text-sm",
    imageSize: "40px",
  },
  lg: {
    container: "gap-4",
    image: "h-16 w-16",
    topText: "text-3xl",
    bottomText: "text-xl",
    imageSize: "64px",
  },
  xl: { // Perfetto per il Layout di Login
    container: "gap-5",
    image: "h-24 w-24",
    topText: "text-5xl",
    bottomText: "text-3xl",
    imageSize: "96px",
  },
};

export function BrandLogo({ size = "md", inverse = false, withLink = true, className }: BrandLogoProps) {
  const config = sizeConfig[size];
  const containerClasses = cn(`flex items-center ${config.container}`, className);

  const innerContent = (
    <>
      <div className={cn(`relative flex shrink-0 items-center justify-center`, config.image)}>
        <Image
          src="/icon.png"
          alt="Akita Pedigree Logo"
          fill
          priority
          sizes={config.imageSize}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center text-left" aria-hidden="true">
        <span 
          className={cn(
            `font-extrabold tracking-tight leading-none`, 
            config.topText,
            inverse ? "text-white" : "text-primary"
          )}
        >
          Akita
        </span>
        <span 
          className={cn(
            `font-extrabold tracking-tight leading-none -mt-1.5`, 
            config.bottomText,
            inverse ? "text-white/90" : "text-foreground"
          )}
        >
          Pedigree
        </span>
      </div>
    </>
  );

  // Se withLink è true, restituiamo il componente avvolto in un <Link>
  if (withLink) {
    return (
      <Link href="/" aria-label="Go to Akita Pedigree homepage" className={containerClasses}>
        {innerContent}
      </Link>
    );
  }

  // Altrimenti, restituiamo un semplice <div> non cliccabile
  return (
    <div className={containerClasses}>
      {innerContent}
    </div>
  );
}