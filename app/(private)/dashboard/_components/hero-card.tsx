"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { UserIcon } from "lucide-react"

interface DashboardHeroProps {
  username: string
  avatarUrl?: string | null // Aggiunta prop per l'avatar
}

export function DashboardHero({ username, avatarUrl }: DashboardHeroProps) {
  return (
    <section className="rounded-3xl bg-card p-10 md:p-16 shadow-md border relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          
          {/* Profile Image or Initial */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full relative bg-accent backdrop-blur-md border-4 border-primary/30 flex items-center justify-center overflow-hidden shadow-inner">
              {avatarUrl ? (
                <Image 
                  src={avatarUrl} 
                  alt={username} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 112px"
                />
              ) : (
                <span className="bg-accent text-primary">
                  <UserIcon className="h-10 w-10" />
                </span>
              )}
            </div>
            {/* Online Status Indicator */}
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-green-400 border-4 border-card rounded-full shadow-sm" />
          </div>

          <div className="space-y-3">
            <h1 className="flex flex-col text-4xl text-foreground md:text-5xl font-extrabold tracking-tight">
              Welcome back, <span className="text-3xl text-primary">@{username}</span>
            </h1>
            <p className="text-card-foreground text-lg font-medium italic max-w-lg leading-relaxed">
              Your akitas, breedings and kennels management hub.
            </p>
          </div>
        </div>

        <Button 
          asChild 
          className="rounded-full bg-primary text-white hover:brightness-110 hover:scale-105 px-10 h-14 font-bold border-none shrink-0 transition-all active:scale-95 backdrop-blur-md"
        >
          <Link href="/settings/profile">Edit Profile</Link>
        </Button>
      </div>
    </section>
  )
}