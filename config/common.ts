import { Mars, Venus, LucideIcon } from "lucide-react";
import { Gender } from "@/app/types/akita";

/**
 * Associa il genere all'icona corrispondente e al colore di riferimento.
 */
export const GENDER_CONFIG: Record<Gender, { icon: LucideIcon; color: string }> = {
  Male: {
    icon: Mars,
    color: "text-blue-500",
  },
  Female: {
    icon: Venus,
    color: "text-pink-500",
  },
};