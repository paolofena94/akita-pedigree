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
 * Mappa dei colori strutturata.
 * Permette al componente di applicare classi diverse a elementi diversi 
 * (icona, bordo del cerchio, testo del valore) mantenendo la coerenza cromatica.
 */
export const HEALTH_COLOR_MAP: Record<HealthColor, { 
  bg: string; 
  border: string; 
  text: string; 
  label: string; 
  value: string; 
}> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-500",
    label: "text-blue-600/70",
    value: "text-blue-900",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-500",
    label: "text-emerald-600/70",
    value: "text-emerald-900",
  },
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-100",
    text: "text-sky-500",
    label: "text-sky-600/70",
    value: "text-sky-900",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-500",
    label: "text-amber-600/70",
    value: "text-amber-900",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-100",
    text: "text-purple-500",
    label: "text-purple-600/70",
    value: "text-purple-900",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-500",
    label: "text-rose-600/70",
    value: "text-rose-900",
  },
  slate: {
    bg: "bg-slate-50",
    border: "border-slate-100",
    text: "text-slate-500",
    label: "text-slate-600/70",
    value: "text-slate-900",
  },
};

/**
 * Mappa delle icone Lucide (rimane uguale, è già corretta).
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