"use client";

import { useState, useEffect } from "react";
import { ReportEntityDialog } from "@/components/web/shared/report-entity-dialog";
import { PersonData } from "@/types/person";
import { EditEntitySheet } from "@/components/web/shared/edit-entity-sheet";
import { PersonFormData } from "@/types/edit";

interface PersonActionsProps {
    person: PersonData;
    currentUserId: string | null;
}

export function PersonActions({ person, currentUserId }: PersonActionsProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    // 🌟 1. LOGICA DI AUTORIZZAZIONE SPECIFICA PER PERSON
    const isLoggedIn = !!currentUserId;
    const isClaimed = !!person.claimed_by;
    const claimedByUserId = person.claimed_by?.user_id || null;
    const canEdit = !isClaimed || currentUserId === claimedByUserId;

    if (!isMounted) return <div className="absolute bottom-4 left-4 right-4 h-8 z-10" />;

    // 🌟 2. PREPARAZIONE DATI
    const initialFormData: PersonFormData = {
        first_name: person.first_name || "",
        last_name: person.last_name || "",
        country: person.country || "",
        state: person.state || "",
        city: person.city || "",
        address_street: person.address_street || "",
        postal_code: person.postal_code || "",
        bio: person.bio || "",
        email: person.email || "",
        phone: person.phone || "",
        website_url: person.website_url || "",
        media: person.media,
    };


    // 🌟 3. RENDERING DEI COMPONENTI UI GENERICI
    return (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
            {isLoggedIn ? (
                <ReportEntityDialog
                    entity={{ type: 'persons', isClaimed }}
                    recordId={person.id}
                    entityMedia={person.media}
                />
            ) : <div />}

            {canEdit && (
                <EditEntitySheet
                    context={{ type: 'persons', isClaimed: isClaimed }}
                    recordId={person.id}
                    initialData={initialFormData}
                />
            )}
        </div>
    );
}