import { EntityMedia } from "@/types/media";

export function parseEntityMedia(mediaJson: unknown): EntityMedia[] {
    if (!mediaJson) return [];

    // CASO 1: È già un array (Futuro)
    if (Array.isArray(mediaJson)) {
        return mediaJson.map(obj => ({
            // Supporta sia la vecchia chiave avatar_url che la nuova src
            src: obj.avatar_url || obj.src || "",
            description: obj.description || "",
            copyright: obj.copyright || "",
        })).filter(m => m.src !== ""); // Rimuove oggetti senza immagine
    }

    // CASO 2: È un oggetto singolo (Struttura DB attuale)
    if (typeof mediaJson === 'object') {
        const obj = mediaJson as Record<string, unknown>;
        const src = obj.avatar_url || obj.src;
        
        if (typeof src === 'string' && src !== "") {
            return [{
                src: src,
                description: typeof obj.description === 'string' ? obj.description : "",
                copyright: typeof obj.copyright === 'string' ? obj.copyright : "",
            }];
        }
    }

    return [];
}