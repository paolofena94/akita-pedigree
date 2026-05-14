import { PersonProfile } from "@/types/person";

export const MOCK_PERSON: PersonProfile = {
    id: "1",
    slug: "annachiara-russo",
    first_name: "Annachiara",
    last_name: "Russo",
    country: "IT",
    state: "Parma",
    city: "San Secondo Parmense",
    address: "Strada per Albareto, 17",
    postal_code: "43017",
    email: "paolofena1994@gmail.com",
    phone: "3493516164",
    website_url: "https://www.akitapedigree.com",
    bio: "Passionate Akita Inu breeder with over 10 years of experience in preserving the Japanese lineage. Passionate Akita Inu breeder with over 10 years of experience in preserving the Japanese lineage. Passionate Akita Inu breeder with over 10 years of experience in preserving the Japanese lineage. Passionate Akita Inu breeder with over 10 years of experience in preserving the Japanese lineage. Passionate Akita Inu breeder with over 10 years of experience in preserving the Japanese lineage.",
    media: { avatar_url: "/images/person-placeholder.jpg", description: "Me and my first Akita!", copyright: "Annachiara Russo" },

    created_at: "2024-01-15T10:30:00Z",
    created_by_username: "AdminPaolo",
    updated_at: "2026-05-07T14:22:00Z",
    updated_by_username: "ModeratorAkita",
    claimed_by: "annak",

    roles: ["Breeder", "Owner", "Kennel Founder"],
    kennels: [
        { id: "1", name: "Yama No Kami", country:"IT", role: "Founder" },
        { id: "2", name: "Yama No Kinoshima", country:"JP", role: "Handler" },
        { id: "3", name: "Kashi No Miharashi", role: "Co-Owner" }
    ],
    // Aggiunto 'gender' per il grafico a torta della distribuzione sessi
    owned_dogs: [
        { id: "d1", name: "Hachiko", breed: "Akita Inu", gender: "male" },
        { id: "d2", name: "Yuki", breed: "Akita Inu", gender: "female" },
        { id: "d3", name: "Kashi", breed: "Akita Inu", gender: "female" },
        { id: "d4", name: "Miharashi", breed: "Akita Inu", gender: "male" },
        { id: "d5", name: "Kaminari", breed: "Akita Inu", gender: "female" }
    ],
    // Aggiunto 'trophies' per la logica Featured Dog e 'gender'
    bred_dogs: [
        { 
            id: "d6", 
            name: "Kenta No Yama No Kashi Miharashi of Wonderful Vall", 
            breed: "Akita Inu", 
            gender: "male", 
            trophies: 37, 
            image: "/images/kashi.jpg" 
        },
        { id: "d7", name: "Yuki", breed: "Akita Inu", gender: "female", trophies: 5 },
        { id: "d8", name: "Kashi", breed: "Akita Inu", gender: "female", trophies: 12 },
        { id: "d9", name: "Miharashi", breed: "Akita Inu", gender: "male", trophies: 0 },
        { id: "d10", name: "Kaminari", breed: "Akita Inu", gender: "female", trophies: 2 }
    ]
};

export const MOCK_PERSON_CLAIMABLE: PersonProfile = {
    id: "1",
    slug: "annachiara-russo",
    first_name: "Annachiara",
    last_name: "Russo",
    country: "IT",
    state: null,
    city: null,
    address: null,
    postal_code: null,
    email: null,
    phone: null,
    website_url: "https://www.akitapedigree.com",
    bio: "Passionate Akita Inu breeder with over 10 years of experience in preserving the Japanese lineage.",
    media: null,

    created_at: "2024-01-15T10:30:00Z",
    created_by_username: "AdminPaolo",
    updated_at: "2026-05-07T14:22:00Z",
    updated_by_username: "ModeratorAkita",
    claimed_by: null,

    roles: ["Breeder", "Owner", "Kennel Founder"],
    kennels: [
        { id: "1", name: "Yama No Kami", role: "Founder" },
        { id: "2", name: "Yama No Kinoshima", role: "Handler" },
        { id: "3", name: "Kashi No Miharashi", role: "Co-Owner" }
    ],
    owned_dogs: [
        { id: "d1", name: "Hachiko", breed: "Akita Inu", gender: "male" },
        { id: "d2", name: "Yuki", breed: "Akita Inu", gender: "female" },
        { id: "d3", name: "Kashi", breed: "Akita Inu", gender: "female" },
        { id: "d4", name: "Miharashi", breed: "Akita Inu", gender: "male" },
        { id: "d5", name: "Kaminari", breed: "Akita Inu", gender: "female" }
    ],
    bred_dogs: [
        { id: "d6", name: "Kenta", breed: "Akita Inu", gender: "male", trophies: 37 },
        { id: "d7", name: "Yuki", breed: "Akita Inu", gender: "female", trophies: 0 },
        { id: "d8", name: "Kashi", breed: "Akita Inu", gender: "female", trophies: 0 },
        { id: "d9", name: "Miharashi", breed: "Akita Inu", gender: "male", trophies: 0 },
        { id: "d10", name: "Kaminari", breed: "Akita Inu", gender: "female", trophies: 0 }
    ]
};