'use client'

import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DuplicateWarningDialog } from './duplicate-warning-dialog'
import { WizardProgressBar } from '@/components/web/wizard-progress-bar'

import { StepBasicInfo } from './steps/step-basic-info'
import { StepAdditionalInfo } from './steps/step-additional-info'
import { WizardNavigation } from './wizard-navigation'

import { addPersonSchema, AddPersonInput } from '@/lib/validations/person'
import { checkExistingPersonsAction, createPersonAction } from '@/app/actions/person'

export const STEPS = [
    { id: 'Step 1', name: 'Basic Info', fields: ['first_name', 'last_name', 'country', 'state'] },
    { id: 'Step 2', name: 'Additional Info', fields: ['website_url', 'notes'] }
]

export default function AddPersonWizard() {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // STATI PER I DUPLICATI
    const [isCheckingDupe, setIsCheckingDupe] = useState(false)
    const [potentialDuplicates, setPotentialDuplicates] = useState<any[] | null>(null)
    const [isDupeDialogOpen, setIsDupeDialogOpen] = useState(false)
    const [hasBypassedDupe, setHasBypassedDupe] = useState(false)

    // Inizializza il form con React Hook Form e Zod
    const form = useForm<AddPersonInput>({
        resolver: zodResolver(addPersonSchema),
        defaultValues: { first_name: '', last_name: '', country: '', state: '', website_url: '', notes: '' }
    })

    const { watch, trigger, getValues, handleSubmit } = form;
    const [watchFirstName, watchLastName, watchCountry] = watch(['first_name', 'last_name', 'country']);

    // Se l'utente modifica i dati chiave, resettiamo il flag dei duplicati
    useEffect(() => {
        setHasBypassedDupe(false)
    }, [watchFirstName, watchLastName, watchCountry])

    const nextStep = async (e?: React.MouseEvent | React.FormEvent) => {
        if (e) e.preventDefault()

        // Validiamo solo i campi dello step corrente
        const isStepValid = await trigger(STEPS[currentStep].fields as any)

        if (isStepValid) {
            // Controllo duplicati: solo se siamo al primo step e non abbiamo già fatto il bypass
            if (currentStep === 0 && !hasBypassedDupe) {
                setIsCheckingDupe(true)
                const values = getValues()

                const res = await checkExistingPersonsAction(
                    values.first_name || '',
                    values.last_name,
                    values.country
                )

                setIsCheckingDupe(false)

                if (res.success && res.data && res.data.length > 0) {
                    setPotentialDuplicates(res.data)
                    setIsDupeDialogOpen(true)
                    return // Fermiamo il wizard per mostrare il dialogo
                } else {
                    setHasBypassedDupe(true)
                }
            }
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
        }
    }

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

    // Azione invocata dal Dialog se l'utente clicca "Nessuno di questi, procedi"
    const handleBypassDuplicates = () => {
        setHasBypassedDupe(true)
        setIsDupeDialogOpen(false)
        // Passiamo allo step successivo dopo una breve animazione del dialog che chiude
        setTimeout(() => setCurrentStep(1), 300)
    }

    // Funzione finale di salvataggio
    const onSubmit = async (data: AddPersonInput) => {
        // Se l'utente preme Invio sulla tastiera ma non è all'ultimo step, simuliamo il "Next"
        if (currentStep !== STEPS.length - 1) return nextStep()

        setIsSubmitting(true)

        try {
            // Chiamata alla Server Action per l'inserimento nel DB
            const res = await createPersonAction(data)

            if (res && !res.success) {
                alert(res.error || "An error occurred while saving.")
                setIsSubmitting(false)
                return
            }

        } catch (error: any) {
            if (error.message === 'NEXT_REDIRECT') {
                return;
            }

            console.error("Errore invio form:", error)
            alert("A connection error occurred. Please try again.")
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Card className="w-full max-w-2xl mx-auto px-4 py-6 rounded-4xl shadow-sm bg-card border-transparent md:border-card overflow-visible">
                <CardHeader className="text-center mt-2 mb-6">
                    <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
                        Add a New Person
                    </CardTitle>
                    <CardDescription className="text-base">
                        Help us expand the Akita network by registering a new breeder or owner.
                    </CardDescription>
                </CardHeader>

                <CardContent className="md:px-8">
                    <WizardProgressBar
                        steps={STEPS}
                        currentStep={currentStep}
                        className="w-2/3 md:w-1/2 mx-auto"
                    />

                    {/* Forniamo il contesto del form a tutti i sotto-componenti degli step */}
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-20">

                            {/* Step 1: Basic Info */}
                            {currentStep === 0 && <StepBasicInfo disabled={isCheckingDupe || isSubmitting} />}

                            {/* Step 2: Additional Info */}
                            {currentStep === 1 && <StepAdditionalInfo disabled={isSubmitting} />}

                            <WizardNavigation
                                currentStep={currentStep}
                                totalSteps={STEPS.length}
                                onPrev={prevStep}
                                onNext={nextStep}
                                isChecking={isCheckingDupe}
                                isSubmitting={isSubmitting}
                            />

                        </form>
                    </FormProvider>
                </CardContent>
            </Card>

            {/* Modale di avviso duplicati potenziali */}
            <DuplicateWarningDialog
                isOpen={isDupeDialogOpen}
                onOpenChange={setIsDupeDialogOpen}
                duplicates={potentialDuplicates}
                searchedCountry={getValues('country')}
                onBypass={handleBypassDuplicates}
            />
        </>
    )
}