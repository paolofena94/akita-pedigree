'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { createClient } from '@/lib/client'
import { BrandLogo } from '../shared/brand-logo'
import { Eye, EyeOff } from 'lucide-react'

interface AuthFormProps {
    mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    // NUOVI STATI
    const [showPassword, setShowPassword] = useState(false)
    const [rememberSelected, setRememberSelected] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)

    const isSignUp = mode === 'register'

    const handleSocialLogin = async (provider: 'google') => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        })
    }

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // CONTROLLO TERMINI E CONDIZIONI
        if (isSignUp && !termsAccepted) {
            alert("Devi accettare i Termini e le Condizioni per procedere.")
            return
        }

        setLoading(true)

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } }
            })
            if (error) alert(error.message)
            else alert('Check your email to confirm your account!')
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) alert(error.message)
        }
        setLoading(false)
    }

    return (
        <Card className="w-full max-w-lg mx-auto px-4 py-6 rounded-4xl shadow-sm bg-card border-transparent md:border-card">
            <CardHeader className="mt-4 mb-2 md:mx-6 flex flex-col-reverse md:flex-row  justify-between gap-4">

                {/* Blocco a SINISTRA: Titolo e Descrizione raggruppati in un div */}
                <div className="flex flex-col space-y-1.5 text-left">
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                        {isSignUp ? 'Sign up' : 'Welcome Back'}
                    </CardTitle>
                    <CardDescription>
                        {isSignUp
                            ? 'Enter your details below'
                            : 'Login to your account to continue'}
                    </CardDescription>
                </div>

                {/* Blocco a DESTRA: Il Logo */}
                <BrandLogo size="md" className="shrink-0" />

            </CardHeader>
            <CardContent className="space-y-4 md:mx-6">

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    {isSignUp && (
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={username} placeholder="akitalover" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                    )}

                    {/* CAMPO PASSWORD CON OCCHIO */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* SEZIONE LOGIN: Remember me & Forgot Password */}
                    {!isSignUp && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center space-x-2">
                                {/* IMPORTANTE: in shadcn/radix, spesso passare l'id direttamente al componente Checkbox non basta per il mobile.
                                    È meglio usare onCheckedChange anche qui se la label non scatta, 
                                    oppure avvolgere il testo in una label standard che si poggia sull'id. */}
                                <Checkbox
                                    id="remember"
                                    checked={rememberSelected}
                                    onCheckedChange={(checked) => setRememberSelected(checked as boolean)}
                                />
                                <Label
                                    htmlFor="remember"
                                    // Aggiunto cursor-pointer per essere sicuri che il browser lo tratti come elemento interattivo
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    )}

                    {/* SEZIONE REGISTRAZIONE: Termini e Condizioni Obbligatori */}
                    {isSignUp && (
                        <div className="flex items-start space-x-2 mt-6">
                            <Checkbox
                                id="terms"
                                checked={termsAccepted}
                                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            />
                            <Label
                                htmlFor="terms"
                                className="text-sm leading-tight text-muted-foreground cursor-pointer line-clamp-2 md:text-nowrap"
                            >
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary hover:underline font-medium relative z-10">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary hover:underline font-medium relative z-10">
                                    Privacy Policy
                                </Link>
                            </Label>
                        </div>
                    )}

                    <Button type="submit" className="w-full mt-2 transition-colors duration-200 hover:brightness-110" disabled={loading}>
                        {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Log in'}
                    </Button>
                </form>

                <div className="flex items-center space-x-2 pt-2">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground uppercase">OR</span>
                    <Separator className="flex-1" />
                </div>

                {/* MODIFICA: Bottone Google con frase di consenso implicito */}
                <div className="space-y-2">
                    <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('google')}>
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <p className="text-[11px] text-center text-muted-foreground md:text-nowrap">
                        By continuing with Google, you agree to our Terms of Service and Privacy Policy.
                    </p>

                </div>

                <div className="text-center mt-6">
                    <Link
                        href={isSignUp ? '/login' : '/register'}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        {isSignUp ? (
                            <>Already have an account? <span className="font-bold">Log in</span></>
                        ) : (
                            <>Don't have an account? <span className="font-bold">Sign up</span></>
                        )}
                    </Link>
                </div>

            </CardContent>
        </Card>
    )
}