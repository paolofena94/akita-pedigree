"use client";

import { NavigationTabs, TabItem } from "@/components/web/shared/navigation-tabs";
import { useParams } from "next/navigation";

interface PersonProfileTabsProps {
  stats: {
    bredDogsCount: number;
    ownedDogsCount: number;
    kennelsCount: number;
  };
}

export function PersonProfileTabs({ stats }: PersonProfileTabsProps) {
    const params = useParams();
    const id = params.id as string;
    const slug = params.slug as string | undefined;

    const baseUrl = `/persons/${id}${slug ? `/${slug}` : ''}`;

    const profileTabs: TabItem[] = [
        { title: "Overview", href: baseUrl, count: null },
        { title: "Breedings", href: `${baseUrl}/breedings`, count: stats.bredDogsCount },
        { title: "Owned Akitas", href: `${baseUrl}/owned`, count: stats.ownedDogsCount },
        { title: "Kennels", href: `${baseUrl}/kennels`, count: stats.kennelsCount },
        { title: "Statistics", href: `${baseUrl}/stats`, count: null },
    ];

    return <NavigationTabs tabs={profileTabs} />;
}