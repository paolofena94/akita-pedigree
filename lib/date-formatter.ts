/**
 * Architettura: Utilizzo di Intl.DateTimeFormat per performance e zero dipendenze.
 * L'opzione hour12: false forza il formato 24h. Sostituiamo ':' con '.' tramite replace.
 */
export const formatAuditDate = (dateString: string | undefined | null, fallback: string) => {
  try {
    const date = new Date(dateString || fallback);
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });
    
    // Esempio output originale: "12 May 2026, 17:34" -> Sostituzione per "17.34"
    return formatter.format(date).replace(':', '.');
  } catch {
    return "Invalid Date";
  }
};