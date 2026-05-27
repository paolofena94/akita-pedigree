import { Tables } from "@/types/database.types";
import { EntityMedia } from "./media";

export type PersonRow = Tables<'persons'>;



export interface PersonData extends Omit<PersonRow, 'claimed_by_user_id' | 'media'> {
    claimed_by: { user_id: string; username: string } | null;
    media: EntityMedia[];
    metadata: {
        created: { created_at: string | null; username: string | null } | null;
        last_modified: { created_at: string | null; username: string | null } | null;
    };
    stats: {
        bredDogsCount: number;
        ownedDogsCount: number;
        kennelsCount: number;
    };
}

export interface PersonSnippet {
    id: string;
    public_id: number;
    first_name: string; 
    last_name: string | null;
    slug: string | null;
}