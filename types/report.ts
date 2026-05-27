import { EntityType } from "./entity";

export type ReportReasonConfig = {
    value: string;
    label: string;
    requiresUrl?: boolean;
    isUrlMandatory?: boolean;
    urlHint?: string;
    requiresFieldSelection?: boolean;
    requiresMediaSelection?: boolean;
    allowedEntities?: (EntityType)[];
};

export type ReportEntityContext = 
    | { type: Extract<EntityType, 'persons'>; isClaimed: boolean }
    | { type: Extract<EntityType, 'kennels'>; isClaimed: boolean }
    | { type: Extract<EntityType, 'akitas'> }
    | { type: Extract<EntityType, 'users'> };