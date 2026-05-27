"use client";

export function CurrentYear() {
  // Manutenibilità e Affidabilità: suppressHydrationWarning previene 
  // warning di mismatch SSR/CSR nel raro caso in cui la build avvenga in un anno 
  // e l'utente navighi nel successivo, o per differenze di fuso orario.
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}