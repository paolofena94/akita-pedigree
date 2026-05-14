import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Skeleton Colonna Sinistra (Card Profilo e Persona) */}
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-100 w-full rounded-xl bg-slate-100" />
          <Skeleton className="h-50 w-full rounded-xl bg-slate-100" />
        </div>

        {/* Skeleton Colonna Destra (Log Attività) */}
        <div className="lg:col-span-2">
          <Skeleton className="h-150 w-full rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}