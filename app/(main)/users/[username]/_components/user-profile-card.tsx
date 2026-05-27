import Image from "next/image";
import { CalendarDays, UserIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EntityMedia } from "@/types/media";
import { ReportEntityDialog } from "@/components/web/shared/report-entity-dialog";

interface UserProfileCardProps {
  username: string;
  userId: string; // L'ID dell'utente visualizzato
  currentUserId?: string | null; // ID dell'utente loggato (optional)
  avatarUrl?: string | null;
  joinedDate: string;
  bio?: string | null;
  entityMedia?: EntityMedia[]; // Opzionale
}

/**
 * Componente presentazionale per il profilo utente.
 * Architettura: Stateless component per favorire il rendering lato server (RSC).
 * La formattazione della data deve avvenire a monte per mantenere il componente puro.
 */
export function UserProfileCard({
  username,
  userId,
  currentUserId,
  avatarUrl,
  joinedDate,
  bio
}: UserProfileCardProps) {

  const isLoggedIn = !!currentUserId;
  const isOwner = currentUserId === userId; // Stiamo guardando il nostro profilo?
  const showReportButton = isLoggedIn && !isOwner;
  const mediaForReport: EntityMedia[] = avatarUrl
    ? [{ src: avatarUrl }]
    : [];

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden bg-white">
      {/* Decorative Header: Background statico per ridurre il peso del CSS runtime */}
      <div className="h-16 bg-linear-to-r from-slate-400/20 to-slate-400/5 w-full relative flex justify-end items-start p-3">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/60 px-2 py-1 rounded-md backdrop-blur-sm">
          User Profile
        </span>
      </div>

      <div className="px-8 flex flex-col h-full">
        {/* Avatar Section */}
        <Avatar className="w-24 h-24 border-4 border-white shadow-sm -mt-12 mb-4 shrink-0">
          <AvatarImage src={avatarUrl || undefined} alt={`@${username}`} className="object-cover" />
          <AvatarFallback className="bg-slate-100 text-slate-400">
            <UserIcon className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>

        {/* Info Section - Questa parte occupa lo spazio superiore */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
            @{username}
          </h1>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
            <CalendarDays className="w-4 h-4 shrink-0" />
            <span>Joined {joinedDate}</span>
          </div>
        </div>

        {/* Bio Section - Se c'è, cresce qui */}
        {bio && (
          <div className="mt-6 pt-6 pb-6 border-t border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              About
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {bio}
            </p>
          </div>
        )}

        {/* 🌟 LA MAGIA: mt-auto spinge questo div verso il basso */}
        {showReportButton && (
          <div className="mt-auto pt-6 flex justify-end">
            <ReportEntityDialog
              entity={{ type: 'users' }}
              recordId={userId}
              entityMedia={mediaForReport}
            />
          </div>
        )}
      </div>
    </Card>
  );
}