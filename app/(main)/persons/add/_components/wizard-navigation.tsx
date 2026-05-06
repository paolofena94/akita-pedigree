import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface WizardNavProps {
    currentStep: number;
    totalSteps: number;
    onPrev: () => void;
    onNext: (e: React.MouseEvent) => void;
    isChecking: boolean;
    isSubmitting: boolean;
}

export function WizardNavigation({ currentStep, totalSteps, onPrev, onNext, isChecking, isSubmitting }: WizardNavProps) {
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className="flex justify-between pt-8 border-t border-slate-100">
            <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                disabled={currentStep === 0 || isSubmitting || isChecking}
                className="rounded-full px-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            {!isLastStep ? (
                <Button
                    type="button"
                    onClick={onNext}
                    disabled={isChecking}
                    className="rounded-full px-8 hover:brightness-110"
                >
                    {isChecking ? 'Checking...' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : (
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full px-8 font-bold hover:brightness-110"
                >
                    {isSubmitting ? 'Saving...' : 'Complete & Save'}
                </Button>
            )}
        </div>
    )
}