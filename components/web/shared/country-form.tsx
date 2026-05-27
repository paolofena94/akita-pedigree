'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import { getCountryOptionsWithoutFlags } from "@/lib/nations"
import { cn } from "@/lib/utils"

interface CountrySelectorProps {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    invalid?: boolean;
    placeholder?: string;
}

export function CountrySelector({
    value,
    onChange,
    disabled = false,
    invalid = false,
    placeholder = "Search a country..."
}: CountrySelectorProps) {
    const countries = getCountryOptionsWithoutFlags();
    const selectedLabel = countries.find(c => c.value === value)?.label || "";

    const [inputValue, setInputValue] = useState(selectedLabel);
    const [isOpen, setIsOpen] = useState(false);
    
    // 🌟 1. STATO PER LA NAVIGAZIONE DA TASTIERA
    const [activeIndex, setActiveIndex] = useState(0); 
    
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(selectedLabel);
    }, [selectedLabel]);

    // 🌟 2. FILTRO INTELLIGENTE: Mette prima i paesi che *iniziano* con le lettere digitate
    const filteredCountries = countries.filter(c =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
    ).sort((a, b) => {
        const aStarts = a.label.toLowerCase().startsWith(inputValue.toLowerCase());
        const bStarts = b.label.toLowerCase().startsWith(inputValue.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
    });

    // Resetta l'indice quando l'utente digita qualcosa di nuovo
    useEffect(() => {
        setActiveIndex(0);
    }, [inputValue]);

    // 🌟 3. AUTO-SCROLL: Insegue l'elemento evidenziato con la tastiera
    useEffect(() => {
        if (isOpen && listRef.current) {
            const activeEl = listRef.current.children[activeIndex] as HTMLElement;
            if (activeEl) {
                // 'nearest' assicura che scatti in modo morbido senza far saltare l'intera pagina
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [activeIndex, isOpen]);

    const handleSelect = (val: string, label: string) => {
        onChange(val);
        setInputValue(label);
        setIsOpen(false);
    };

    // 🌟 4. GESTIONE DELLA TASTIERA (Magia del selettore moderno)
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen && e.key !== 'Escape' && e.key !== 'Tab') {
            setIsOpen(true);
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => (prev < filteredCountries.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (isOpen && filteredCountries[activeIndex]) {
                    handleSelect(filteredCountries[activeIndex].value, filteredCountries[activeIndex].label);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setInputValue(selectedLabel);
                break;
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <PopoverAnchor asChild>
                <div className="relative w-full" ref={wrapperRef}>
                    <Input
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={disabled}
                        autoComplete="off"
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-controls="country-listbox"
                        aria-activedescendant={isOpen ? `country-item-${activeIndex}` : undefined}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsOpen(true);
                            if (e.target.value === "") onChange(""); 
                        }}
                        onFocus={() => setIsOpen(true)}
                        onClick={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        className={cn(invalid && "border-destructive focus-visible:ring-destructive/20")}
                    />
                </div>
            </PopoverAnchor>
            
            <PopoverContent 
                className="p-1.5 w-(--radix-popover-trigger-width) bg-white shadow-lg border-slate-200 rounded-xl" 
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={(e) => {
                    if (e.target instanceof Node && wrapperRef.current?.contains(e.target)) {
                        e.preventDefault();
                        return;
                    }
                    setIsOpen(false);
                    setInputValue(selectedLabel);
                }}
            >
                {/* 🌟 Rimosso overscroll-contain, lasciamo fare al browser */}
                <div 
                    ref={listRef}
                    id="country-listbox"
                    role="listbox"
                    className="max-h-60 overflow-y-auto flex flex-col"
                >
                    {filteredCountries.length === 0 ? (
                        <div className="px-3 py-4 text-sm text-slate-500 text-center">No country found</div>
                    ) : (
                        filteredCountries.map((country, index) => (
                            <div
                                key={country.value}
                                id={`country-item-${index}`}
                                role="option"
                                aria-selected={index === activeIndex}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => handleSelect(country.value, country.label)}
                                className={cn(
                                    "px-3 py-2 cursor-pointer text-sm font-medium rounded-md transition-colors flex items-center",
                                    index === activeIndex 
                                        ? "bg-accent text-slate-900" 
                                        : "bg-transparent text-slate-700"
                                )}
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