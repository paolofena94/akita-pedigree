'use client'

import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'

interface FormInputFieldProps {
    name: string
    label: string
    type?: string
    placeholder?: string
    disabled?: boolean
    isPasswordField?: boolean
}

export function FormInputField({ 
    name, 
    label, 
    type = 'text', 
    placeholder, 
    disabled, 
    isPasswordField 
}: FormInputFieldProps) {
    const { control } = useFormContext()
    const [showPassword, setShowPassword] = useState(false)

    // Se è un campo password, il tipo cambia dinamicamente
    const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <div className="relative">
                        <Input
                            {...field}
                            id={name}
                            type={inputType}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={isPasswordField ? "pr-10" : ""}
                            aria-invalid={fieldState.invalid}
                        />
                        
                        {isPasswordField && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        )}
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}