import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/web/shared/brand-logo";
import { ArrowLeft} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:h-screen flex w-full min-h-screen">
      {/* METÀ SINISTRA: FORM */}
      {/* Aggiunto "relative" al div principale per permettere il posizionamento assoluto della barra */}
      <div className="w-full lg:w-1/2 flex flex-col items-center bg-accent gap-6 md:gap-4 py-12 md:py-0 px-4 md:px-0">
        
        <div className="w-full flex items-start justify-between sm:px-8 mt-6">         
          {/* Tasto Go Back a sinistra */}
          <Button 
            asChild 
            variant="ghost" 
            size="sm" 
            className="px-4 text-sm font-medium rounded-full text-muted-foreground transition-all hover:bg-transparent hover:text-primary duration-200 active:scale-95"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 shrink-0" />
              Back
            </Link>
          </Button>

          {/* Brand Logo a destra */}
          {/* Usiamo size="sm" o "md" per non farlo troppo ingombrante nella barra */}
          
        </div>

        {/* IL CONTENUTO (AuthForm) */}
        {children}
        
      </div>
      {/* METÀ DESTRA: IMMAGINE */}
      <div className="hidden lg:flex flex-col w-1/2 bg-white p-12 items-center justify-center relative overflow-hidden">

        {/* Contenuto centrato: Logo e Testo */}
        <div className="relative w-full h-full p-20 flex items-center justify-center z-10">
          <Image
            src="/images/akita-login-white.png"
            alt="Akita Dog sketch with computer"
            fill
            priority
            sizes="60vw"
            className="object-contain p-4"
          />
        </div>

      </div>
    </div>
  );
}