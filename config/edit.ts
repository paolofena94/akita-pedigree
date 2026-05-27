import { EditSectionConfig, EditEntityContext, EditFieldConfig } from "@/types/edit";

// ==========================================
// 1. DIZIONARI DI DOMINIO (Isolati e Sicuri)
// ==========================================

const SHARED_FIELDS = {
    mediaGallery: { id: 'media', label: 'Media Gallery', type: 'media-array', fullWidth: true } as EditFieldConfig,
    // Qui in futuro potresti aggiungere campi davvero universali, 
    // come 'status', 'visibility_toggle', ecc.
};

const PERSON_FIELDS = {
    firstName: { id: 'first_name', label: 'First Name', type: 'text' } as EditFieldConfig,
    lastName: { id: 'last_name', label: 'Last Name', type: 'text', required: true } as EditFieldConfig,
    bio: { id: 'bio', label: 'Biography', type: 'textarea', fullWidth: true } as EditFieldConfig,
    
    country: { id: 'country', label: 'Country', type: 'country', required: true } as EditFieldConfig,
    state: { id: 'state', label: 'State / Province', type: 'text' } as EditFieldConfig,
    city: { id: 'city', label: 'City', type: 'text' } as EditFieldConfig,
    postalCode: { id: 'postal_code', label: 'Postal Code', type: 'text' } as EditFieldConfig,
    address: { id: 'address_street', label: 'Address Street', type: 'text', fullWidth: true } as EditFieldConfig,
    
    email: { id: 'email', label: 'Email', type: 'email' } as EditFieldConfig,
    phone: { id: 'phone', label: 'Phone', type: 'text' } as EditFieldConfig,
    website: { id: 'website_url', label: 'Website', type: 'url', fullWidth: true } as EditFieldConfig,
};

const AKITA_FIELDS = {
    registeredName: { id: 'registered_name', label: 'Registered Name', type: 'text', required: true } as EditFieldConfig,
    callName: { id: 'call_name', label: 'Call Name', type: 'text' } as EditFieldConfig,
    // ... altri campi specifici del cane
};

const KENNEL_FIELDS = {
    kennelName: { id: 'name', label: 'Kennel Name', type: 'text', required: true } as EditFieldConfig,
    // Anche se simili a Person, qui sono isolati. Se un giorno il Kennel ha bisogno 
    // di 'foundation_year' o di un country configurato diversamente, modifichi solo qua!
    country: { id: 'country', label: 'Base Country', type: 'country', required: true } as EditFieldConfig,
    state: { id: 'state', label: 'State / Region', type: 'text' } as EditFieldConfig,
};


// ==========================================
// 2. FUNZIONI DI ASSEMBLAGGIO (La Logica)
// ==========================================

function getPersonFields(isClaimed: boolean): EditSectionConfig[] {
    const personalInfo: EditSectionConfig = {
        title: "Personal Information",
        fields: [PERSON_FIELDS.firstName, PERSON_FIELDS.lastName]
    };

    const location: EditSectionConfig = {
        title: "Location",
        fields: [PERSON_FIELDS.country, PERSON_FIELDS.state]
    };

    if (isClaimed) {
        personalInfo.fields.push(PERSON_FIELDS.bio);
        
        location.fields.push(
            PERSON_FIELDS.city,
            PERSON_FIELDS.postalCode,
            PERSON_FIELDS.address
        );

        return [
            personalInfo, 
            location, 
            {
                title: "Contact & Web",
                fields: [PERSON_FIELDS.email, PERSON_FIELDS.phone, PERSON_FIELDS.website]
            }, 
            {
                title: "Media Gallery",
                fields: [SHARED_FIELDS.mediaGallery] // Usiamo lo shared solo qui
            }
        ];
    }

    return [personalInfo, location];
}

function getAkitaFields(): EditSectionConfig[] {
    return [
        {
            title: "Dog Information",
            fields: [AKITA_FIELDS.registeredName, AKITA_FIELDS.callName]
        }
    ];
}

function getKennelFields(isClaimed: boolean): EditSectionConfig[] { 
    return [
        {
            title: "Kennel Profile",
            fields: [KENNEL_FIELDS.kennelName]
        },
        {
            title: "Operations Location",
            fields: [KENNEL_FIELDS.country, KENNEL_FIELDS.state]
        }
    ]; 
}


// ==========================================
// 3. LO SMISTATORE (Factory)
// ==========================================

export function getEditableFields(context: EditEntityContext): EditSectionConfig[] {
    switch (context.type) {
        case 'persons':
            return getPersonFields(context.isClaimed);
        
        case 'akitas':
            return getAkitaFields();
        
        case 'kennels':
            return getKennelFields(context.isClaimed);
            
        default:
            const _exhaustiveCheck: never = context;
            return [];
    }
}