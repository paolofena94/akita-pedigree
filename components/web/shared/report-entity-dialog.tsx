"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EntityMedia } from "@/types/media";
import { ReportEntityContext } from "@/types/report";
import { getAvailableReasons, REPORTABLE_FIELDS_MAP } from "@/config/report";
import { reportSchema, type ReportFormValues } from "@/lib/validations/report";
import { FieldSelector } from "./field-selector";
import { MediaSelector } from "./media-selector";


export interface ReportEntityDialogProps {
    entity: ReportEntityContext;
    recordId: string;
    entityMedia: EntityMedia[];
}

export function ReportEntityDialog({ entity, recordId, entityMedia = [] }: ReportEntityDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    // 🌟 1. SETUP REACT HOOK FORM CON ZOD
    const { 
        control, 
        handleSubmit, 
        watch, 
        setValue, 
        reset, 
        formState: { errors, isSubmitting } 
    } = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            reason: "",
            description: "",
            referenceUrl: "",
            selectedFields: [],
            selectedMedia: [],
        },
        mode: "onSubmit", // Valida quando l'utente clicca Submit
    });

    // Osserviamo i campi che dettano logica condizionale o rendering
    const currentReason = watch("reason");
    const selectedFields = watch("selectedFields") || [];
    const selectedMedia = watch("selectedMedia") || [];

    const availableReasons = getAvailableReasons(entity, entityMedia.length > 0);

    const selectedReasonConfig = availableReasons.find(r => r.value === currentReason);
    const entityFields = REPORTABLE_FIELDS_MAP[entity.type] || [];

    // 🌟 3. HANDLERS
    const handleReasonChange = (newReason: string) => {
        setValue("reason", newReason, { shouldValidate: true });
        
        // Quando la ragione cambia, resettiamo i campi condizionali
        setValue("referenceUrl", "");
        setValue("selectedFields", []);
        
        const newConfig = availableReasons.find(r => r.value === newReason);
        if (newConfig?.requiresMediaSelection && entityMedia.length === 1) {
            setValue("selectedMedia", [entityMedia[0].src]);
        } else {
            setValue("selectedMedia", []);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        // Resetta il form un attimo dopo la chiusura per non vedere i dati sparire mentre l'animazione è in corso
        if (!open) {
            setTimeout(() => reset(), 200);
        }
    };

    const onSubmit = async (data: ReportFormValues) => {
        try {
            const payload = {
                entityType: entity.type,
                recordId,
                reason: data.reason,
                description: data.description,
                metadata: {
                    ...(data.referenceUrl && { reference_url: data.referenceUrl }),
                    ...(data.selectedFields && data.selectedFields.length > 0 && { reported_fields: data.selectedFields }),
                    ...(data.selectedMedia && data.selectedMedia.length > 0 && { reported_media: data.selectedMedia }),
                }
            };

            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            console.log("✅ Report successfully generated:", payload);
            handleOpenChange(false);
            
        } catch (error) {
            console.error("❌ Failed to submit report", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-transparent! hover:text-red-600 rounded-full transition-all duration-200 cursor-pointer"
                >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-card sm:max-w-106.25">
                {/* 🌟 FORM DI REACT HOOK FORM */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle className="text-red-600 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Report Issue
                        </DialogTitle>
                        <DialogDescription>
                            Help us keep the database accurate and safe. Please provide details about the issue with this {entity.type.replace(/s$/, '')}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-6">

                        {/* SELECT REASON */}
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason <span className="text-red-500">*</span></Label>
                            <Select value={currentReason} onValueChange={handleReasonChange}>
                                <SelectTrigger id="reason" className={errors.reason ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select a reason..." />
                                </SelectTrigger>
                                <SelectContent className="bg-card p-2">
                                    {availableReasons.map((r) => (
                                        <SelectItem key={r.value} value={r.value}>
                                            {r.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.reason && <p className="text-[11px] text-red-500 mt-1">{errors.reason.message}</p>}
                        </div>

                        {/* 1. URL RICHIESTO */}
                        {selectedReasonConfig?.requiresUrl && (
                            <Controller
                                name="referenceUrl"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <Label htmlFor="referenceUrl">
                                            Reference URL {selectedReasonConfig.isUrlMandatory && <span className="text-red-500">*</span>}
                                        </Label>
                                        <Input
                                            {...field}
                                            id="referenceUrl"
                                            type="url"
                                            placeholder="https://..."
                                            className={errors.referenceUrl ? "border-red-500" : ""}
                                        />
                                        {errors.referenceUrl ? (
                                            <p className="text-[11px] text-red-500 mt-1">{errors.referenceUrl.message}</p>
                                        ) : (
                                            <p className="text-[11px] text-slate-500">{selectedReasonConfig.urlHint}</p>
                                        )}
                                    </div>
                                )}
                            />
                        )}

                        {/* 2. MULTI-SELECT CAMPI INACCURATI */}
                        {selectedReasonConfig?.requiresFieldSelection && entityFields.length > 0 && (
                            <FieldSelector 
                                label="Which information is inaccurate?"
                                placeholder="Add an inaccurate field..."
                                emptyMessage="All available fields have been selected."
                                availableFields={entityFields}
                                value={selectedFields}
                                onChange={(newValues) => setValue("selectedFields", newValues, { shouldValidate: !!errors.selectedFields })}
                                error={errors.selectedFields?.message}
                            />
                        )}

                        {/* 3. SELEZIONE MEDIA */}
                        {selectedReasonConfig?.requiresMediaSelection && entityMedia.length > 0 && (
                            <MediaSelector
                                label="Select the infringing media"
                                singleMediaMessage="The only available photo will be automatically attached to this report."
                                media={entityMedia}
                                value={selectedMedia}
                                onChange={(newValues) => setValue("selectedMedia", newValues, { shouldValidate: !!errors.selectedMedia })}
                                error={errors.selectedMedia?.message}
                            />
                        )}

                        {/* DESCRIPTION GENERALE */}
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="description">Details <span className="text-red-500">*</span></Label>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        placeholder="Describe the issue in detail..."
                                        maxLength={2000}
                                        className={`resize-none h-24 ${errors.description ? "border-red-500" : ""}`}
                                    />
                                    <div className="flex justify-between items-center w-full mt-1">
                                        <div className="text-[11px] text-red-500 font-medium">
                                            {errors.description?.message}
                                        </div>
                                        <div className="text-[10px] text-right text-slate-400 ml-auto">
                                            {field.value.length}/2000
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                    </div>

                    <DialogFooter className="bg-card">
                        <div className="w-full flex justify-between">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => handleOpenChange(false)} 
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            
                            {/* react-hook-form impedirà il submit in automatico se i campi obbligatori di Zod falliscono */}
                            <Button type="submit" variant="destructive" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Report"
                                )}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}