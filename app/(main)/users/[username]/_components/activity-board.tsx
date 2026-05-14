import Link from "next/link";
import { Plus, Pencil, Trash2, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { ActivityFilters } from "./activity-filters";
import { MOCK_RESOURCES, INTERNAL_MOCK_LOGS } from "@/__mock__/mock-audit-logs";
import { getPaginationRange } from "@/lib/pagination";
import { activityParamsSchema } from "@/lib/validations/filter";


export interface ActivityBoardProps {
  userId: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

// --- HELPERS ---

const resolveEntity = (tableName: string, recordId: string) => {
  const resource = MOCK_RESOURCES[tableName]?.find(r => r.id === recordId);
  return {
    name: resource?.name || "Unknown Resource",
    href: `/${tableName}/${recordId}/${resource?.slug || ""}`
  };
};

// --- COMPONENT ---

export async function ActivityBoard({ userId, searchParams }: ActivityBoardProps) {
  const { page, action: actionFilter, entity: entityFilter, from: fromFilter, to: toFilter } = activityParamsSchema.parse(searchParams);
  const limit = 10;

  // Logic: Filtering
  const filteredLogs = INTERNAL_MOCK_LOGS.filter((log) => {
    const matchesUser = log.user_id === userId;
    const matchesAction = actionFilter === "ALL" || log.action === actionFilter;
    const matchesEntity = entityFilter === "ALL" || log.table_name === entityFilter;

    const logDate = new Date(log.created_at);
    let matchesDate = true;
    
    if (fromFilter) matchesDate = matchesDate && logDate >= new Date(fromFilter);
    if (toFilter) {
      const endDate = new Date(toFilter);
      endDate.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && logDate <= endDate;
    }

    return matchesUser && matchesAction && matchesEntity && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / limit);
  
  const displayItems = filteredLogs
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice((page - 1) * limit, page * limit);

  const createPageUrl = (p: number | string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", p.toString());
    return `?${params.toString()}`;
  };

  const paginationRange = getPaginationRange(page, totalPages);

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
          {displayItems.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-sm font-medium">
              No activity matching current filters.
            </div>
          ) : (
            displayItems.map((log) => {
              const entity = resolveEntity(log.table_name, log.record_id);
              return (
                <div key={log.id} className="group relative pl-9 pr-2 py-3 hover:bg-slate-50 rounded-xl transition-colors duration-150">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors">
                    {log.action === 'INSERT' && <Plus className="w-3 h-3 text-slate-600" />}
                    {log.action === 'UPDATE' && <Pencil className="w-3 h-3 text-slate-600" />}
                    {log.action === 'DELETE' && <Trash2 className="w-3 h-3 text-slate-400" />}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[13px] text-slate-500 whitespace-nowrap">
                        {log.action === 'INSERT' ? 'Created' : log.action === 'UPDATE' ? 'Modified' : 'Deleted'}
                      </span>
                      {log.action !== 'DELETE' ? (
                        <Link href={entity.href} className="text-[13px] font-bold text-slate-900 hover:text-primary transition-colors truncate">
                          {entity.name}
                        </Link>
                      ) : (
                        <span className="text-[13px] font-bold text-slate-900 truncate">{entity.name}</span>
                      )}
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-tight shrink-0">
                        {log.table_name.replace(/s$/, '')}
                      </span>
                    </div>
                    <div className="flex items-center text-[11px] text-slate-400 font-medium md:text-right shrink-0">
                      <time dateTime={log.created_at}>
                        {new Date(log.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-auto pt-6 border-t border-slate-100">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={page > 1 ? createPageUrl(page - 1) : "#"} 
                  className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  scroll={false} 
                />
              </PaginationItem>

              {paginationRange.map((p, idx) => (
                <PaginationItem key={idx}>
                  {p === "ELLIPSIS" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink 
                      href={createPageUrl(p)} 
                      isActive={page === p} 
                      scroll={false}
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  href={page < totalPages ? createPageUrl(page + 1) : "#"} 
                  className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  scroll={false} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
}