// app/(main)/persons/[id]/[slug]/_components/biography-card.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";

interface BiographyCardProps {
  bio: string; 
}

export function BiographyCard({ bio }: BiographyCardProps) {
  return (
    <Card className="rounded-3xl border-none shadow-md h-full overflow-hidden">
      <CardHeader className="border-b border-slate-100 py-4 px-6">
        <CardTitle className="flex items-center gap-3">
          <Pen className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Biography</h2>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Usiamo text-foreground/90 o text-slate-700 per un contrasto eccellente nella lettura lunga */}
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
}