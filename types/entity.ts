export const ENTITY_TYPES = {
    PERSONS: 'persons',
    AKITAS: 'akitas',
    KENNELS: 'kennels',
    USERS: 'users'
} as const;

export type EntityType = typeof ENTITY_TYPES[keyof typeof ENTITY_TYPES];