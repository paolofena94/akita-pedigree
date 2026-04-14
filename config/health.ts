import { 
  Heart, 
  Eye, 
  Activity, 
  Shield, 
  Dna, 
  Bone, 
  FileText, 
  LucideIcon 
} from "lucide-react";
import { HealthColor, HealthIcon } from "@/app/types/akita";

/**
 * Mappa dei colori per le sezioni Health.
 * Associa ogni colore alle relative classi Tailwind per background, bordo e testo.
 */
export const HEALTH_COLOR_MAP: Record<HealthColor, string> = {
  blue: "bg-blue-50 border-blue-100 text-blue-600",
  emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
  sky: "bg-sky-50 border-sky-100 text-sky-600",
  amber: "bg-amber-50 border-amber-100 text-amber-600",
  purple: "bg-purple-50 border-purple-100 text-purple-600",
  rose: "bg-rose-50 border-rose-100 text-rose-600",
  slate: "bg-slate-50 border-slate-100 text-slate-600",
};

/**
 * Mappa delle icone Lucide per le sezioni Health.
 * Associa la stringa salvata nel database al componente React reale.
 */
export const HEALTH_ICON_MAP: Record<HealthIcon, LucideIcon> = {
  heart: Heart,
  eye: Eye,
  activity: Activity,
  shield: Shield,
  dna: Dna,
  bone: Bone,
  "file-text": FileText,
};