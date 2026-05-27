import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { EntityMedia } from "@/types/media";

interface MediaSelectorProps {
    label: string;
    singleMediaMessage: string;
    media: EntityMedia[];
    value: string[];
    onChange: (newValues: string[]) => void;
    error?: string;
}

export function MediaSelector({ label, singleMediaMessage, media, value, onChange, error }: MediaSelectorProps) {
    if (media.length === 0) return null;

    const handleToggleMedia = (src: string) => {
        const newSelection = value.includes(src) ? value.filter(s => s !== src) : [...value, src];
        onChange(newSelection);
    };

    return (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 mb-2">
            <Label>{label} <span className="text-red-500">*</span></Label>

            {media.length === 1 ? (
                <p className="text-[11px] text-slate-500 italic p-2 bg-slate-50 rounded-md border border-slate-100">
                    {singleMediaMessage}
                </p>
            ) : (
                <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1">
                    {media.map((m, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleToggleMedia(m.src)}
                            className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all aspect-square ${
                                value.includes(m.src) ? 'border-red-500 ring-2 ring-red-500/20' : 'border-transparent hover:border-slate-300'
                            }`}
                        >
                            <img src={m.src} alt="thumbnail" className="w-full h-full object-cover" />
                            {value.includes(m.src) && (
                                <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm">
                                    <Check className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
    );
}