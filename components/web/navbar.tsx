import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { menuEntries } from "@/config/navigation";
import { NavDropdownCategory } from "./dropdown-menu";

export function Navbar(){
    return (
        <nav className="top-0 z-50 w-full">
            <div className="flex h-20 max-w-10xl items-center justify-between px-6 my-3">
                <BrandLogo/>

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
                            <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "p-5 text-2xl hover:bg-transparent")}>
                                <Link href="/docs">Docs</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="p-5 text-xl">Login</Button>
                    <Button className="p-5 text-xl hover:bg-primary/80">Sign Up</Button>
                </div>
            </div>
        </nav>
    )
}

function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <Image
          src="/icon.png"
          alt="Muso Akita Logo"
          fill
          priority
          sizes="72px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center text-left leading-none">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
          Akita
        </h1>
        <h1 className="-mt-2 text-2xl font-extrabold tracking-tight text-foreground">
          Pedigree
        </h1>
      </div>
    </Link>
  )
}