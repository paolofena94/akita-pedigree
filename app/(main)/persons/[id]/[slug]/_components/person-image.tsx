"use client";

import { EntityProfileImage } from "@/components/web/shared/entity-profile-image";
import { EntityMedia } from "@/types/media";

interface PersonImageProps {
    media: EntityMedia | null;
    firstName: string | null;
    lastName: string | null;
}

export function PersonImage({ media, firstName, lastName }: PersonImageProps) {
    const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    const fullName = `${firstName || ''} ${lastName || ''}`.trim();

    return (
        <EntityProfileImage
            src={media?.src}
            fallback={initials}
            alt={fullName}
            description={media?.description}
            copyright={media?.copyright}
            className="mb-6 -mt-12" 
            fallbackClassName="bg-blue-300 text-white" 
        />
    );
}