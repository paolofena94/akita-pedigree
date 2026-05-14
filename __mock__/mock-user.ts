// Interfaccia per garantire coerenza tra mock e futuri dati reali (Supabase)
export interface MockUser {
    username: string;
    bio: string | null;
    avatar_url: string | null;
    created_at: string;
    claimed_person?: {
        id: string;
        slug: string;
        first_name: string;
        last_name: string;
        roles: string[];
    } | null;
}

export const getMockUser = (username: string): MockUser | null => {
    if (username === "inesistente") return null;

    return {
        username: username,
        bio: "Appassionato allevatore di Akita Inu. Seleziono linee di sangue storiche giapponesi dal 2015.",
        avatar_url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
        created_at: "2024-01-15T10:30:00Z",
        claimed_person: {
            id: "123",
            slug: "mario-rossi",
            first_name: "Mario",
            last_name: "Rossi",
            roles: ["Breeder", "Owner"]
        }
    };
};