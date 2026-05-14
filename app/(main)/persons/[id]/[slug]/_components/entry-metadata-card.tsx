import { PersonProfile } from "@/types/person";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
    Clock,
    UserCheck,
    History,
    Plus,
    Edit2,
    ArrowRight,
    MessageSquare
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { formatAuditDate } from "@/lib/date-formatter";

// --- MOCK DATA PER LA HISTORY AGGIORNATA ---
const MOCK_HISTORY = [
    {
        id: "h1",
        action: "UPDATE",
        date: "2026-05-07T14:22:00Z",
        user: "ModeratorAkita",
        notes: "Updated contact info as requested by the breeder via email.",
        changes: [
            { field: "Website", old: "n/a", new: "https://akitapride.com" },
            { field: "City", old: "Tokyo", new: "Kyoto" },
            { field: "Phone", old: "+81 90...", new: "Hidden" }
        ]
    },
    {
        id: "h2",
        action: "UPDATE",
        date: "2025-11-20T09:15:00Z",
        user: "AdminPaolo",
        notes: "Verified kennel ownership and added Breeder role.",
        changes: [
            { field: "Roles", old: "Owner", new: "Breeder, Owner" }
        ]
    },
    {
        id: "h3",
        action: "UPDATE",
        date: "2025-06-12T11:05:00Z",
        user: "ModeratorAkita",
        notes: "Fixed typo in the phone number.",
        changes: [
            { field: "Phone", old: "+39 3493516164", new: "n/a" }
        ]
    },
    {
        id: "h4",
        action: "CREATE",
        date: "2024-01-15T10:30:00Z",
        user: "AdminPaolo",
        notes: "Initial profile creation from AKIHO registry import.",
        changes: []
    }
];

export function EntryMetadataCard({ person }: { person: PersonProfile }) {

    // Helper per formattazione data
    const formatDateTime = (dateString: string | undefined, fallback: string) => {
        return new Date(dateString || fallback).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="rounded-3xl border-none shadow-sm bg-slate-50/50 p-6 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Entry Metadata</h4>

            <div className="space-y-6">
                {/* BLOCCO CREAZIONE */}
                <div className="flex items-start justify-between gap-4">
                    {/* Colonna SX: Icona + Text */}
                    <div className="flex items-start gap-3 min-w-0">
                        <div className="bg-slate-200/50 p-1.5 rounded-md text-slate-500 shrink-0">
                            <UserCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            {/* leading-none e mt-0.5 allineano otticamente la label al centro dell'icona */}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 leading-none mt-0.5">
                                Created By
                            </p>
                            <Link
                                href={`/users/${person.created_by_username || "System"}`}
                                className="text-sm font-bold text-slate-700 hover:text-primary hover:underline transition-colors truncate"
                            >
                                @{person.created_by_username || "System"}
                            </Link>
                        </div>
                    </div>

                    {/* Colonna DX: Date */}
                    <div className="text-right shrink-0">
                        <time className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                            {formatAuditDate(person.created_at, "2024-01-15T10:30:00Z")}
                        </time>
                    </div>
                </div>

                {/* BLOCCO ULTIMA MODIFICA */}
                <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        {/* Colonna SX: Icona + Text */}
                        <div className="flex items-start gap-3 min-w-0">
                            <div className="bg-slate-200/50 p-1.5 rounded-md text-slate-500 shrink-0">
                                <Clock className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 leading-none mt-0.5">
                                    Last Edit
                                </p>
                                <Link
                                    href={`/users/${person.updated_by_username || "System"}`}
                                    className="text-sm font-bold text-slate-700 hover:text-primary hover:underline transition-colors truncate"
                                >
                                    @{person.updated_by_username || "System"}
                                </Link>
                            </div>
                        </div>

                        {/* Colonna DX: Date */}
                        <div className="text-right shrink-0">
                            <time className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                                {formatAuditDate(person.updated_at, "2026-05-07T14:22:00Z")}
                            </time>
                        </div>
                    </div>

                    {/* ZONA NOTES ULTIMA MODIFICA */}
                    {MOCK_HISTORY[0]?.notes && (
                        // ml-9 compensa la larghezza dell'icona (p-1.5 + w-3.5) e del gap-3 per allineare le note al testo "Last Edit"
                        <div className="ml-9 bg-slate-100/80 rounded-xl p-3 border border-slate-200/50 relative">
                            <MessageSquare className="w-3 h-3 text-slate-400 absolute top-3 right-3" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Edit Note</p>
                            <p className="text-xs text-slate-600 italic leading-relaxed">
                                "{MOCK_HISTORY[0].notes}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="h-px bg-slate-200/50 w-full -mt-2 -mb-0.5" />

            {/* IMPLEMENTAZIONE SHEET PER FULL HISTORY */}
            <div className="flex justify-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-fit text-xs font-bold text-slate-500 hover:text-foreground hover:bg-white! rounded-xl gap-2 cursor-pointer"
                        >
                            <History className="w-4 h-4" />
                            View Full Change History
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-card p-8">
                        <SheetHeader className="pb-8">
                            <SheetTitle className="text-xl font-bold">Change History</SheetTitle>
                            <SheetDescription>
                                Full audit log of modifications for: <span className="block text-primary text-md font-semibold mt-1"> {person.first_name} {person.last_name}</span>
                            </SheetDescription>
                        </SheetHeader>

                        {/* TIMELINE VISUALIZATION */}
                        <div className="relative ml-4 border-l-2 border-slate-100 pl-8 space-y-10">
                            {MOCK_HISTORY.map((item) => (
                                <div key={item.id} className="relative">
                                    {/* Icona della Timeline */}
                                    <div className={`absolute -left-[2.85rem] top-0 p-2 rounded-full ring-8 ring-card ${item.action === 'CREATE'
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {item.action === 'CREATE' ? <Plus className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                    </div>

                                    {/* Contenuto del Log */}
                                    <div className="space-y-3">
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <Link
                                                    href={`/users/${item.user}`}
                                                    className="text-sm font-bold text-slate-900 hover:text-primary hover:underline transition-colors"
                                                >
                                                    @{item.user}
                                                </Link>
                                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                                    {new Date(item.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                {item.action === 'CREATE' ? 'Created Entry' : 'Modified Entry'}
                                            </span>
                                        </div>

                                        {/* Notes dello storico */}
                                        {item.notes && (
                                            <p className="text-xs text-slate-600 italic border-l-2 border-slate-200 pl-2 py-0.5">
                                                "{item.notes}"
                                            </p>
                                        )}

                                        {/* Box dei cambiamenti (se presenti) */}
                                        {item.changes.length > 0 && (
                                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3 mt-2">
                                                {item.changes.map((change, idx) => (
                                                    <div key={idx} className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase">{change.field}</span>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span className="text-slate-400 line-through truncate max-w-25 sm:max-w-37.5">{change.old}</span>
                                                            <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                                                            <span className="text-blue-600 font-semibold truncate">{change.new}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-[11px] text-slate-400 italic">
                                            {formatDateTime(item.date, "")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </Card>
    );
}