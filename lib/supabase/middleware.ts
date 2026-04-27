import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

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
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Recupero l'utente in modo sicuro (usiamo getUser invece di getClaims)
  const { data: { user } } = await supabase.auth.getUser()

  // Rotte non permesse se l'utente non è loggato
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/settings') || 
                           request.nextUrl.pathname.endsWith('/edit')

  // Rotte non permesse se l'utente è loggato
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/register')

  
  // A. Utente NON loggato cerca di entrare in pagine private -> Vai al Login
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // B. Utente GIÀ loggato cerca di andare nelle pagine di Login/Register -> Vai alla Home
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // IMPORTANTE: Ritorna sempre l'oggetto supabaseResponse intatto
  return supabaseResponse
}