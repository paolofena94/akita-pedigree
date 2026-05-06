import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dog, ArrowUpRight, LucideIcon } from "lucide-react"

interface DogsSectionProps {
  title: string
  totalCount: number
  icon: LucideIcon
  emptyText: string
}

export function DogsSection({ title, totalCount, icon: Icon, emptyText }: DogsSectionProps) {
  return (
    <Card className="rounded-3xl shadow-sm border-slate-200/60 overflow-hidden bg-card">
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <Icon className="w-6 h-6 text-orange-500" /> {title} 
          <span className="text-slate-400 font-semibold text-base -ml-1 tracking-widest">
            ({totalCount || 0})
          </span>
        </CardTitle>
        <Button variant="ghost" size="sm" className="rounded-full font-bold text-muted-foreground hover:text-orange-600">
          View all <ArrowUpRight className="ml-1 w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        {totalCount > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[...Array(totalCount > 4 ? 4 : totalCount)].map((_, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-4xl bg-slate-50 border border-slate-200/60 flex items-center justify-center transition-all group-hover:border-orange-200 group-hover:bg-orange-50/30">
                  <Dog className="w-10 h-10 text-slate-200 group-hover:text-orange-300 transition-colors" />
                </div>
                <p className="mt-3 text-sm font-bold text-center truncate group-hover:text-orange-600">
                  Akita Name {i + 1}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground italic">{emptyText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}