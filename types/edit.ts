import { EntityType } from "@/types/entity"; // Assumendo che esista
import { EntityMedia } from "./media";

export type EditFieldType = 'text' | 'textarea' | 'url' | 'date' | 'email' | 'media-array' | 'country';

export interface EditFieldConfig {
    id: string;
    label: string;
    type: EditFieldType;
    placeholder?: string;
    required?: boolean;
    fullWidth?: boolean; 
}

export interface EditSectionConfig {
    title: string;
    fields: EditFieldConfig[];
}

// IL NOSTRO CONTESTO FORTE
export type EditEntityContext = 
    | { type: 'persons'; isClaimed: boolean }
    | { type: 'kennels'; isClaimed: boolean }
    | { type: 'akitas' };

// Aggiungiamo qui anche le interfacce per i dati dei form (che avevamo discusso prima)
export interface PersonFormData {
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    city: string;
    address_street: string;
    postal_code: string;
    bio: string;
    email: string;
    phone: string;
    website_url: string;
    edit_notes?: string;
    media?: EntityMedia[];
}

export interface AkitaFormData {
    registered_name: string;
    call_name: string;
    edit_notes?: string;
}

export interface KennelFormData {
    // ... campi per kennel
    edit_notes?: string;
}