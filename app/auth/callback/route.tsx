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
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = next
      redirectUrl.search = ''
      
      return NextResponse.redirect(redirectUrl)
    }
  }

  const errorUrl = request.nextUrl.clone()
  errorUrl.pathname = '/login'
  errorUrl.search = '?error=auth-failed'
  
  return NextResponse.redirect(errorUrl)
}