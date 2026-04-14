import { 
  Trophy, 
  Medal, 
  Award as AwardIconLucide, 
  Star, 
  Crown, 
  LucideIcon 
} from "lucide-react";
import { AwardColor, AwardIcon } from "@/app/types/akita";

/**
 * Mappa delle icone Lucide per la sezione Awards.
 * Associa la stringa salvata nel database al componente React corrispondente.
 */
export const AWARD_ICON_MAP: Record<AwardIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  award: AwardIconLucide,
  star: Star,
  crown: Crown,
};

/**
 * Mappa dei colori per gli Awards.
 * A differenza della salute, qui usiamo solo classi di testo (senza background)
 * per mantenere un design più leggero e prestigioso.
 */
export const AWARD_COLOR_MAP: Record<AwardColor, string> = {
  gold: "text-amber-500",    // Effetto Oro per campionati
  silver: "text-slate-400",  // Effetto Argento
  bronze: "text-orange-700", // Effetto Bronzo
  blue: "text-blue-600",     // Primo posto / Best of Breed
  red: "text-red-600",       // Specialty / Risultati di rilievo
};