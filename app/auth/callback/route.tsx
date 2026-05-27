import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server' 

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Gestisce in automatico percorsi relativi, 
      // percorsi assoluti e query string annidate in "next"!
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  const errorUrl = new URL('/login', request.url)
  errorUrl.searchParams.set('error', 'auth-failed')
  
  return NextResponse.redirect(errorUrl)
}