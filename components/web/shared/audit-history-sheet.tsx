"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    History,
    Plus,
    Pencil,
    Trash2,
    ArrowRight,
    Loader2,
    UserCheck,
    UserMinus
} from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ProcessedActivityLog } from "@/types/audit-log";
import { getEntityAuditLogsAction } from "@/actions/audit-log";

interface AuditHistorySheetProps {
    tableName: 'persons' | 'akitas' | 'kennels';
    recordId: string;
    entityTitle: string;
}

export function AuditHistorySheet({ tableName, recordId, entityTitle }: AuditHistorySheetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<ProcessedActivityLog[]>([]);

    const handleOpenChange = async (open: boolean) => {
        setIsOpen(open);

        if (open && history.length === 0) {
            setIsLoading(true);
            try {
                const data = await getEntityAuditLogsAction(tableName, recordId);
                setHistory(data);
            } catch (error) {
                console.error("Error fetching audit history:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const formatTimelineDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const renderValueJSX = (formattedValue: string) => {
        if (!formattedValue) return <span className="text-slate-300 italic">empty</span>;
        const match = formattedValue.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
            return (
                <Link href={match[2]} className="text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-2 transition-colors">
                    {match[1]}
                </Link>
            );
        }
        return <span>{formattedValue}</span>;
    };

    // Costanti per i campi sensibili da nascondere durante l'unclaim
    const SENSITIVE_FIELDS = ['address_street', 'bio', 'city', 'email', 'media', 'phone', 'postal_code'];

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit text-xs font-bold text-slate-500 hover:text-foreground hover:bg-slate-100 rounded-xl gap-2 cursor-pointer transition-colors"
                >
                    <History className="w-4 h-4" />
                    View Full Change History
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-lg! overflow-y-auto bg-card p-8">
                <SheetHeader className="pb-8">
                    <SheetTitle className="text-xl font-bold text-slate-900">Change History</SheetTitle>
                    <SheetDescription className="text-xs text-slate-500">
                        Full audit log of modifications for:
                        <span className="block text-blue-600 text-sm font-semibold mt-1">{entityTitle}</span>
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                        <p className="text-xs font-medium uppercase tracking-wider">Loading history...</p>
                    </div>
                ) : history.length === 0 ? (
                    <p className="text-sm text-slate-500 italic text-center py-12">No modification history found.</p>
                ) : (
                    <div className="relative ml-4 border-l-2 border-slate-100 pl-8 space-y-10">
                        {history.map((item) => {
                            const claimChange = item.changes?.find(c => c.key === 'claimed_by_user_id');

                            const isClaim = item.action === 'UPDATE' && claimChange && !claimChange.formattedOld && claimChange.formattedNew;
                            const isUnclaim = item.action === 'UPDATE' && claimChange && claimChange.formattedOld && !claimChange.formattedNew;

                            // 🌟 1. LOGICA ANTI-RIDONDANZA: È un'azione fatta su se stessi?
                            const extractUsername = (markdownStr?: string) => {
                                if (!markdownStr) return null;
                                const match = markdownStr.match(/^\[([^\]]+)\]/); // Estrae "paolo_f" da "[paolo_f](/users/...)"
                                return match ? match[1] : markdownStr;
                            };

                            const targetUsername = isClaim ? extractUsername(claimChange?.formattedNew) : extractUsername(claimChange?.formattedOld);
                            const isSelfAction = item.authorUsername && targetUsername === item.authorUsername;

                            let icon = <Pencil className="w-3.5 h-3.5" />;
                            let iconBg = 'bg-blue-100 text-blue-600';
                            let actionLabel = 'Modified Entry';

                            if (item.action === 'INSERT') {
                                icon = <Plus className="w-3.5 h-3.5" />;
                                iconBg = 'bg-emerald-100 text-emerald-600';
                                actionLabel = 'Created Entry';
                            } else if (item.action === 'DELETE') {
                                icon = <Trash2 className="w-3.5 h-3.5" />;
                                iconBg = 'bg-red-100 text-red-600';
                                actionLabel = 'Deleted Entry';
                            } else if (isClaim) {
                                icon = <UserCheck className="w-3.5 h-3.5" />;
                                iconBg = 'bg-green-100 text-green-600';
                                // 🌟 2. TITOLO DINAMICO: Se lo fa da solo scriviamo un testo più naturale
                                actionLabel = isSelfAction ? 'Claimed this entry' : 'Entry Claimed';
                            } else if (isUnclaim) {
                                icon = <UserMinus className="w-3.5 h-3.5" />;
                                iconBg = 'bg-amber-100 text-amber-600';
                                // 🌟 2. TITOLO DINAMICO
                                actionLabel = isSelfAction ? 'Unclaimed this entry' : 'Entry Unclaimed';
                            }

                            let displayChanges = item.changes || [];
                            if (isUnclaim) {
                                displayChanges = displayChanges.filter(c =>
                                    c.key !== 'claimed_by_user_id' && !SENSITIVE_FIELDS.includes(c.key)
                                );
                            } else if (isClaim) {
                                displayChanges = displayChanges.filter(c => c.key !== 'claimed_by_user_id');
                            }

                            return (
                                <div key={item.id} className="relative">

                                    <div className={`absolute -left-[2.85rem] top-0 p-1.5 rounded-full ring-8 ring-card shadow-sm ${iconBg}`}>
                                        {icon}
                                    </div>

                                    <div className="space-y-2.5">
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-start gap-2">
                                                {item.authorUsername ? (
                                                    <Link
                                                        href={`/users/${item.authorUsername}`}
                                                        className="text-xs font-bold text-slate-800 hover:text-blue-600 hover:underline transition-colors truncate"
                                                    >
                                                        @{item.authorUsername}
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-500 italic">System</span>
                                                )}

                                                <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                                    {formatTimelineDate(item.created_at)}
                                                </span>
                                            </div>

                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                {actionLabel}
                                            </span>
                                        </div>

                                        {item.notes && !isClaim && !isUnclaim && (
                                            <p className="text-xs text-slate-600 italic border-l-2 border-slate-200 pl-2.5 py-0.5 leading-relaxed bg-slate-50/40 pr-1 rounded-r-md">
                                                "{item.notes}"
                                            </p>
                                        )}

                                        {(displayChanges.length > 0 || isClaim || isUnclaim) && (
                                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/70 space-y-3.5 mt-2 shadow-inner">

                                                {/* 🌟 3. RENDER CLAIM PULITO */}
                                                {isClaim && claimChange && (
                                                    <div className="flex flex-col gap-1 min-w-0">
                                                        <span className="text-[9px] font-bold text-green-600 uppercase tracking-wide">
                                                            Person Claimed
                                                        </span>
                                                        {/* Mostriamo il target SOLO se l'autore non è se stesso */}
                                                        {!isSelfAction && (
                                                            <span className="text-xs text-slate-700 mt-0.5">
                                                                Target account: <span className="font-medium">{renderValueJSX(claimChange.formattedNew)}</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* 🌟 3. RENDER UNCLAIM PULITO */}
                                                {isUnclaim && claimChange && (
                                                    <div className="flex flex-col gap-1 min-w-0">
                                                        <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wide">
                                                            Person Unclaimed
                                                        </span>
                                                        {/* Mostriamo da chi è stato rimosso SOLO se l'autore non è se stesso (es. Admin o System) */}
                                                        {!isSelfAction && (
                                                            <span className="text-xs text-slate-700 mt-0.5">
                                                                Removed from: <span className="font-medium line-through text-slate-400">{renderValueJSX(claimChange.formattedOld)}</span>
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-slate-500 italic mt-1">
                                                            Private profile data has been securely wiped.
                                                        </span>
                                                    </div>
                                                )}

                                                {/* ... ciclo map dei displayChanges classici ... */}
                                                {displayChanges.map((change) => (
                                                    <div key={change.key} className="flex flex-col gap-1 min-w-0">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                                                            {change.fieldName}
                                                        </span>

                                                        {item.action === 'UPDATE' && (
                                                            <div className="flex items-center gap-2 text-xs">
                                                                <span className="text-slate-400 line-through wrap-break-word" title={change.formattedOld}>
                                                                    {renderValueJSX(change.formattedOld)}
                                                                </span>
                                                                <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                                                                <span className="text-slate-700 font-medium wrap-break-word" title={change.formattedNew}>
                                                                    {renderValueJSX(change.formattedNew)}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {item.action === 'INSERT' && (
                                                            <div className="text-xs text-slate-700 font-medium wrap-break-word" title={change.formattedNew}>
                                                                {renderValueJSX(change.formattedNew)}
                                                            </div>
                                                        )}

                                                        {item.action === 'DELETE' && (
                                                            <div className="text-xs text-slate-400 line-through wrap-break-word" title={change.formattedOld}>
                                                                {renderValueJSX(change.formattedOld)}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}