export type HealthIcon = "heart" | "eye" | "activity" | "shield" | "dna" | "bone" | "file-text";

export type HealthColor = "blue" | "emerald" | "sky" | "amber" | "purple" | "rose" | "slate";

export type HealthClearance = {
  id: string;
  icon: HealthIcon;
  title: string;
  value: string;
  color: HealthColor;
};

export type AwardIcon = "trophy" | "medal" | "award" | "star" | "crown";

export type AwardColor = "gold" | "silver" | "bronze" | "blue" | "red";

export type Award = {
  id: string;
  title: string;
  subtitle: string;
  icon: AwardIcon;
  color: AwardColor;
};

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

export type Gender = "Male" | "Female";

export type AkitaColor = "Red" | "White" | "Brindle" | "Sesame";

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

  // --- CAMPI OPZIONALI (Persone e Luoghi) ---
  breeder?: string;
  kennel?: string;
  owner?: string;
  landOfBirth?: string;    // Paese di nascita (es: "Japan")
  landOfStanding?: string; // Paese in cui si trova (es: "Italy")

  // --- CAMPI OPZIONALI (Misure) ---
  weight?: number;
  height?: number;

  // --- MEDIA ---
  // photoUrl è opzionale: se manca useremo un placeholder
  photoUrl?: string; 
  thumbnails: string[]; // Un array può essere semplicemente vuoto []

  // --- DATI STRUTTURATI ---
  // Inizializzati come array vuoti se l'utente non inserisce nulla
  health: HealthClearance[];
  awards: Award[];
  family: FamilyData;
}