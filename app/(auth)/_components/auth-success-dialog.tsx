'use client'

import { useRouter } from 'next/navigation'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog'

interface AuthSuccessDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    email: string
}

export function AuthSuccessDialog({ isOpen, onOpenChange, email }: AuthSuccessDialogProps) {
    const router = useRouter()

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            onOpenChange(open)
            if (!open) router.push('/login')
        }}>
            <DialogContent className="sm:max-w-md rounded-3xl p-8 bg-background">
                <DialogHeader className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-green-100 p-4 rounded-full">
                        <MailCheck className="h-12 w-12 text-green-600" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">Confirm your email</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                        We've sent a verification link to <span className="font-bold text-foreground">{email}</span>.
                        Please check your inbox to activate your account.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 bg-background">
                    <Button
                        className="w-full rounded-full text-base font-semibold"
                        onClick={() => router.push('/login')}
                    >
                        Go to Login
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}