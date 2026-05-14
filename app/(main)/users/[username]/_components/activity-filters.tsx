"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { format, parseISO, isValid } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function ActivityFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Architettura: React Compiler gestisce automaticamente la memoizzazione di questa derivazione.
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  
  const dateRange: DateRange | undefined = {
    from: fromParam && isValid(parseISO(fromParam)) ? parseISO(fromParam) : undefined,
    to: toParam && isValid(parseISO(toParam)) ? parseISO(toParam) : undefined,
  };

  const hasFilters = searchParams.has("action") || searchParams.has("entity") || searchParams.has("from");

  // Architettura: Rimossa l'astrazione useCallback. Il React Compiler ottimizza le dipendenze in fase di build.
  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "ALL") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    // useTransition rimane obbligatorio: segnala a React che la navigazione è un aggiornamento di stato non bloccante.
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    updateFilters({
      from: range?.from ? format(range.from, "yyyy-MM-dd") : null,
      to: range?.to ? format(range.to, "yyyy-MM-dd") : null,
    });
  };

  return (
    <div className={cn(
      "flex flex-wrap items-end gap-4 pb-6 border-b border-slate-100 transition-opacity",
      isPending && "opacity-60"
    )}>
      {/* Action Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Event Action</label>
        <Select 
          value={searchParams.get("action") || "ALL"} 
          onValueChange={(val) => updateFilters({ action: val })}
          disabled={isPending}
        >
          <SelectTrigger className="h-8 w-32.5 text-[13px] font-medium bg-transparent border-slate-200 hover:border-slate-300 rounded-lg shadow-none focus:ring-0">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent className="p-2 bg-white">
            <SelectItem value="ALL" className="text-[13px]">All Actions</SelectItem>
            <SelectItem value="INSERT" className="text-[13px]">Created</SelectItem>
            <SelectItem value="UPDATE" className="text-[13px]">Modified</SelectItem>
            <SelectItem value="DELETE" className="text-[13px]">Deleted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Entity Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Resource Type</label>
        <Select 
          value={searchParams.get("entity") || "ALL"} 
          onValueChange={(val) => updateFilters({ entity: val })}
          disabled={isPending}
        >
          <SelectTrigger className="h-8 w-32.5 text-[13px] font-medium bg-transparent border-slate-200 hover:border-slate-300 rounded-lg shadow-none focus:ring-0">
            <SelectValue placeholder="All Entities" />
          </SelectTrigger>
          <SelectContent className="p-2 bg-white">
            <SelectItem value="ALL" className="text-[13px]">All Entities</SelectItem>
            <SelectItem value="akitas" className="text-[13px]">Akitas</SelectItem>
            <SelectItem value="kennels" className="text-[13px]">Kennels</SelectItem>
            <SelectItem value="persons" className="text-[13px]">Persons</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Time Range</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              className={cn(
                "h-8 w-60 justify-start text-left text-[13px] font-medium bg-transparent border-slate-200 hover:border-slate-300 rounded-lg shadow-none",
                !dateRange?.from && "text-slate-500"
              )}
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5 text-slate-400" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              className="p-4 rounded-lg border-slate-100"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Reset Controls */}
      {hasFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => updateFilters({ action: null, entity: null, from: null, to: null })}
          className="h-8 px-2 text-[11px] font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors gap-1.5 rounded-lg"
        >
          <X className="w-3.5 h-3.5" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}