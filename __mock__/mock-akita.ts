import { Dog } from "@/types/akita";

export const MOCK_DOG: Dog = {
  id: "1",
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
  landOfBirth: "PL",
  landOfStanding: "IT",
  weight: 38,
  height: 67,
  photoUrl: "/images/kashi.jpg",
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

  genetics: [
    {
      "id": "g1",
      "icon": "dna",
      "title": "Amelogenesis Imperfecta (AI)",
      "value": "N/N (Clear)",
      "color": "emerald"
    },
    {
      "id": "g2",
      "icon": "scissors",
      "title": "Coat Length (FGF5)",
      "value": "N/N (Short Hair)",
      "color": "blue"
    },
    {
      "id": "g3",
      "icon": "palette",
      "title": "K-Locus (Brindle)",
      "value": "ky/ky (Non-brindle)",
      "color": "amber"
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
