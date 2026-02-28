import { signup } from '@/app/actions/auth'
import Link from 'next/link'

export default async function SignupPage(props: { searchParams: Promise<{ message: string }> }) {
    const params = await props.searchParams;
    const message = params?.message;

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-blue-500 dark:text-blue-400 mb-2">Join X Clone Today</h1>
                <p className="text-gray-500 dark:text-gray-400">Create an account to connect with others.</p>
            </div>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4" action={signup}>
                <div className="flex flex-col gap-1">
                    <label className="text-md font-semibold text-gray-800 dark:text-gray-200" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="rounded-md w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        name="username"
                        placeholder="johndoe"
                        required
                        type="text"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-md font-semibold text-gray-800 dark:text-gray-200" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        name="email"
                        placeholder="you@example.com"
                        required
                        type="email"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-md font-semibold text-gray-800 dark:text-gray-200" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-full px-4 py-3 text-lg transition-colors mt-4">
                    Sign Up
                </button>

                {message && (
                    <p className="mt-4 p-4 bg-orange-50 text-orange-600 text-center rounded-md border border-orange-200 font-medium">
                        {message}
                    </p>
                )}

                <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:underline font-semibold">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    )
}
