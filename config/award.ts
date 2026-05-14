import { 
  Trophy, 
  Medal, 
  Award as AwardIconLucide, 
  Star, 
  Crown, 
  LucideIcon 
} from "lucide-react";
import { AwardColor, AwardIcon } from "@/types/akita";

/**
 * Mappa delle icone Lucide per la sezione Awards.
 */
export const AWARD_ICON_MAP: Record<AwardIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  award: AwardIconLucide,
  star: Star,
  crown: Crown,
};

/**
 * Mappa dei colori potenziata per gli Awards.
 * Ogni tonalità definisce lo stile per il contenitore, l'icona e il label.
 */
export const AWARD_COLOR_MAP: Record<AwardColor, { 
  bg: string; 
  border: string; 
  text: string; 
  label: string; 
}> = {
  gold: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-500",
    label: "text-amber-700/70",
  },
  silver: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    text: "text-slate-400",
    label: "text-slate-500/70",
  },
  bronze: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-600",
    label: "text-orange-700/70",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-500",
    label: "text-blue-700/70",
  },
  red: {
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-500",
    label: "text-rose-700/70",
  },
};