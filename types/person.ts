export interface PersonProfile {
    id: string;
    slug: string;
    first_name: string | null;
    last_name: string;
    country: string;
    state?: string | null;
    city?: string | null;
    address?: string | null;
    postal_code?: string | null;
    email?: string | null;
    phone?: string | null;
    website_url?: string | null;
    bio?: string | null;
    notes?: string | null;
    media?: { 
        avatar_url?: string; 
        description?: string; 
        copyright?: string; 
    } | null;

    // Campi tecnici di sistema (Metadata)
    created_at?: string;
    created_by_username?: string;
    updated_at?: string;
    updated_by_username?: string;
    claimed_by?: string | null;

    // Campi relazionali aggiornati
    roles: string[]; 
    kennels: { 
        id: string; 
        name: string; 
        country?: string;
        role: string; 
    }[];
    
    // Usiamo l'interfaccia DogRelation definita sotto
    owned_dogs: DogRelation[];
    bred_dogs: DogRelation[];
}

// Nuova interfaccia di supporto per le relazioni con i cani
export interface DogRelation {
    id: string;
    name: string;
    breed: string;
    // Aggiunti per i grafici e la logica Featured
    gender?: "male" | "female"; 
    trophies?: number;
    image?: string; // URL per la foto del campione nella card Bento
}