import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BrandLogo } from "../shared/brand-logo";
import { CurrentYear } from "./current-year";
import { Suspense } from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white">

      <h2 id="footer-heading" className="sr-only">Footer navigation</h2>

      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-10 mx-auto max-w-7xl px-8 py-12">

        <div className="flex flex-col gap-4 max-w-xs">
          <BrandLogo />
          <p className="text-sm text-muted-foreground leading-relaxed">
            The global database for Akita Inu pedigrees. Discover bloodlines, health clearances, and connect with breeders worldwide.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-16">

          {/* Colonna 1: Esplora */}
          <nav aria-label="Discover links" className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Discover</h3>
            <ul className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="transition-colors hover:text-primary">About Us</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-primary">FAQ / Help</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-primary">Contact</Link></li>
            </ul>
          </nav>

          {/* Colonna 2: Link rapidi */}
          <nav aria-label="Quick links" className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Quick Links</h3>
            <ul className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <li><Link href="/testmating" className="transition-colors hover:text-primary">Testmating</Link></li>
              <li><Link href="/add" className="transition-colors hover:text-primary">Add an Akita</Link></li>
              <li><Link href="/profile/add" className="transition-colors hover:text-primary">Add a Profile</Link></li>
              <li><Link href="/claim" className="transition-colors hover:text-primary">Claim your Profile</Link></li>
            </ul>
          </nav>

          {/* Colonna 3: Supporto & Social raggruppati */}
          <div className="flex flex-col gap-8">
            <nav aria-label="Support links" className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Support Us</h3>
              <ul className="flex flex-col space-y-3 text-sm text-muted-foreground">
                <li><Link href="/donate" className="transition-colors font-medium hover:text-primary">Donations</Link></li>
              </ul>
            </nav>

            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Social</h3>
              <div className="flex gap-4 text-muted-foreground">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Visit our Facebook page" className="transition-colors hover:text-primary">
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Visit our Instagram page" className="transition-colors hover:text-primary">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Colonna 4: Legale */}
          <nav aria-label="Legal links" className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Legal</h3>
            <ul className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <li><Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/cookie" className="transition-colors hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </nav>
        </div>

      </div>

      {/* Barra inferiore */}
      <div className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-8 py-2 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>
            © <Suspense fallback={<span className="inline-block w-[4ch]"></span>}><CurrentYear /></Suspense> Akita Pedigree. All rights reserved.          </p>

          <p className="mt-2 md:mt-0">
            Designed by{" "}
            <a
              href="https://iltuolink.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-700 transition-colors hover:text-primary hover:underline underline-offset-4"
            >
              Paolo Fenaroli
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}