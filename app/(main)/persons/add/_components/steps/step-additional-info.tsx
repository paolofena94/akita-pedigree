import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'

export function StepAdditionalInfo({ disabled }: { disabled: boolean }) {
    const { control } = useFormContext();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Controller name="website_url" control={control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-baseline mb-1.5">
                        <FieldLabel htmlFor={field.name} className="mb-0">Website URL</FieldLabel>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Optional</span>
                    </div>
                    <Input {...field} id={field.name} type="url" placeholder="https://..." disabled={disabled} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )} />
            <Controller name="notes" control={control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-baseline mb-1.5">
                        <FieldLabel htmlFor={field.name} className="mb-0">Public Notes</FieldLabel>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Optional</span>
                    </div>
                    <Input {...field} id={field.name} placeholder="Known for breeding the famous..." disabled={disabled} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )} />
        </div>
    )
}