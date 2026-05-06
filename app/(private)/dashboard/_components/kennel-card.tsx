"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HouseHeart, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Kennel {
  name: string
  role: string
}

interface MyKennelsSectionProps {
  kennels: Kennel[]
}

export function MyKennelsSection({ kennels }: MyKennelsSectionProps) {
  return (
    <Card className="rounded-3xl shadow-sm border-slate-200/60 p-2 bg-card">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <HouseHeart className="w-6 h-6 text-orange-500" />
          My Kennels
          <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
            ({kennels?.length || 0})
          </span>
        </CardTitle>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 rounded-full font-bold text-muted-foreground hover:text-orange-600 transition-all duration-200 active:scale-95"
        >
          <Link href="">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 pt-0">
        {kennels.length > 0 ? (
          kennels.map((k, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-orange-200 hover:bg-orange-50/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Initial Box */}
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black group-hover:bg-orange-600 group-hover:text-white transition-colors uppercase">
                  {k.name[0]}
                </div>

                <div>
                  <p className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
                    {k.name}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-white border-slate-200 shadow-sm"
                  >
                    {k.role}
                  </Badge>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-sm text-muted-foreground italic font-medium">
              No kennels linked to your profile.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}