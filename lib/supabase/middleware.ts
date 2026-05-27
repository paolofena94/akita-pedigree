// lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // AFFIDABILITÀ: Estrazione dell'errore. Non destrutturare ciecamente.
  const { data: { user }, error } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isProtectedRoute = pathname.startsWith('/settings') || pathname.endsWith('/edit') || pathname.startsWith('/users')
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  let redirectUrl: URL | null = null

  // SICUREZZA: Fallback chiuso. Se c'è un errore (es. token manomesso), neghiamo l'accesso.
  if (isProtectedRoute && (!user || error)) {
    redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
  } else if (isAuthRoute && user && !error) {
    redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
  }

  // AFFIDABILITÀ / SICUREZZA: Preservazione dei cookie post-refresh token.
  if (redirectUrl) {
    const redirectResponse = NextResponse.redirect(redirectUrl)
    
    // Trasferisce esplicitamente i cookie aggiornati dal middleware di Supabase
    // alla nuova istanza di redirect generata da Next.js.
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    
    return redirectResponse
  }

  return supabaseResponse
}