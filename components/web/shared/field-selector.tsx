import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface FieldSelectorProps {
    label: string;
    placeholder: string;
    emptyMessage: string;
    availableFields: { id: string; label: string }[];
    value: string[];
    onChange: (newValues: string[]) => void;
    error?: string;
}

export function FieldSelector({ label, placeholder, emptyMessage, availableFields, value, onChange, error }: FieldSelectorProps) {
    const unselectedFields = availableFields.filter(f => !value.includes(f.id));

    // Le funzioni di aggiunta/rimozione ora calcolano il nuovo array e usano l'onChange
    const handleAddField = (id: string) => onChange([...value, id]);
    const handleRemoveField = (idToRemove: string) => onChange(value.filter(id => id !== idToRemove));

    return (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Label>{label} <span className="text-red-500">*</span></Label>
            
            {unselectedFields.length > 0 ? (
                <Select onValueChange={handleAddField} value="">
                    <SelectTrigger className={error ? "border-red-500" : ""}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-card p-2">
                        {unselectedFields.map(f => (
                            <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : (
                <p className="text-[11px] text-slate-500 italic p-2 bg-slate-50 rounded-md border border-slate-100">
                    {emptyMessage}
                </p>
            )}

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {value.map(id => {
                        const fieldLabel = availableFields.find(f => f.id === id)?.label || id;
                        return (
                            <span key={id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                {fieldLabel}
                                <button type="button" onClick={() => handleRemoveField(id)} className="hover:bg-slate-200 hover:text-red-500 rounded-full p-0.5 transition-colors">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}
            {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
    );
}