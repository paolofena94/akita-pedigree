import Link from "next/link";
import { Trophy, Award, ArrowRight } from "lucide-react";

// Mappa dei codici ISO
const isoFlagMap: Record<string, string> = {
  "Japan": "jp",
  "Italy": "it",
  "USA": "us",
  "France": "fr",
  "Germany": "de",
  "Spain": "es",
  "UK": "gb",
};

export default function TopContributors() {
  const contributors = [
    { name: "Shirai Kensha", dogs: 142, country: "Japan", rank: 1, color: "text-yellow-500", bg: "bg-yellow-100/50" },
    { name: "Giovanni F.", dogs: 89, country: "Italy", rank: 2, color: "text-slate-400", bg: "bg-slate-100" },
    { name: "Tenshi Akitas", dogs: 64, country: "USA", rank: 3, color: "text-amber-700", bg: "bg-amber-100/50" },
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col h-full">

      {/* 1. Header flessibile per allineare testi e icona */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Top Contributors</h3>
          <p className="text-sm text-muted-foreground">Most active members this month</p>
        </div>
        {/* Icona della coccarda */}
        <div className="text-primary shrink-0">
          <Award className="w-8 h-8" />
        </div>
      </div>

      <div className="space-y-4 grow flex flex-col justify-center">
        {contributors.map((user) => (

          <Link
            key={user.name}
            href={`/profile/${user.name.toLowerCase().replace(/\s+/g, '-')}`} // Crea un URL tipo /profile/shirai-kensha
            className="group flex items-center justify-between p-2 rounded-xl"
          >

            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center shrink-0 w-12 h-12 rounded-full ${user.bg} ${user.color}`}>
                <Trophy className="w-6 h-6 stroke-[1.5px]" />
              </div>

              <div>
                <div className="flex flex-row items-center transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  <p className="font-bold text-slate-900 text-sm transition-colors duration-300 group-hover:text-primary">{user.name}</p>
                  <ArrowRight className="opacity-0 size-3 text-primary stroke-3 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-0.5">
                  <img
                    src={`https://flagcdn.com/${isoFlagMap[user.country]}.svg`}
                    alt={`${user.country} flag`}
                    className="w-4 h-3 object-cover rounded-[2px] shadow-md"
                    loading="lazy"
                  />
                  <span>• {user.dogs} akitas added</span>
                </div>
              </div>
            </div>

            <div className="text-lg font-bold text-muted-foreground">
              #{user.rank}
            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}