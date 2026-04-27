import AuthForm from '@/app/(auth)/_components/auth-form'

export default function RegisterPage() {
  return (
    // Il contenitore principale che tiene uniti Titolo e Form con la stessa larghezza
    <div className="w-full max-w-lg space-y-8 flex items-center justify-center">
      {/* Il Form (ora è DENTRO il contenitore e si allineerà perfettamente col titolo) */}
      <AuthForm mode='register'/>
      
    </div>
  )
}