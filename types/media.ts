export interface EntityMedia {
    src: string;
    description?: string;
    copyright?: string;
    file?: File; // Opzionale: lo useremo lato Client per i nuovi upload
}