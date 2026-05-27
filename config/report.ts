import { ReportReasonConfig } from "@/types/report";
import { ReportEntityContext } from "@/types/report";

export const REPORTABLE_FIELDS_MAP: Record<string, { id: string; label: string }[]> = {
    persons: [
        { id: 'first_name', label: 'First Name' },
        { id: 'last_name', label: 'Last Name' },
        { id: 'bio', label: 'Biography' },
        { id: 'country', label: 'Country' },
        { id: 'state', label: 'State / Province' },
        { id: 'city', label: 'City' },
        { id: 'address_street', label: 'Address' },
        { id: 'postal_code', label: 'Postal Code' },
        { id: 'website_url', label: 'Website' },
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' }
    ],
    akitas: [
        { id: 'registered_name', label: 'Registered Name' },
        { id: 'call_name', label: 'Call Name' },
        { id: 'color', label: 'Color' },
        { id: 'pedigree', label: 'Pedigree / Parents' },
        { id: 'date_of_birth', label: 'Date of Birth' }
    ],
    kennels: [
        { id: 'kennel_name', label: 'Kennel Name' },
        { id: 'description', label: 'Description' },
        { id: 'location', label: 'Location' }
    ]
};

export const REASONS_DICTIONARY: Record<string, ReportReasonConfig> = {
    INACCURATE_INFORMATION: { 
        value: 'INACCURATE_INFORMATION', 
        label: 'Inaccurate Information', 
        requiresFieldSelection: true 
    },
    DUPLICATE_ENTRY: { 
        value: 'DUPLICATE_ENTRY', 
        label: 'Duplicate Entry', 
        requiresUrl: true, 
        isUrlMandatory: true, 
        urlHint: "Please provide the exact URL of the duplicate entry." 
    },
    COPYRIGHT_VIOLATION: { 
        value: 'COPYRIGHT_VIOLATION', 
        label: 'Copyright Violation', 
        requiresMediaSelection: true 
    },
    INAPPROPRIATE_CONTENT: { value: 'INAPPROPRIATE_CONTENT', label: 'Inappropriate Content' },
    HARASSMENT: { value: 'HARASSMENT', label: 'Harassment' },
    SPAM: { value: 'SPAM', label: 'Spam' },
    IMPERSONATION: { value: 'IMPERSONATION', label: 'Impersonation' },
    OWNERSHIP_DISPUTE: { value: 'OWNERSHIP_DISPUTE', label: 'Ownership Dispute' },
    OTHER: { value: 'OTHER', label: 'Other' },
};

export const REPORT_REASONS = Object.values(REASONS_DICTIONARY);

export function getAvailableReasons(entity: ReportEntityContext, hasMedia: boolean): ReportReasonConfig[] {
    let availableReasons: ReportReasonConfig[] = [];

    const R = REASONS_DICTIONARY;

    // --- LOGICA DEGLI SCENARI ---
    
    // SCENARIO 1 & 2: Persone e Allevamenti
    if (entity.type === 'persons' || entity.type === 'kennels') {
        if (entity.isClaimed) {
            // Claimate: Sono private. Tutto è permesso.
            availableReasons = [
                R.INACCURATE_INFORMATION, R.DUPLICATE_ENTRY, R.COPYRIGHT_VIOLATION,
                R.INAPPROPRIATE_CONTENT, R.HARASSMENT, R.SPAM, R.OTHER
            ];
            
            // Logica specifica per la rivendicazione
            if (entity.type === 'persons') {
                availableReasons.push(R.IMPERSONATION);
            } else if (entity.type === 'kennels') {
                availableReasons.push(R.OWNERSHIP_DISPUTE);
            }

        } else {
            // NON Claimate: Stile Wikipedia (pubbliche). 
            availableReasons = [
                R.DUPLICATE_ENTRY, R.INAPPROPRIATE_CONTENT, R.HARASSMENT, R.SPAM, R.OTHER
            ];
        }
    } 
    // SCENARIO 3: Cani (Akitas)
    else if (entity.type === 'akitas') {
        availableReasons = [
            R.INACCURATE_INFORMATION, R.DUPLICATE_ENTRY, R.COPYRIGHT_VIOLATION,
            R.INAPPROPRIATE_CONTENT, R.HARASSMENT, R.SPAM, R.OTHER
        ];
    } 
    // SCENARIO 4: Utenti (Account dell'App)
    else if (entity.type === 'users') {
        availableReasons = [
            R.COPYRIGHT_VIOLATION, R.INAPPROPRIATE_CONTENT, R.HARASSMENT, R.SPAM, R.OTHER
        ];
    }

    // --- FILTRO GLOBALE ---
    if (!hasMedia) {
        availableReasons = availableReasons.filter(r => r.value !== 'COPYRIGHT_VIOLATION');
    }

    // --- ORDINAMENTO (Opzionale ma raccomandato) ---
    // Ordina alfabeticamente, ma tiene "Other" sempre in fondo
    return availableReasons.sort((a, b) => {
        if (a.value === 'OTHER') return 1;
        if (b.value === 'OTHER') return -1;
        return a.label.localeCompare(b.label);
    });
}