import { UserLinkedCard } from "./user-linked-card";
import { EntryMetadataCard } from "./entry-metadata-card";
import { PersonData } from "@/types/person";
import { PersonInfoCard } from "./person-info-card";
import { getCurrentUserSnippet } from "@/lib/db/user";

export async function PersonSidebar({ person }: { person: PersonData }) {
    
const { user, hasClaimedProfile } = await getCurrentUserSnippet();

    return (
        <aside className="space-y-6">
            <PersonInfoCard person={person} currentUserId={user?.id} />

            <UserLinkedCard
                personId={person.id}
                personPublicId={person.public_id}
                personSlug={person.slug}
                username={person.claimed_by?.username}
                currentUserId={user?.id}
                currentUserHasPersonLinked={hasClaimedProfile}
            />

            <EntryMetadataCard
                metadata={person.metadata}
                latestNote={person.notes}
                recordId={person.id}
                entityName={`${person.first_name || ''} ${person.last_name || ''}`.trim()}
                tableName="persons"
            />
        </aside>
    );
}