"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider, Controller, FieldValues, DefaultValues, Path, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // 🌟 Assumendo che tu usi sonner per i toast. Cambia se usi altro.
import { useRouter } from "next/navigation"; // 🌟 Import per ricaricare la pagina

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { getEditableFields } from "@/config/edit";
import { getEditPersonSchema } from "@/lib/validations/person";
// Aggiungerai qui gli import per akita e kennel quando li creerai
// import { getEditAkitaSchema } from "@/lib/validations/akita";

import { CountrySelector } from "./country-form";
import { MediaManager } from "./media-manager";
import { cn } from "@/lib/utils";
import { EditEntityContext } from "@/types/edit";
import { EntityMedia } from "@/types/media";
import { updatePersonAction } from "@/actions/person";

interface EditEntitySheetProps<T extends FieldValues> {
    context: EditEntityContext;
    recordId: string;
    initialData: T;
}

export function EditEntitySheet<T extends FieldValues>({
    context,
    recordId,
    initialData
}: EditEntitySheetProps<T>) {
    const [isOpen, setIsOpen] = useState(false);

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [deleteReason, setDeleteReason] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const entityType = context.type;
    const router = useRouter(); // 🌟 Inizializza il router

    // 🌟 1. SMISTATORE ZOD: Determina lo schema corretto in base all'entità
    let validationSchema;
    switch (context.type) {
        case 'persons':
            validationSchema = getEditPersonSchema(context.isClaimed);
            break;
        /* case 'akitas':
                    // validationSchema = getEditAkitaSchema(); 
                    validationSchema = z.any(); // Placeholder temporaneo
                    break;
                case 'kennels':
                    // validationSchema = getEditKennelSchema(context.isClaimed);
                    validationSchema = z.any(); // Placeholder temporaneo
                    break; */
        default:
            validationSchema = z.any();
    }

    const methods = useForm<T>({
        defaultValues: initialData as DefaultValues<T>,
        resolver: zodResolver(validationSchema),
        mode: "onChange",
    });

    const sectionsToRender = getEditableFields(context);

    useEffect(() => {
        if (isOpen) {
            methods.reset({ ...initialData, notes: "" } as DefaultValues<T>);
            setShowDeleteForm(false);
            setDeleteReason("");
        }
    }, [isOpen, initialData, methods]);

    // 🌟 2. LA FUNZIONE ONSUBMIT COLLEGATA ALLA SERVER ACTION
    const onSubmit = async (data: T) => {
        try {
            let result;

            // Smistatore delle azioni in base all'entità
            switch (entityType) {
                case 'persons':
                    result = await updatePersonAction(recordId, data);
                    break;
                // case 'akitas':
                //     result = await updateAkitaAction(recordId, data);
                //     break;
                // case 'kennels':
                //     result = await updateKennelAction(recordId, data);
                //     break;
                default:
                    throw new Error("Unsupported entity type");
            }

            if (result.success) {
                toast.success(`${entityType.replace(/s$/, '')} updated successfully!`);
                setIsOpen(false);

                // 🌟 3. FORZA IL REFRESH DELLA PAGINA CORRENTE
                // Questo dirà a Next.js di scartare la cache lato client e 
                // rifare le chiamate al server (che ora sono nuove grazie a revalidateTag)
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update record.");
            }
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("An unexpected error occurred.");
        }
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        console.log(`Inviata richiesta di eliminazione per ${entityType} ${recordId}. Motivazione: ${deleteReason}`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsDeleting(false);
        setIsOpen(false);
        toast.success("Deletion request sent.");
    };

    const { isSubmitting, isValid } = methods.formState;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground border border-transparent hover:bg-transparent! hover:text-foreground rounded-full transition-all duration-200 cursor-pointer aria-expanded:bg-transparent aria-expanded:text-foreground">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
            </SheetTrigger>

            <SheetContent
                className="w-full px-8 sm:px-12 sm:max-w-2xl! overflow-y-auto bg-card flex flex-col"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <SheetHeader className="pt-6 pb-2 pl-0">
                    <SheetTitle className="text-2xl font-semibold text-foreground capitalize tracking-tight">
                        Edit {entityType.replace(/s$/, '')}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-slate-500">
                        Update the information for this record.
                    </SheetDescription>
                </SheetHeader>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col grow mt-6">
                        <div className="space-y-12 grow">

                            {sectionsToRender.map((section, index) => (
                                <div key={index} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                            {section.title}
                                        </h3>
                                        <div className="h-px bg-slate-100 grow rounded-full" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                        {section.fields.map((field) => {
                                            const isFullWidth = field.type === 'textarea' || field.type === 'media-array' || field.fullWidth;
                                            const fieldWrapperClass = cn("w-full", isFullWidth && "sm:col-span-2");
                                            const showLabel = field.label.toLowerCase() !== section.title.toLowerCase();

                                            return (
                                                <div key={field.id} className={fieldWrapperClass}>
                                                    <Controller
                                                        name={field.id as Path<T>}
                                                        control={methods.control}
                                                        defaultValue={field.type === 'media-array' ? ([] as any) : ("" as any)}
                                                        render={({ field: hookField, fieldState }) => (
                                                            <Field data-invalid={fieldState.invalid}>
                                                                {showLabel ? (
                                                                    <FieldLabel htmlFor={field.id}>
                                                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                                                    </FieldLabel>
                                                                ) : (
                                                                    <label htmlFor={field.id} className="sr-only">
                                                                        {field.label}
                                                                    </label>
                                                                )}

                                                                <div className="relative">
                                                                    {field.type === 'country' ? (
                                                                        <CountrySelector
                                                                            value={(hookField.value as string) || ""}
                                                                            onChange={hookField.onChange}
                                                                            placeholder={`Select ${field.label}...`}
                                                                            invalid={fieldState.invalid}
                                                                        />
                                                                    ) : field.type === 'textarea' ? (
                                                                        <Textarea
                                                                            {...hookField}
                                                                            id={field.id}
                                                                            placeholder={field.placeholder}
                                                                            className="resize-none h-24"
                                                                            disabled={isSubmitting}
                                                                            aria-invalid={fieldState.invalid}
                                                                        />
                                                                    ) : field.type === 'media-array' ? (
                                                                        <MediaManager
                                                                            value={(hookField.value as EntityMedia[]) || []}
                                                                            onChange={hookField.onChange}
                                                                            limit={10}
                                                                            disabled={isSubmitting}
                                                                        />
                                                                    ) : (
                                                                        <Input
                                                                            {...hookField}
                                                                            id={field.id}
                                                                            type={field.type}
                                                                            placeholder={field.placeholder}
                                                                            disabled={isSubmitting}
                                                                            aria-invalid={fieldState.invalid}
                                                                        />
                                                                    )}
                                                                </div>

                                                                {fieldState.invalid && fieldState.error && (
                                                                    <FieldError errors={[fieldState.error]} />
                                                                )}
                                                            </Field>
                                                        )}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* EXTRA NOTES */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                        Extra
                                    </h3>
                                    <div className="h-px bg-slate-100 grow rounded-full" />
                                </div>

                                <Controller
                                    name={"notes" as Path<T>}
                                    control={methods.control}
                                    defaultValue={"" as PathValue<T, Path<T>>}
                                    render={({ field: hookField, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="notes">
                                                Modification Notes <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
                                            </FieldLabel>
                                            <Textarea
                                                {...hookField}
                                                id="notes"
                                                placeholder="Explain why you are making these changes..."
                                                className="resize-none h-20 text-sm"
                                                disabled={isSubmitting}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* DELETE ZONE IN-PLACE */}
                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs font-semibold text-red-500 uppercase tracking-widest whitespace-nowrap">
                                        Delete Zone
                                    </h3>
                                    <div className="h-px bg-red-100 grow rounded-full" />
                                </div>

                                {!showDeleteForm ? (
                                    <div className="p-4 border border-red-100 bg-red-50/50 rounded-xl animate-in fade-in duration-200">
                                        <p className="text-sm text-slate-600">
                                            Do you need to permanently remove this record?{" "}
                                            <button
                                                type="button"
                                                onClick={() => setShowDeleteForm(true)}
                                                className="text-red-600 font-semibold hover:text-red-700 hover:underline transition-all outline-hidden ml-1"
                                            >
                                                Send a deletion request.
                                            </button>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="p-5 border border-red-200 bg-red-50 rounded-xl space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                                        <Field>
                                            <FieldLabel htmlFor="delete_reason">
                                                Reason for deletion <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <Textarea
                                                id="delete_reason"
                                                value={deleteReason}
                                                onChange={(e) => setDeleteReason(e.target.value)}
                                                placeholder="Please explain why this record should be removed..."
                                                className="resize-none h-20 text-sm bg-white border-red-200 focus-visible:ring-red-400"
                                                disabled={isDeleting || isSubmitting}
                                            />
                                        </Field>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-slate-600 hover:bg-red-100/50"
                                                onClick={() => { setShowDeleteForm(false); setDeleteReason(""); }}
                                                disabled={isDeleting || isSubmitting}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={handleConfirmDelete}
                                                disabled={!deleteReason.trim() || isDeleting || isSubmitting}
                                            >
                                                {isDeleting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                                                Confirm Request
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* FOOTER AZIONI */}
                        <SheetFooter className="mt-12 pt-6 shrink-0">
                            <div className="w-full flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting || isDeleting}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting || isDeleting || !isValid}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </FormProvider>
            </SheetContent>
        </Sheet>
    );
}