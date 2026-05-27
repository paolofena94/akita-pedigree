import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Clock, UserCheck } from "lucide-react";
import { AuditHistorySheet } from "@/components/web/shared/audit-history-sheet";

interface MetadataInfo {
    created_at: string | null; 
    username: string | null;
}

interface EntryMetadataCardProps {
    metadata?: {
        created: MetadataInfo | null;
        last_modified: MetadataInfo | null;
    } | null;
    latestNote: string | null;
    recordId: string;
    entityName: string;
    tableName: 'persons' | 'akitas' | 'kennels';
}

export function EntryMetadataCard({ metadata, latestNote, recordId, entityName, tableName }: EntryMetadataCardProps) {
    const { created, last_modified } = metadata || {};

    const formatDateTime = (dateString: string | null | undefined) => {
        if (!dateString) return "Unknown date"; 
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit', 
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
                {created && (
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                            <div className="bg-slate-200/50 p-1.5 rounded-md text-slate-500 shrink-0">
                                <UserCheck className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 leading-none mt-0.5">
                                    Created By
                                </p>
                                <Link
                                    href={`/users/${created.username || "System"}`}
                                    className="text-sm font-bold text-slate-700 hover:text-blue-600 hover:underline transition-colors truncate"
                                >
                                    @{created.username || "System"}
                                </Link>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <time className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                                {formatDateTime(created.created_at)}
                            </time>
                        </div>
                    </div>
                )}

                {/* BLOCCO ULTIMA MODIFICA */}
                {last_modified && (
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                            <div className="bg-slate-200/50 p-1.5 rounded-md text-slate-500 shrink-0">
                                <Clock className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 leading-none mt-0.5">
                                    Last Edit
                                </p>
                                <Link
                                    href={`/users/${last_modified.username || "System"}`}
                                    className="text-sm font-bold text-slate-700 hover:text-blue-600 hover:underline transition-colors truncate"
                                >
                                    @{last_modified.username || "System"}
                                </Link>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <time className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                                {formatDateTime(last_modified.created_at)}
                            </time>
                        </div>
                    </div>
                )}

                {/* BLOCCO NOTE RIPRISTINATO (Posizionato dopo i dati di creazione e modifica) */}
                {latestNote && (
                    <p className="text-xs text-slate-600 italic border-l-2 border-slate-200 pl-2 py-0.5">
                        "{latestNote}"
                    </p>
                )}
            </div>

            <div className="h-px bg-slate-200/50 w-full -mt-2 -mb-0.5" />

            <div className="flex justify-center">
                <AuditHistorySheet 
                    tableName={tableName}
                    recordId={recordId}
                    entityTitle={entityName}
                />
            </div>
        </Card>
    );
}