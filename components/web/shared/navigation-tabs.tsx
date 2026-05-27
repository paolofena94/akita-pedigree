"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabItem {
    title: string;
    href: string;
    count?: number | null;
}

interface NavigationTabsProps {
    tabs: TabItem[];
}

export function NavigationTabs({ tabs }: NavigationTabsProps) {
    const pathname = usePathname();
    const router = useRouter();

    const activeTab = [...tabs]
        .sort((a, b) => b.href.length - a.href.length)
        .find((tab) => pathname.startsWith(tab.href))?.href || tabs[0]?.href;

    return (
        <Tabs
            value={activeTab}
            onValueChange={(value) => router.push(value)}
            className="w-full"
        >
            <TabsList
                variant="line"
                className="w-full justify-start overflow-x-auto gap-8 border-b border-border bg-transparent p-0 rounded-none h-auto"
            >
                {tabs.map((tab) => {
                    const isDisabled = tab.count === 0;
                    
                    const isOverLimit = tab.count !== null && tab.count !== undefined && tab.count > 9999;

                    return (
                        <TabsTrigger
                            key={tab.href}
                            value={tab.href}
                            disabled={isDisabled}
                            className="flex-none flex items-center gap-2 py-3 border-b-2 border-transparent text-sm text-muted-foreground rounded-none shadow-none data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none hover:text-blue-500! disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {tab.title}
                            {tab.count !== null && tab.count !== undefined && (
                                <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-xs flex items-center tabular-nums">
                                    {isOverLimit ? (
                                        <>
                                            9999
                                            <sup className="text-[8px] font-extrabold ml-0.5 -top-1">
                                                +
                                            </sup>
                                        </>
                                    ) : (
                                        tab.count
                                    )}
                                </span>
                            )}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    );
}