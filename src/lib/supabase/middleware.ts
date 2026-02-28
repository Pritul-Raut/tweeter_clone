import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
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

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname;

    // Protect staff routes
    if (pathname.startsWith('/staff/dashboard')) {
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/staff/login'
            return NextResponse.redirect(url)
        }

        // Check role from metadata or user profile table later 
        // Here we check user_metadata.role
        const role = user.user_metadata?.role || 'user';
        if (role !== 'admin' && role !== 'supervisor') {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    // Protect standard user routes if necessary, but Twitter clone usually allows public reading of tweets
    // If we only want logged-in users to post/like, we handle that in the UI or Actions/API routes.

    // Redirect logged-in users away from auth pages
    if (user && (pathname === '/login' || pathname === '/signup' || pathname === '/staff/login')) {
        const url = request.nextUrl.clone()
        url.pathname = pathname === '/staff/login' ? '/staff/dashboard' : '/'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
