'use client'

import {ArrowRight, Venus, Mars} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts"

const breedingChartConfig = {
  count: { label: "Breedings", color: "hsl(var(--primary))" },
}

const colorChartConfig = {
  red: { label: "Red", color: "hsl(var(--primary))" },
  brindle: { label: "Brindle", color: "hsl(215 25% 27%)" },
  white: { label: "White", color: "hsl(0 0% 90%)" },
  sesame: { label: "Sesame", color: "hsl(35 60% 50%)" },
} satisfies ChartConfig

const genderChartConfig = {
  male: { label: "Males", color: "hsl(217 91% 60%)" },
  female: { label: "Females", color: "hsl(330 81% 60%)" },
} satisfies ChartConfig

export function QuickStatsSection({ breedingTrendData, lastLitterColors, genderDistro }: { breedingTrendData: any[], lastLitterColors: any[], genderDistro: any[] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4" aria-label="Quick Statistics">
      {/* Stat 1: Total Breedings */}
      <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
        <CardHeader className="p-5 pb-0 space-y-0">
          <div className="flex items-center justify-between">
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">
              Total Breedings
            </CardDescription>
            <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              from 1997
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">{230}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-6">
          <ChartContainer config={breedingChartConfig} className="h-35 w-full mt-2 px-4 flex-1">
            <BarChart data={breedingTrendData} margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                content={<ChartTooltipContent indicator="line" className="rounded-xl border-2 shadow-lg" labelFormatter={(value) => `Year ${value}`} />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} activeBar={{ fillOpacity: 1, stroke: "var(--color-count)", strokeWidth: 2, filter: "brightness(1.1)" }} />
            </BarChart>
          </ChartContainer>
          <Button variant="ghost" size="sm" className="w-full mt-auto text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-tighter" asChild>
            <Link href="#">View all breedings <ArrowRight className="w-3 h-3 ml-1" /></Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stat 2: Last Litter Colors */}
      <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
        <CardHeader className="p-5 pb-0 space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight">
            Last Litter: <span className="text-primary">12/03/2026</span>
          </CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase tracking-widest">
            Puppies Color Distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-6">
          <div className="flex flex-row items-center justify-between flex-1 mt-2">
            <ChartContainer config={colorChartConfig} className="h-32 w-32">
              <PieChart>
                <Pie data={lastLitterColors} dataKey="value" nameKey="color" innerRadius={30} outerRadius={48} strokeWidth={3} stroke="white" />
                <ChartTooltip offset={20} content={<ChartTooltipContent hideLabel className="rounded-xl border-2 shadow-lg" />} />
              </PieChart>
            </ChartContainer>
            <div className="text-right flex flex-col justify-center">
              <p className="text-4xl font-bold text-foreground">8</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                Total Puppies
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-auto text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-tighter" asChild>
            <Link href="#">View Litter Details <ArrowRight className="w-3 h-3 ml-1" /></Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stat 3: Owned Dogs Gender */}
      <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
        <CardHeader className="p-5 pb-0 space-y-0">
          <div className="flex items-center justify-between">
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">
              Total Owned
            </CardDescription>
            <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Currently
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">{27}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-6">
          <div className="flex flex-row items-center justify-between flex-1 mt-2">
            <ChartContainer config={genderChartConfig} className="h-32 w-32">
              <PieChart>
                <Pie data={genderDistro} dataKey="value" nameKey="gender" innerRadius={30} outerRadius={48} strokeWidth={3} stroke="white" />
                <ChartTooltip offset={20} content={<ChartTooltipContent hideLabel className="rounded-xl border-2 shadow-lg" />} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="bg-pink-100 p-1.5 rounded-full">
                  <Venus className="w-3 h-3 text-pink-600" />
                </div>
                15 Females
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <Mars className="w-3 h-3 text-blue-600" />
                </div>
                12 Males
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-auto text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-tighter" asChild>
            <Link href="#">View all owned dogs <ArrowRight className="w-3 h-3 ml-1" /></Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}