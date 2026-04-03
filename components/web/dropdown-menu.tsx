"use client"

import { MenuEntry, MenuItem } from "@/config/navigation";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "../ui/navigation-menu";
import { ArrowRight } from "lucide-react";


export function NavDropdownCategory({ title, items }: MenuEntry) {
  return (
    <NavigationMenuItem className="gap-5">
      <NavigationMenuTrigger className="p-5 text-2xl font-semibold bg-transparent hover:bg-transparent data-[state=open]:bg-transparent hover:text-primary data-[state=open]:text-primary focus:bg-transparent">
        {title}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="bg-background border-border">
        <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
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
            <div className="text-xl font-medium text-left leading-none transition-colors duration-300 group-hover:text-primary">
              {title}
            </div>
            
            <ArrowRight 
              className="size-5 -translate-x-2 text-primary opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100" 
              strokeWidth={3} 
            />
          </div>
          
          <p className="text-md line-clamp-2 text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}