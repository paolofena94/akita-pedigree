"use client";

import { useEffect, useState, useRef } from "react";
import { Dog, Users, History } from "lucide-react";

function AnimatedNumber({ endValue, suffix = "", duration = 2000 }: { endValue: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  // NUOVO STATO: traccia se l'animazione è finita
  const [isFinished, setIsFinished] = useState(false); 
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const frameDuration = 1000 / 60; 
          const totalFrames = Math.round(duration / frameDuration);
          const increment = endValue / totalFrames;

          const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              setCount(endValue);
              setIsFinished(true); // L'animazione è finita!
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, frameDuration);

          observer.disconnect();
        }
      },
      { threshold: 0.5 } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue, duration]);

  return (
    <span ref={ref} className="inline-flex justify-center items-start">
      <span>{count.toLocaleString()}</span>
      
      {/* Il suffisso con Fade-In morbido */}
      {suffix && (
        <span 
          className={`text-4xl font-extrabold ml-1 transition-opacity duration-500 ease-out ${
            isFinished ? "opacity-100" : "opacity-0"
          }`}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    {
      id: 1,
      name: "Akita Registered",
      value: 43500,
      suffix: "+",
      icon: Dog,
      desc: "Worldwide pedigrees",
    },
    {
      id: 2,
      name: "Community Members",
      value: 7200,
      suffix: "+",
      icon: Users,
      desc: "Breeders and owners",
    },
    {
      id: 3,
      name: "Years of Lineage",
      value: 100,
      suffix: "+",
      icon: History,
      desc: "Historical data traced",
    },
  ];

  return (
    <section id="database-stats" aria-labelledby="stats-heading" className="w-full bg-background my-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
      <h2 id="stats-heading" className="sr-only">
      Statistiche globali del database Akita
      </h2>

        {/* Griglia responsive: 1 colonna su mobile, 3 colonne su desktop */}
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 text-center md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-3">
                <div className="flex justify-center">
                  <div className="p-1 drop-shadow-primary rounded-full">
                    <Icon className="h-14 w-14 text-primary" />
                  </div>
                </div>
                
                <dd className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  <AnimatedNumber endValue={stat.value} suffix={stat.suffix} />
                </dd>
                
                <dt className="text-lg font-semibold leading-7 text-muted-foreground">
                  {stat.name}
                </dt>
              </div>
            );
          })}
        </dl>

      </div>
    </section>
  );
}