import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { CountrySelector } from '@/components/web/shared/country-form'

export function StepBasicInfo({ disabled }: { disabled: boolean }) {
    const { control } = useFormContext();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                <Controller name="first_name" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className="flex justify-between items-baseline mb-1.5">
                            <FieldLabel htmlFor={field.name} className="mb-0">First Name</FieldLabel>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Optional</span>
                        </div>
                        <Input {...field} id={field.name} placeholder="e.g. John" disabled={disabled} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )} />
                <Controller name="last_name" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className="flex justify-between items-baseline mb-1.5">
                            <FieldLabel htmlFor={field.name} className="mb-0">Last Name <span className="text-destructive">*</span></FieldLabel>
                        </div>
                        <Input {...field} id={field.name} placeholder="e.g. Doe" disabled={disabled} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                <Controller name="country" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className="flex justify-between items-baseline mb-1.5">
                            <FieldLabel htmlFor={field.name} className="mb-0">Country <span className="text-destructive">*</span></FieldLabel>
                        </div>
                        <CountrySelector value={field.value} onChange={field.onChange} disabled={disabled} invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )} />
                <Controller name="state" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className="flex justify-between items-baseline mb-1.5">
                            <FieldLabel htmlFor={field.name} className="mb-0">State / Province</FieldLabel>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Optional</span>
                        </div>
                        <Input {...field} id={field.name} placeholder="e.g. Tokyo" disabled={disabled} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )} />
            </div>
        </div>
    )
}