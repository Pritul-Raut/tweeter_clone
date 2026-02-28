'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
                role: 'user', // Default role
                is_verified: false,
            }
        }
    })

    if (error) {
        return redirect('/signup?message=Could not sign up user')
    }

    return redirect('/login?message=Check email to continue sign in process')
}

export async function staffLogin(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return redirect('/staff/login?message=Could not authenticate staff')
    }

    // Verification if the user is actually staff happens in the middleware
    return redirect('/staff/dashboard')
}

export async function signout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/login');
}
