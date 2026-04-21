import { Dog } from "@/app/types/akita";

export const MOCK_DOG: Dog = {
  id: "akita-123",
  slug: "kashi-go",
  name: "Kashi Go",
  callName: "Kashi",
  gender: "Male",
  birthDate: "2020-05-15",
  dateOfDeath: "2029-07-21",
  color: "Red",
  regNumber: "ROI 20/123456",
  breeder: "Zuzanna Chade",
  kennel: "Fuen No Oka",
  owner: "Mario Margherito Rossi",
  landOfBirth: "PL", // Polonia
  landOfStanding: "IT", // Italia
  weight: 38,
  height: 67,
  photoUrl: "/images/kashi.jpg", // Assicurati che il percorso sia corretto
  thumbnails: [],
  
  // Dati Salute
  health: [
    {
      id: "h1",
      icon: "bone",
      title: "Hips & Elbows",
      value: "HD-A / ED-0",
      color: "emerald"
    },
    {
      id: "h2",
      icon: "eye",
      title: "Eyes (SOVITA)",
      value: "Clear / Normal",
      color: "blue"
    },
    {
      id: "h3",
      icon: "dna",
      title: "Amelogenesis Imperfecta",
      value: "Clear (N/N)",
      color: "purple"
    }
  ],

  // Titoli e Awards
  awards: [
    {
      id: "a1",
      title: "Italian Champion",
      subtitle: "Enci National Champion",
      icon: "trophy",
      color: "gold"
    },
    {
      id: "a2",
      title: "Best of Breed",
      subtitle: "Raduno Akita 2023",
      icon: "award",
      color: "blue"
    },
    {
      id: "a3",
      title: "Crufts Qualified",
      subtitle: "Birmingham 2024",
      icon: "star",
      color: "red"
    }
  ],

  // Famiglia
  family: {
    lineage: {
      sire: { id: "sire-1", name: "Taigen Go Fuen No Oka", photoUrl: "/images/akita-puppy.jpg" },
      dam: { id: "dam-1", name: "Yume No Kuni Hime", photoUrl: "/images/akita-hero-1.jpg" }
    },
    network: {
      littermates: [
        { id: "l1", name: "Kaminari Go" },
        { id: "l2", name: "Katsu Go" }
      ],
      halfSiblings: [
        { id: "h1", name: "Zenkoku Go" }
      ],
      offspring: [
        { id: "o1", name: "Little Hachi Go" }
      ]
    }
  }
};