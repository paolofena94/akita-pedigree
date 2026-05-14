// ============================================================================
// SHARED TYPES
// ============================================================================

export type BadgeColor = 
  | "blue" 
  | "emerald" 
  | "sky" 
  | "amber" 
  | "purple" 
  | "rose" 
  | "slate";

export type Gender = "Male" | "Female";

export type AkitaColor = 
  | "Red" 
  | "Red Fawn" 
  | "Brindle" 
  | "Blue Brindle" 
  | "Red Brindle" 
  | "White" 
  | "Sesame";


// ============================================================================
// HEALTH & GENETICS
// ============================================================================

export type HealthIcon = 
  | "heart" 
  | "eye" 
  | "activity" 
  | "shield" 
  | "dna" 
  | "bone" 
  | "file-text";

export type HealthClearance = {
  id: string;
  icon: HealthIcon;
  title: string;
  value: string;
  color: BadgeColor;
};

export type GeneticsIcon =
  | "dna"           // Ideale per test genetici generali (es. Profilo DNA depositato)
  | "microscope"    // Ottimo per screening di laboratorio (es. PRA-prcd)
  | "scissors"      // Simbolico per l'editing genetico (es. Locus FGF5 / Pelo Lungo)
  | "palette"       // Perfetto per i Loci del colore (es. Locus K, Locus E)
  | "fingerprint"   // Ottimo per l'identità genetica univoca (ISAG Profile)
  | "flask-conical" // Variabile da laboratorio per test generici
  | "file-text";    // Icona di fallback per certificati cartacei

export type GeneticsResult = {
  id: string;
  icon: GeneticsIcon;
  title: string;    // es. "Locus FGF5 (Coat Length)"
  value: string;    // es. "N/N (Short Hair)"
  color: BadgeColor;
};


// ============================================================================
// AWARDS
// ============================================================================

export type AwardIcon = "trophy" | "medal" | "award" | "star" | "crown";

export type AwardColor = "gold" | "silver" | "bronze" | "blue" | "red";

export type Award = {
  id: string;
  title: string;
  subtitle: string;
  icon: AwardIcon;
  color: AwardColor;
};


// ============================================================================
// FAMILY & LINEAGE
// ============================================================================

export type FamilyMember = {
  id: string;
  name: string;
  photoUrl?: string;
};

export type FamilyData = {
  lineage: {
    sire?: FamilyMember;
    dam?: FamilyMember;
  };
  network: {
    littermates: FamilyMember[];
    halfSiblings: FamilyMember[];
    offspring: FamilyMember[];
  };
};


// ============================================================================
// ENTITY: DOG
// ============================================================================

export interface Dog {
  // --- CAMPI OBBLIGATORI ---
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  birthDate: string;
  color: AkitaColor;

  // --- CAMPI OPZIONALI (Anagrafica) ---
  callName?: string;
  regNumber?: string;
  dateOfDeath?: string;
  notes?: string[];        // Array nativo di stringhe per note varie

  // --- CAMPI OPZIONALI (Persone e Luoghi) ---
  breeder?: string;
  kennel?: string;
  owner?: string;
  landOfBirth?: string;    // Codice ISO a 2 lettere (es: "JP")
  landOfStanding?: string; // Codice ISO a 2 lettere (es: "IT")

  // --- CAMPI OPZIONALI (Misure) ---
  weight?: number;
  height?: number;

  // --- MEDIA ---
  photoUrl?: string;       // Opzionale: se manca verrà usato un placeholder
  thumbnails: string[];    // Array di stringhe (inizializzato a [] se vuoto)

  // --- DATI STRUTTURATI (JSONB nel database) ---
  health: HealthClearance[];
  genetics: GeneticsResult[];
  awards: Award[];
  
  // --- RELAZIONI ---
  family: FamilyData;
}