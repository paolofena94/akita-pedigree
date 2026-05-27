import Link from "next/link";
import { Plus, Pencil, Trash2, History, UserCheck, UserMinus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ActivityFilters } from "./activity-filters";
import { activityParamsSchema } from "@/lib/validations/filter";
import { SharedPagination } from "@/components/web/shared/pagination";
import { getUserActivityLogs } from "@/lib/db/audit-log";
import { ActivityDetailsDialog } from "./activity-details-dialog";

export interface ActivityBoardProps {
    userId: string;
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function ActivityBoard({ userId, searchParams }: ActivityBoardProps) {
    const { page, action, entity, from, to } = activityParamsSchema.parse(searchParams);
    const limit = 10;

    const { logs, totalPages } = await getUserActivityLogs({
        userId,
        page,
        limit,
        actionFilter: action,
        entityFilter: entity,
        fromFilter: from,
        toFilter: to,
    });

    const createPageUrl = (p: number) => {
        const params = new URLSearchParams(searchParams as Record<string, string>);
        params.set("page", p.toString());
        return `?${params.toString()}`;
    };

    return (
        <Card className="rounded-3xl border border-slate-200 shadow-sm bg-white p-6 md:p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-slate-400" />
                    <h2 className="text-lg font-semibold text-foreground tracking-tight">Activity Log</h2>
                </div>
            </div>

            <ActivityFilters />

            <div className="relative grow my-4">
                <div className="absolute left-2.75 top-2 bottom-2 w-px bg-slate-100" />

                <div className="space-y-0.5">
                    {logs.length === 0 ? (
                        <div className="py-20 text-center text-slate-400 text-sm font-medium">
                            No activity matching current filters.
                        </div>
                    ) : (
                        logs.map((log) => {
                            const entityHref = `/${log.table_name}/${log.entityId}/${log.entitySlug}`;

                            // 🌟 LOGICA CLAIM / UNCLAIM
                            const claimChange = log.changes?.find(c => c.key === 'claimed_by_user_id');
                            const isClaim = log.action === 'UPDATE' && claimChange && !claimChange.formattedOld && claimChange.formattedNew;
                            const isUnclaim = log.action === 'UPDATE' && claimChange && claimChange.formattedOld && !claimChange.formattedNew;

                            // Set default (INSERT/UPDATE/DELETE)
                            let actionText = log.action === 'INSERT' ? 'Created' : log.action === 'UPDATE' ? 'Modified' : 'Deleted';
                            let icon = <Pencil className="w-3 h-3 text-slate-600" />;
                            let actionColorClass = "text-slate-500";
                            
                            if (log.action === 'INSERT') {
                                icon = <Plus className="w-3 h-3 text-slate-600" />;
                            } else if (log.action === 'DELETE') {
                                icon = <Trash2 className="w-3 h-3 text-slate-400" />;
                            } else if (isClaim) {
                                // 🌟 Override se è un Claim
                                actionText = 'Claimed Profile';
                                icon = <UserCheck className="w-3 h-3 text-green-600" />;
                                actionColorClass = "text-green-600";
                            } else if (isUnclaim) {
                                // 🌟 Override se è un Unclaim
                                actionText = 'Unclaimed Profile';
                                icon = <UserMinus className="w-3 h-3 text-amber-600" />;
                                actionColorClass = "text-amber-600";
                            }

                            return (
                                <div key={log.id} className="group relative pl-9 pr-2 py-3 hover:bg-slate-50 rounded-xl transition-colors duration-150">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors">
                                        {icon}
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {/* Etichetta Azione */}
                                            <span className={`text-[13px] font-medium whitespace-nowrap ${actionColorClass}`}>
                                                {actionText}
                                            </span>

                                            {/* Link Entità */}
                                            {log.action !== 'DELETE' ? (
                                                <Link href={entityHref} className="text-[13px] font-bold text-slate-900 hover:text-primary transition-colors truncate">
                                                    {log.entityName}
                                                </Link>
                                            ) : (
                                                <span className="text-[13px] font-bold text-slate-900 truncate">{log.entityName}</span>
                                            )}

                                            {/* Badge Tabella (Nascosto se è un claim, perché è ovvio che sia una 'person') */}
                                            {!isClaim && !isUnclaim && (
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-tight shrink-0">
                                                    {log.table_name.replace(/s$/, '')}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex flex-col md:items-end text-[11px] font-medium shrink-0">
                                            <time className="text-slate-400" dateTime={log.created_at}>
                                                {new Date(log.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </time>

                                            <ActivityDetailsDialog log={log} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <SharedPagination
                currentPage={page}
                totalPages={totalPages}
                createPageUrl={createPageUrl}
            />
        </Card>
    );
}