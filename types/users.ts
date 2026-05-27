import { Tables } from "./database.types";
import { PersonSnippet } from "./person";

export interface UserData extends Pick<Tables<'users'>, 
    'user_id' | 
    'username' | 
    'avatar_url' | 
    'bio' | 
    'created_at'
> {
    linkedPerson: PersonSnippet | null;
}