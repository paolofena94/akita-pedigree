'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandLogo } from '../../../components/web/shared/brand-logo'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, registerSchema, LoginInput, RegisterInput } from '@/lib/validations/auth'
import { loginAction, signUpAction } from '@/actions/auth'
import { FormInputField } from '@/components/web/shared/form-input-field'
import { FormCheckboxField } from '@/components/web/shared/form-checkbox-field'
import { AuthSuccessDialog } from './auth-success-dialog'
import { useSearchParams } from 'next/navigation'


interface AuthFormProps {
    mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
    const supabase = createClient()
    const searchParams = useSearchParams()
    const isSignUp = mode === 'register'
    
    const [loading, setLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    
    const nextUrl = searchParams.get('next') || '/'
    
    const schema = isSignUp ? registerSchema : loginSchema

    const methods = useForm<RegisterInput | LoginInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            ...(isSignUp ? { username: '', terms: false } : {}),
        },
    })

    const handleSocialLogin = async (provider: 'google') => {
        setLoading(true)
        await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl)}` }
        })
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        methods.clearErrors('root')

        try {
            if (isSignUp) {
                const res = await signUpAction(data)
                if (!res.success) throw new Error(res.error)
                setIsDialogOpen(true)
            } else {
                const res = await loginAction(data)
                if (res && !res.success) throw new Error(res.error)
            }
        } catch (error: any) {
            if (error.message === 'NEXT_REDIRECT') return;
            methods.setError('root', {
                type: 'server',
                message: error.message || 'An unexpected error occurred.'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <FormProvider {...methods}>
            <Card className="w-full max-w-lg mx-auto px-4 py-6 rounded-4xl shadow-sm bg-card border-transparent md:border-card">
                <CardHeader className="mt-4 mb-2 md:mx-6 flex flex-col-reverse md:flex-row justify-between gap-4">
                    <div className="flex flex-col space-y-1.5 text-left">
                        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                            {isSignUp ? 'Sign up' : 'Welcome Back'}
                        </CardTitle>
                        <CardDescription>
                            <Link href={isSignUp ? '/login' : '/register'} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {isSignUp ? (
                                    <>Already have an account? <span className="font-bold">Log in</span></>
                                ) : (
                                    <>Don't have an account? <span className="font-bold">Sign up</span></>
                                )}
                            </Link>
                        </CardDescription>
                    </div>
                    <BrandLogo size="md" className="shrink-0" withLink={false} />
                </CardHeader>

                <CardContent className="space-y-4 md:mx-6">
                    {/* MESSAGGI DI ERRORE SERVER */}
                    {methods.formState.errors.root && (
                        <div className="p-3 bg-red-50/50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <p>{methods.formState.errors.root.message}</p>
                        </div>
                    )}

                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                        <FormInputField 
                            name="email" 
                            label="E-mail" 
                            type="email" 
                            placeholder="you@example.com" 
                            disabled={loading} 
                        />

                        {isSignUp && (
                            <FormInputField 
                                name="username" 
                                label="Username" 
                                placeholder="akitalover" 
                                disabled={loading} 
                            />
                        )}

                        <FormInputField 
                            name="password" 
                            label="Password" 
                            placeholder="••••••••" 
                            disabled={loading} 
                            isPasswordField 
                        />

                        {!isSignUp && (
                            <div className="flex justify-start mt-2">
                                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        {isSignUp && (
                            <FormCheckboxField name="terms" disabled={loading}>
                                I agree to the <Link href="/terms" className="text-primary hover:underline font-medium relative z-10">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline font-medium relative z-10">Privacy Policy</Link>
                            </FormCheckboxField>
                        )}

                        <Button type="submit" className="w-full mt-4 py-4 hover:brightness-110 rounded-full text-sm" disabled={loading}>
                            {loading ? 'Processing...' : isSignUp ? 'Sign up' : 'Log in'}
                        </Button>
                    </form>

                    <div className="flex items-center gap-3 pt-2">
                        <div className="flex-1 border-t border-slate-200" />
                        <span className="text-xs text-muted-foreground uppercase">OR</span>
                        <div className="flex-1 border-t border-slate-200" />
                    </div>

                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full py-4 rounded-full text-sm shadow-none border-slate-200"
                            onClick={() => handleSocialLogin('google')}
                            disabled={loading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </Button>
                        <p className="text-[11px] text-center text-muted-foreground mt-2">
                            By continuing with Google, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <AuthSuccessDialog 
                isOpen={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
                email={methods.getValues('email')} 
            />
        </FormProvider>
    )
}