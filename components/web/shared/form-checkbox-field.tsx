'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError } from '@/components/ui/field'

interface FormCheckboxFieldProps {
    name: string
    children: React.ReactNode
    disabled?: boolean
}

export function FormCheckboxField({ name, children, disabled }: FormCheckboxFieldProps) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mt-4">
                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id={name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                        />
                        <div className="text-sm leading-tight text-muted-foreground cursor-pointer">
                            <label htmlFor={name} className="cursor-pointer">
                                {children}
                            </label>
                        </div>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}