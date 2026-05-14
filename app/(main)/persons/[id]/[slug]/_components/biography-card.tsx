import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";

interface BiographyCardProps {
  bio?: string | null;
}

export function BiographyCard({ bio }: BiographyCardProps) {
  return (
    <Card className="rounded-3xl border-none shadow-md h-full overflow-hidden">
      {/* Mantiene la consistenza visiva con ContactCard (separazione netta e background neutro) */}
      <CardHeader className="border-b border-slate-100 py-4 px-6">
        <CardTitle className="flex items-center gap-3">
          <Pen className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Biography</h2>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* whitespace-pre-wrap è fondamentale per preservare gli a capo inseriti dall'utente nelle textarea */}
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
          {bio ? (
            bio
          ) : (
            <span className="italic text-slate-400">No biography available.</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}