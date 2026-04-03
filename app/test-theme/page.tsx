import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-background p-8 font-sans text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Akita <span className="text-primary">Pedigree</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Test ufficiale del tema Tailwind v4 "Warm Modern"
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Sezione Bottoni */}
          <section className="space-y-4 rounded-4xl border bg-card p-8 shadow-sm">
            <h2 className="border-b pb-2 text-2xl font-semibold">1. Bottoni Shadcn & Custom</h2>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Test delle varianti di Shadcn */}
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              
              {/* Test della classe custom CSS */}
              <button className="btn-modern">Custom Modern</button>
            </div>
          </section>

          {/* Sezione Tipografia e Colori */}
          <section className="space-y-4 rounded-4xl border bg-card p-8 shadow-sm">
            <h2 className="border-b pb-2 text-2xl font-semibold">2. Tipografia & Colori</h2>
            <div className="space-y-2 pt-4">
              <p className="text-base">Questo è il testo standard (Foreground).</p>
              <p className="text-muted-foreground">Questo è il testo secondario (Muted).</p>
              <p className="font-medium text-primary">Questo testo usa il colore Primary.</p>
              
              {/* Test dei colori di accento */}
              <div className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-accent font-medium text-accent-foreground">
                Box con colore Accent
              </div>
            </div>
          </section>

          {/* Sezione Card Shadcn */}
          <section className="space-y-4">
            <h2 className="px-2 text-2xl font-semibold">3. Componente Card (Shadcn)</h2>
            <Card>
              <CardHeader>
                <CardTitle>Hachiko Go</CardTitle>
                <CardDescription>Akita Inu Storico • Maschio • 1923</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Questa card usa le variabili standard di shadcn. Nota come il raggio 
                  (--radius) arrotonda perfettamente gli angoli per un look morbido.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Sezione Glassmorphism */}
          <section className="space-y-4">
            <h2 className="px-2 text-2xl font-semibold">4. Effetto Vetro (Custom)</h2>
            <div className="relative flex min-h-55 w-full items-center justify-center rounded-4xl bg-linear-to-br from-secondary to-primary p-8 shadow-inner">
              
              {/* Test della classe glass-card */}
              <div className="glass-card max-w-62.5 rounded-2xl p-6 text-center">
                <p className="font-bold text-gray-900">Glass Card</p>
                <p className="mt-1 text-xs text-gray-800">
                  Sfondo semitrasparente con blur applicato al livello sottostante.
                </p>
              </div>
              
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}