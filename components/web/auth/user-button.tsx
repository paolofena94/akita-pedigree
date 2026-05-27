'use client'

import Link from "next/link"
import { useTransition } from "react"
import { LogOut, User as UserIcon, ChevronDown, Dog, Home, Users, Settings, History, Loader2, LucideIcon, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserButtonProps {
  username: string;
  avatarUrl?: string | null;
  onSignOut: () => Promise<void> 
}

export function UserButton({ username, avatarUrl, onSignOut }: UserButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await onSignOut();
    });
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="group">
        <button 
          disabled={isPending}
          className="flex items-center gap-2 px-3 py-2 rounded-full transition-all hover:bg-accent/60 focus:outline-none border border-transparent data-[state=open]:border-accent data-[state=open]:bg-accent/60 disabled:opacity-50"
        >
          <Avatar className="h-7 w-7 border border-primary/30">
            <AvatarImage src={avatarUrl || undefined} alt={username} />
            <AvatarFallback className="bg-accent text-primary">
              <UserIcon className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>

          <span className="text-sm font-semibold text-foreground hidden sm:block">
            {username}
          </span>

          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-foreground transition-transform duration-300",
                "group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" 
              )} 
            />
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 mt-2 p-2 bg-white border-slate-200 shadow-xl rounded-2xl" 
        align="end"
      > 
        {/* SECTION 1: ACCOUNT & ACTIVITY */}
        <DropdownMenuGroup>
          {MENU_LINKS.map((item) => (
            <UserNavAction key={item.href} {...item} />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />
        
        {/* LOGOUT */}
        <DropdownMenuItem 
          disabled={isPending}
          className="rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer px-3 py-2.5"
          onSelect={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span className="text-sm font-bold">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MENU_LINKS = [
  { href: "/dashboard", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/settings/profile", label: "Settings", icon: Settings },
]


function UserNavAction({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return (
    <DropdownMenuItem asChild className="rounded-lg cursor-pointer px-3 py-2">
      <Link href={href} className="flex items-center w-full">
        <Icon className="mr-2 h-4 w-4 text-slate-500" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </DropdownMenuItem>
  )
}