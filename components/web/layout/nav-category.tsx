"use client"

import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { MenuEntry, MenuItem } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

export function NavDropdownCategory({ title, items }: MenuEntry) {
  return (
    <NavigationMenuItem className="gap-1">
      <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium bg-transparent hover:text-primary data-[state=open]:text-primary">
        {title}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="bg-white border-border">
        <ul className="grid w-100 gap-1 p-2 md:w-125 md:grid-cols-2 lg:w-150">
          {items.map((item) => (
            <NavDropdownItem key={item.title} {...item} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function NavDropdownItem({ title, href, description }: MenuItem) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a 
          href={href} 
          className="group flex flex-col items-start rounded-md p-3 hover:bg-transparent"
        >
          <div className="flex items-center gap-2 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
            <div className="text-sm font-semibold text-left leading-none transition-colors duration-300 group-hover:text-primary">
              {title}
            </div>
            
            <ArrowRight 
              className="size-4 stroke-[2.5] -translate-x-2 text-primary opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100" 
            />
          </div>
          
          <p className="text-xs line-clamp-2 text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}