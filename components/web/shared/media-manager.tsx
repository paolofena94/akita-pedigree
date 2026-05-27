"use client";

import { useRef, ChangeEvent, useState } from "react";
import Image from "next/image";
import { useFormContext, FieldErrors, FieldError } from "react-hook-form";
import { Trash2, UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner"; // 🌟 Import Toast for error handling
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EntityMedia } from "@/types/media";
import { optimizeImageToWebP } from "@/lib/image-optimizer";

interface MediaManagerProps {
    value: EntityMedia[];
    onChange: (items: EntityMedia[]) => void;
    limit?: number;
    disabled?: boolean;
}

export function MediaManager({ value = [], onChange, limit = 5, disabled = false }: MediaManagerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const { formState: { errors } } = useFormContext<{ media: EntityMedia[] }>();

    // --- ACTIONS ---
    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const availableSlots = limit - value.length;
        const filesToProcess = files.slice(0, availableSlots);

        setIsCompressing(true); 

        try {
            // 🌟 Delegate optimization to our utility and catch individual failures
            const compressedFiles = await Promise.all(
                filesToProcess.map(async (file) => {
                    try {
                        return await optimizeImageToWebP(file);
                    } catch (error) {
                        // Return null if optimization fails, preventing the whole batch from crashing
                        return null; 
                    }
                })
            );

            // Filter out the failed (null) files
            const successfulFiles = compressedFiles.filter((file): file is File => file !== null);
            const failedCount = filesToProcess.length - successfulFiles.length;

            // 🌟 Trigger a toast if any files failed the optimization process
            if (failedCount > 0) {
                toast.error(`${failedCount} image(s) could not be optimized and were skipped.`);
            }

            // Create state items ONLY for successfully processed files
            const newItems: EntityMedia[] = successfulFiles.map((file) => ({
                src: URL.createObjectURL(file), 
                file: file, 
                copyright: "",
                description: "",
            }));

            onChange([...value, ...newItems]);
            
        } catch (error) {
            console.error("General error during media processing:", error);
            toast.error("An unexpected error occurred while processing media.");
        } finally {
            setIsCompressing(false); 
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemove = (indexToRemove: number) => {
        const filtered = value.filter((_, idx) => idx !== indexToRemove);
        onChange(filtered);
    };

    const handleFieldChange = (indexToUpdate: number, field: "copyright" | "description", newValue: string) => {
        const updated = [...value];
        updated[indexToUpdate] = { ...updated[indexToUpdate], [field]: newValue };
        onChange(updated);
    };

    const isAtLimit = value.length >= limit;
    const isInteractive = !disabled && !isCompressing;

    return (
        <div className="space-y-4">
            {/* 1. EXISTING MEDIA LIST / PREVIEWS */}
            {value.length > 0 && (
                <div className="space-y-4">
                    {value.map((item, index) => {
                        const mediaErrorsArray = errors.media as FieldErrors<EntityMedia>[] | undefined;
                        const itemErrors = mediaErrorsArray?.[index];
                        const copyrightError = itemErrors?.copyright as FieldError | undefined;
                        const descriptionError = itemErrors?.description as FieldError | undefined;

                        return (
                            <div
                                key={`${item.src}-${index}`}
                                className="relative flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 rounded-xl bg-white shadow-xs animate-in fade-in"
                            >
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                                    onClick={() => handleRemove(index)}
                                    disabled={disabled}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>

                                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center relative">
                                    {item.src ? (
                                        <Image
                                            src={item.src}
                                            alt={item.description || "Media preview"}
                                            fill
                                            className="object-cover"
                                            unoptimized={true} 
                                        />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>

                                <div className="grow space-y-3 pt-2 sm:pt-0 pr-8">
                                    <div className="space-y-1">
                                        <Label className="text-xs text-slate-500 uppercase tracking-wider">Copyright</Label>
                                        <Input
                                            placeholder="e.g. © 2026 John Doe"
                                            value={item.copyright || ""}
                                            onChange={(e) => handleFieldChange(index, "copyright", e.target.value)}
                                            disabled={disabled}
                                            maxLength={100} 
                                            className={`h-8 text-sm ${copyrightError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            aria-invalid={!!copyrightError}
                                        />
                                        {copyrightError && (
                                            <p className="text-[11px] font-medium text-red-500 mt-1">
                                                {copyrightError.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-xs text-slate-500 uppercase tracking-wider">Description</Label>
                                        <Textarea
                                            placeholder="A brief description of this media..."
                                            value={item.description || ""}
                                            onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                                            disabled={disabled}
                                            maxLength={500} 
                                            className={`resize-none h-16 text-sm ${descriptionError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            aria-invalid={!!descriptionError}
                                        />
                                        {descriptionError && (
                                            <p className="text-[11px] font-medium text-red-500 mt-1">
                                                {descriptionError.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* 2. UPLOAD AREA */}
            {!isAtLimit && (
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/jpeg, image/png, image/webp, image/heic"
                        multiple
                        className="hidden"
                        disabled={!isInteractive}
                    />
                    <div
                        onClick={() => isInteractive && fileInputRef.current?.click()}
                        className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200
                            ${!isInteractive
                                ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                                : 'bg-slate-50/50 border-slate-300 hover:bg-slate-50 hover:border-slate-400 cursor-pointer'
                            }`}
                    >
                        <div className="p-3 bg-white border border-slate-100 rounded-full shadow-sm mb-3">
                            {isCompressing ? (
                                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                            ) : (
                                <UploadCloud className="w-6 h-6 text-slate-600" />
                            )}
                        </div>
                        
                        <p className="text-sm font-medium text-slate-900">
                            {isCompressing ? "Optimizing media..." : "Click to upload media"}
                        </p>
                        
                        {!isCompressing && (
                            <p className="text-xs text-slate-500 mt-1">
                                SVG, PNG, JPG, HEIC or WEBP (will be optimized)
                            </p>
                        )}
                        
                        <p className="text-xs font-semibold text-indigo-600 mt-4">
                            {value.length} of {limit} slots used
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}