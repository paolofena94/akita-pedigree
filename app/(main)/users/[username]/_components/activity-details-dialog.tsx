"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog";
import { ProcessedActivityLog } from "@/types/audit-log";
import { ArrowRight, Plus, Pencil, Trash2, UserCheck, UserMinus } from "lucide-react";
import Link from "next/link";

interface LogDetailsProps {
    log: ProcessedActivityLog;
}

export function ActivityDetailsDialog({ log }: LogDetailsProps) {
    const { action, table_name, created_at, changes, notes, authorUsername } = log;

    const entitySingular = table_name.replace(/s$/, '');

    // Helper per formattare la data a pillola
    const formatTimelineDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Helper per i link
    const renderValueJSX = (formattedValue: string) => {
        if (!formattedValue) return <span className="text-slate-300 italic font-normal">empty</span>;

        const markdownLinkRegex = /^\[([^\]]+)\]\(([^)]+)\)$/;
        const match = formattedValue.match(markdownLinkRegex);

        if (match) {
            const [_, text, href] = match;
            return (
                <Link
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-2 transition-colors cursor-pointer font-medium"
                >
                    {text}
                </Link>
            );
        }

        return <span>{formattedValue}</span>;
    };

    // 🌟 1. ESTRAZIONE DELLA LOGICA CLAIM / UNCLAIM (uguale alla timeline)
    const claimChange = changes?.find(c => c.key === 'claimed_by_user_id');
    const isClaim = action === 'UPDATE' && claimChange && !claimChange.formattedOld && claimChange.formattedNew;
    const isUnclaim = action === 'UPDATE' && claimChange && claimChange.formattedOld && !claimChange.formattedNew;

    const extractUsername = (markdownStr?: string) => {
        if (!markdownStr) return null;
        const match = markdownStr.match(/^\[([^\]]+)\]/);
        return match ? match[1] : markdownStr;
    };

    const targetUsername = isClaim ? extractUsername(claimChange?.formattedNew) : extractUsername(claimChange?.formattedOld);
    const isSelfAction = authorUsername && targetUsername === authorUsername;

    // 🌟 2. SETUP VARIABILI DINAMICHE
    let icon = <Pencil className="w-3 h-3" />;
    let iconBg = 'bg-blue-100 text-blue-600';
    let actionLabel = 'Modified';
    let headerTitle = 'Action Details';

    if (action === 'INSERT') {
        icon = <Plus className="w-3 h-3" />;
        iconBg = 'bg-emerald-100 text-emerald-600';
        actionLabel = 'Created';
    } else if (action === 'DELETE') {
        icon = <Trash2 className="w-3 h-3" />;
        iconBg = 'bg-red-100 text-red-600';
        actionLabel = 'Deleted';
    } else if (isClaim) {
        icon = <UserCheck className="w-3 h-3" />;
        iconBg = 'bg-green-100 text-green-600';
        actionLabel = isSelfAction ? 'Claimed their own' : 'Claimed a';
        headerTitle = 'Claim Details';
    } else if (isUnclaim) {
        icon = <UserMinus className="w-3 h-3" />;
        iconBg = 'bg-amber-100 text-amber-600';
        actionLabel = isSelfAction ? 'Unclaimed their own' : 'Unclaimed a';
        headerTitle = 'Unclaim Details';
    }

    // 🌟 3. FILTRAGGIO INTELLIGENTE
    const SENSITIVE_FIELDS = ['address_street', 'bio', 'city', 'email', 'media', 'phone', 'postal_code'];
    let displayChanges = changes || [];

    if (isUnclaim) {
        displayChanges = displayChanges.filter(c =>
            c.key !== 'claimed_by_user_id' && !SENSITIVE_FIELDS.includes(c.key)
        );
    } else if (isClaim) {
        displayChanges = displayChanges.filter(c => c.key !== 'claimed_by_user_id');
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer mt-1 md:mt-0 underline decoration-slate-300 underline-offset-2">
                    View Details
                </button>
            </DialogTrigger>

            <DialogContent className="w-full sm:max-w-md overflow-y-auto bg-card p-8">
                <DialogHeader className="pb-2">
                    <DialogTitle className="flex flex-col">
                        <span className="text-2xl font-bold tracking-tight text-slate-900">{headerTitle}</span>
                        <DialogDescription className="sr-only">
                            Detailed view of the changes made during this audit operation.
                        </DialogDescription>

                        <div className="flex items-center gap-2 mt-6">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white shadow-sm ${iconBg}`}>
                                {icon}
                            </span>

                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {actionLabel} {entitySingular} Profile
                            </span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-2 space-y-4">
                    {/* Notes - Nascoste per claim/unclaim per coerenza con la timeline */}
                    {notes && !isClaim && !isUnclaim && (
                        <p className="text-xs text-slate-600 italic border-l-2 border-slate-200 pl-2.5 py-0.5 leading-relaxed bg-slate-50/40 pr-1 rounded-r-md">
                            "{notes}"
                        </p>
                    )}

                    {(displayChanges.length > 0 || isClaim || isUnclaim) ? (
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/70 space-y-3.5 mt-2 shadow-inner">

                            {/* 🌟 RENDER CLAIM */}
                            {isClaim && claimChange && (
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wide">
                                        Person Claimed
                                    </span>
                                    <span className="text-xs text-slate-700 mt-0.5">
                                        {isSelfAction ? (
                                            <span className="font-medium">{log.entityName}</span>
                                        ) : (
                                            <>
                                                Claim of <span className="font-bold">{log.entityName}</span> assigned to user <span className="font-medium">{renderValueJSX(claimChange?.formattedNew)}</span>
                                            </>
                                        )}
                                    </span>
                                </div>
                            )}

                            {/* 🌟 RENDER UNCLAIM */}
                            {isUnclaim && claimChange && (
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wide">
                                        Person Unclaimed
                                    </span>
                                    <span className="text-xs text-slate-700 mt-0.5">
                                        {isSelfAction ? (
                                            <span className="font-medium">{log.entityName}</span>
                                        ) : (
                                            <>
                                                Claim of <span className="font-medium">{log.entityName}</span> removed from user <span className="font-medium">{renderValueJSX(claimChange?.formattedOld)}</span>
                                            </>
                                        )}
                                    </span>
                                    <span className="text-xs text-slate-500 italic mt-1">
                                        Private profile data has been securely wiped.
                                    </span>
                                </div>
                            )}

                            {displayChanges.map(({ key, fieldName, formattedOld, formattedNew }) => (
                                <div key={key} className="flex flex-col gap-1 min-w-0">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                                        {fieldName}
                                    </span>

                                    {action === 'UPDATE' && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-slate-400 line-through truncate max-w-27.5" title={formattedOld}>
                                                {renderValueJSX(formattedOld)}
                                            </span>
                                            <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                                            <span className="text-blue-600 font-semibold truncate max-w-27.5" title={formattedNew}>
                                                {renderValueJSX(formattedNew)}
                                            </span>
                                        </div>
                                    )}

                                    {action === 'INSERT' && (
                                        <div className="text-xs text-slate-700 font-medium truncate" title={formattedNew}>
                                            {renderValueJSX(formattedNew)}
                                        </div>
                                    )}

                                    {action === 'DELETE' && (
                                        <div className="text-xs text-slate-400 line-through truncate" title={formattedOld}>
                                            {renderValueJSX(formattedOld)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic">No specific field changes detected.</p>
                    )}

                    {created_at && (
                        <div className="flex justify-start pt-2">
                            <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                {formatTimelineDate(created_at)}
                            </span>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}