import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils' // <-- Importiamo cn

export interface WizardStep {
    name: string;
    [key: string]: any; 
}

interface WizardProgressBarProps {
    steps: WizardStep[];
    currentStep: number;
    className?: string; // <-- Aggiungiamo la prop opzionale
}

export function WizardProgressBar({ steps, currentStep, className }: WizardProgressBarProps) {
    const progressPercentage = steps.length > 1 
        ? (currentStep / (steps.length - 1)) * 100 
        : 0;

    return (
        // Uniamo le classi base ("relative w-full") con quelle passate dal genitore
        <div className={cn("relative w-full", className)}>
            
            {/* Barra grigia di sfondo */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0" />
            
            {/* Barra colorata di progresso */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            />
            
            {/* Pallini degli step */}
            <div className="flex justify-between w-full relative z-10">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > index;
                    const isActive = currentStep === index;
                    
                    return (
                        <div key={step.name} className="flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 shadow-sm ${
                                isActive ? 'bg-primary text-white ring-4 ring-primary/20' :
                                isCompleted ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-200'
                            }`}>
                                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                            </div>
                            <span className={`text-xs absolute -bottom-6 w-24 text-center font-medium ${
                                isActive ? 'text-primary' : 'text-muted-foreground'
                            }`}>
                                {step.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}