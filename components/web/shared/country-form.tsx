'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import { getCountryOptionsWithoutFlags } from "@/lib/nations"
import { cn } from "@/lib/utils"

interface CountryAutocompleteProps {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    invalid?: boolean;
    placeholder?: string;
}

export function CountryAutocomplete({
    value,
    onChange,
    disabled = false,
    invalid = false,
    placeholder = "Search a country..."
}: CountryAutocompleteProps) {
    const countries = getCountryOptionsWithoutFlags();
    const selectedLabel = countries.find(c => c.value === value)?.label || "";

    const [inputValue, setInputValue] = useState(selectedLabel);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setInputValue(selectedLabel);
    }, [selectedLabel]);

    const filteredCountries = countries.filter(c =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverAnchor asChild>
                <div className="relative w-full">
                    <Input
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={disabled}
                        autoComplete="off"
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsOpen(true);
                            if (e.target.value === "") onChange(""); 
                        }}
                        onFocus={() => setIsOpen(true)}
                        className={cn(invalid && "border-destructive focus-visible:ring-destructive/20")}
                    />
                </div>
            </PopoverAnchor>
            
            <PopoverContent 
                className="p-1.5 w-(--radix-popover-trigger-width) bg-white" 
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={() => {
                    setIsOpen(false);
                    setInputValue(selectedLabel);
                }}
            >
                <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.length === 0 ? (
                        <div className="px-3 py-4 text-sm text-slate-500 text-center">No country found</div>
                    ) : (
                        filteredCountries.map((country) => (
                            <div
                                key={country.value}
                                onClick={() => {
                                    onChange(country.value);
                                    setInputValue(country.label);
                                    setIsOpen(false);
                                }}
                                className="px-3 py-2.5 cursor-pointer text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-accent hover:text-slate-900 transition-colors"
                            >
                                {country.label}
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}