import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { menuEntries } from "@/config/navigation";
import { NavDropdownCategory } from "./dropdown-menu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav aria-label="Main" className="top-0 z-50 w-full">
      <div className="flex items-center justify-between mx-auto bg-background max-w-8xl px-6 py-3 shadow-md">
        <BrandLogo />

        <NavigationMenu>
          <NavigationMenuList>

            {menuEntries.map((menu) => (
              <NavDropdownCategory
                key={menu.title}
                title={menu.title}
                items={menu.items}
              />
            ))}

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "p-5 text-xl font-semibold hover:bg-transparent")}>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="lg" className="p-3 text-md font-semibold transition-all duration-200 active:scale-95">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" className="p-3 text-md font-semibold transition-all duration-200 hover:brightness-110 active:scale-95">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

function BrandLogo() {
  return (
    <Link href="/" aria-label="Go to Akita Pedigree homepage" className="flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <Image
          src="/icon.png"
          alt="Akita Pedigree Logo"
          fill
          priority
          sizes="72px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center text-left leading-none" aria-hidden="true">
        <span className="text-2xl font-extrabold tracking-tight text-primary">
          Akita
        </span>
        <span className="-mt-2 text-xl font-extrabold tracking-tight text-foreground">
          Pedigree
        </span>
      </div>
    </Link>
  )
}