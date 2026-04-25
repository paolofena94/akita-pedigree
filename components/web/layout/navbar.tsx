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
    <nav aria-label="Main" className="sticky top-0 z-50 w-full border-b border-slate-200">
      <div className="flex items-center justify-between mx-auto bg-white max-w-8xl px-6 py-2">
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

{/*             <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "px-4 py-2 text-sm font-medium hover:bg-transparent")}>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="px-4 text-sm font-medium rounded-full transition-all hover:bg-transparent! hover:text-primary duration-200 active:scale-95">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="px-4 text-sm font-medium rounded-full transition-all duration-200 hover:brightness-110 active:scale-95">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

function BrandLogo() {
  return (
    <Link href="/" aria-label="Go to Akita Pedigree homepage" className="flex items-center gap-2.5">
      <div className="relative flex h-10 w-10 items-center justify-center shrink-0">
        <Image
          src="/icon.png"
          alt="Akita Pedigree Logo"
          fill
          priority
          sizes="40px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center text-left" aria-hidden="true">
        <span className="text-lg font-extrabold tracking-tight text-primary leading-none">
          Akita
        </span>
        <span className=" text-sm font-extrabold tracking-tight text-foreground leading-none">
          Pedigree
        </span>
      </div>
    </Link>
  )
}