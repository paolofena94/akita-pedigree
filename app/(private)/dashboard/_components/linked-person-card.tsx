"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Link2Off, Trash2, UserPlus } from "lucide-react"

interface LinkedPersonCardProps {
  isLinked: boolean
  person?: {
    firstName: string
    lastName: string
    country: string
  }
}

export function LinkedPersonCard({ isLinked, person }: LinkedPersonCardProps) {
  return (
    <Card className="rounded-3xl shadow-sm border-emerald-300 border-2 overflow-hidden bg-card">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Linked Person
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        {isLinked && person ? (
          <>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm relative group">
              <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 font-black text-lg">
                {person.firstName[0]}{person.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate text-lg">
                  {person.firstName} {person.lastName}
                </p>
                <p className="text-sm font-medium text-muted-foreground">🇮🇹 {person.country}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full rounded-xl font-bold bg-emerald-500 hover:brightness-110 h-11 text-white">
                <ExternalLink className="w-4 h-4 mr-2" /> View Profile
              </Button>
              <Button variant="ghost" className="w-full rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600 h-11">
                <Trash2 className="w-4 h-4 mr-2" /> Disconnect
              </Button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center border-2 border-dashed rounded-3xl border-slate-200 bg-white">
            <UserPlus className="w-10 h-10 mx-auto text-slate-200 mb-4" />
            <p className="text-sm text-slate-500 font-medium italic mb-6 leading-relaxed">
              Connect your profile to unlock all features.
            </p>
            <Button className="rounded-full w-full h-12 font-bold bg-orange-600 text-white hover:bg-orange-700">
              Connect Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}