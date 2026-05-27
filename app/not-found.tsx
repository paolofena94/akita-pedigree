import Image from 'next/image';
import Link from 'next/link';
// Assumendo l'utilizzo di una libreria come shadcn/ui. 
// Modifica il path di importazione in base alla tua struttura.
import { Button } from '@/components/ui/button'; 

// Manutenibilità: Il componente rimane un Server Component.
export default function NotFound() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center p-8 bg-white text-center">
      
      <div className="relative w-full max-w-2xl aspect-video mb-4">
        <Image
          src="/images/page-not-found.png"
          alt="Akita scollegato - Error 404"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 42rem"
        />
      </div>

      <h1 className="sr-only">404 - Record not found</h1>
      
      <div className="mt-8">
        <Button asChild size="lg" >
          <Link href="/">
          Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}