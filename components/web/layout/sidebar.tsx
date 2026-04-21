"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, HeartPulse, Network, Users, PawPrint, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", path: "", icon: Home }, // path vuoto = /akitas/[slug]
  { name: "Health & Genetics", path: "/health", icon: HeartPulse },
  { name: "Pedigree & Lineage", path: "/lineage", icon: Network },
  { name: "Family Network", path: "/family", icon: Users },
  { name: "Offspring", path: "/offspring", icon: PawPrint },
  { name: "Media", path: "/media", icon: ImageIcon },
];

export function SidebarNav({ slug }: { slug: string }) {
  const pathname = usePathname();
  const basePath = `/akitas/${slug}`;

  return (
    <nav className="p-4 space-y-1.5 flex-1">
      {NAV_ITEMS.map((item) => {
        const href = `${basePath}${item.path}`;
        // Controllo esatto per la home, controllo parziale per le altre voci
        const isActive = item.path === "" ? pathname === basePath : pathname.startsWith(href);

        return (
          <Link
            key={item.name}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-accent text-primary" // Stile Attivo (Sfondo arancione chiaro)
                : "text-foreground/80 hover:bg-accent hover:text-foreground" // Stile Inattivo
            )}
          >
            <item.icon 
              className={cn(
                "w-5 h-5 transition-colors duration-200", 
                isActive ? "text-primary" : "text-foreground/80"
              )} 
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}