import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
// Importa la funzione dal file che hai modificato nello Step 1. 
// Adegua il percorso in base a dove l'hai salvato!

export async function proxy(request: NextRequest) {
  // Richiama la funzione che aggiorna i cookie e controlla le rotte
  return await updateSession(request)
}

export const config = {
  // Il "matcher" dice a Next.js su quali URL eseguire questo file.
  // Qui stiamo dicendo: eseguilo su tutto, TRANNE che sui file statici (immagini, css, font, ecc.)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}