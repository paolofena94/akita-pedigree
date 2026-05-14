import { notFound } from "next/navigation";
import { UserProfileCard } from "./_components/user-profile-card";
import { LinkedPersonCard } from "./_components/linked-person-card";
import { ActivityBoard } from "./_components/activity-board";
import { getUserProfilePageData } from "@/lib/db/user";

interface UserPageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UserProfilePage({ params, searchParams }: UserPageProps) {
  const [{ username }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const decodedUsername = decodeURIComponent(username);
  const user = await getUserProfilePageData(decodedUsername);

  if (!user) {
    notFound();
  }

  // Affidabilità: Gestione sicura dell'array e sanitizzazione del DTO per la UI.
  // Mappa il nullable 'first_name' verso una stringa vuota per soddisfare l'interfaccia.
  const rawPerson = user.persons && user.persons.length > 0 ? user.persons[0] : null;
  const linkedPerson = rawPerson 
    ? {
        ...rawPerson,
        first_name: rawPerson.first_name ?? "", // Fallback a stringa
      }
    : null;

  // Affidabilità: Fallback sicuro in caso di record sprovvisto di timestamp
  const joinedDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-1 space-y-6">
          <UserProfileCard
            username={user.username}
            avatarUrl={user.avatar_url}
            joinedDate={joinedDate}
            bio={user.bio}
          />

          <LinkedPersonCard person={linkedPerson} />
        </div>

        <div className="lg:col-span-2">
          <ActivityBoard
            userId={user.user_id}
            searchParams={resolvedSearchParams}
          />
        </div>
      </div>
    </div>
  );
}