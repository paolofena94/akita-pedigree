import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Akita Pedigree | Il Database Mondiale dell'Akita Inu",
  description: "Esplora il database mondiale dell'Akita Inu: oltre 43.000 pedigree, strumenti avanzati di testmating, statistiche sulla razza e directory globale degli allevatori.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${geistMono.variable} antialiased`}
    >
      <body className="font-sans min-h-screen flex flex-col">
        
        
        <main className="flex-1">
          {children}
        </main>

        
      </body>
    </html>
  );
}
