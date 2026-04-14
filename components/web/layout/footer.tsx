import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">

      <h2 id="footer-heading" className="sr-only">Footer navigation</h2>
      
      <div className="flex flex-wrap flex-row justify-between gap-6 mx-auto max-w-7xl px-6 py-6 ">
          
        <FooterLogo />
        
        {/* Colonna 1: Esplora */}
        <nav aria-label="Discover links" className="flex flex-col items-start gap-2">
          <h3 className="text-lg font-semibold text-foreground">Discover</h3>
          <ul className="flex flex-col space-y-2 text-md text-muted-foreground">
            <li><Link href="/about" className="transition-colors hover:text-primary">About Us</Link></li>
            <li><Link href="/faq" className="transition-colors hover:text-primary">FAQ / Help</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-primary">Contact</Link></li>
          </ul>
        </nav>

        {/* Colonna 2: Link rapidi */}
        <nav aria-label="Quick links" className="flex flex-col items-start gap-2">
          <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
          <ul className="flex flex-col space-y-2 text-md text-muted-foreground">
            <li><Link href="/terms" className="transition-colors hover:text-primary">Testmating</Link></li>
            <li><Link href="/privacy" className="transition-colors hover:text-primary">Add an Akita</Link></li>
            <li><Link href="/cookie" className="transition-colors hover:text-primary">Add a Profile</Link></li>
            <li><Link href="/cookie" className="transition-colors hover:text-primary">Claim your Profile</Link></li>
          </ul>
        </nav>

        {/* Colonna 2: Community & Supporto */}
        <div className="flex flex-col gap-4">

          <nav aria-label="Support links" className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">Support Us</h3>
            <ul className="flex flex-col space-y-2 text-md text-muted-foreground">
              <li><Link href="/donate" className="transition-colors font-medium hover:text-primary">Donations</Link></li>
            </ul>
          </nav>

          {/* Icone Social */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">Social</h3>
            <div className="flex gap-4 text-muted-foreground">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Visit our Facebook page" className="transition-colors hover:text-primary">
                <FaFacebook className="h-6 w-6" strokeWidth={1.5} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Visit our Instagram page" className="transition-colors hover:text-primary">
                <FaInstagram className="h-6 w-6" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Colonna 4: Legale */}
        <nav aria-label="Legal links" className="flex flex-col items-start gap-2">
          <h3 className="text-lg font-semibold text-foreground">Legal</h3>
          <ul className="flex flex-col space-y-2 text-md text-muted-foreground">
            <li><Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/cookie" className="transition-colors hover:text-primary">Cookie Policy</Link></li>
          </ul>
        </nav>

      </div>
      
      {/* Barra inferiore (Copyright a sx, Firma a dx) */}
      <div className="p-2 flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
        
        {/* Copyright a sinistra */}
        <p className="order-2 mt-4 md:order-1 md:mt-0">
          © {new Date().getFullYear()} Akita Pedigree. All rights reserved.
        </p>
        
        {/* Firma a destra con link */}
        <p className="order-1 md:order-2">
          Designed by{" "}
          <a 
            href="https://iltuolink.com" 
            target="_blank" 
            rel="noreferrer" 
            className="font-medium transition-colors hover:text-primary underline-offset-4 hover:underline"
          >
            Paolo Fenaroli
          </a>
        </p>
        
      </div>
    </footer>
  );
}

function FooterLogo() {
  return (
    <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <Image
          src="/icon.png"
          alt="Muso Akita Logo"
          fill
          priority
          sizes="56px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center text-left leading-none" aria-hidden="true">
        <span className="text-xl md:text-2xl font-extrabold tracking-tight text-primary">
          Akita
        </span>
        <span className="-mt-2 text-lg md:text-xl font-extrabold tracking-tight text-foreground">
          Pedigree
        </span>
      </div>
    </Link>
  )
}