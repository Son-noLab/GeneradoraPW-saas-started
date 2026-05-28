import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const rawNext = searchParams.get('next') ?? '/portal'
  // Only allow relative paths to prevent open redirect attacks
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/'

  if (code) {
    const supabase = await createClient()
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && sessionData.user) {
      await supabase.from('profiles').upsert(
        {
          id: sessionData.user.id,
          email: sessionData.user.email ?? '',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Recovery link expired or invalid — send back to forgot-password with context
  const isForgotFlow = next === '/reset-password'
  return NextResponse.redirect(
    isForgotFlow
      ? `${origin}/forgot-password?error=link`
      : `${origin}/login`
  )
}
