import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"

interface Activity {
  text: string
  time: string
}

interface ActivityCardProps {
  activities: Activity[]
}

export function ActivityCard({ activities }: ActivityCardProps) {
  return (
    <Card className="rounded-3xl shadow-sm border-slate-200/60 bg-card">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-start gap-4 group">
              <div className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span className="text-sm font-bold text-slate-600 leading-tight">
                  {activity.text}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 shrink-0">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
        <Button variant="link" className="p-0 h-auto text-xs font-black text-orange-600 uppercase tracking-widest">
          View all history
        </Button>
      </CardContent>
    </Card>
  )
}