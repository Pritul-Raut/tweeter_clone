import { staffLogin } from '@/app/actions/auth'

export default async function StaffLoginPage(props: { searchParams: Promise<{ message: string }> }) {
    const params = await props.searchParams;
    const message = params?.message;

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-red-500 dark:text-red-400 mb-2">Staff Portal</h1>
                <p className="text-gray-500 dark:text-gray-400">Admin and Supervisor login</p>
            </div>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4" action={staffLogin}>
                <div className="flex flex-col gap-1">
                    <label className="text-md font-semibold text-gray-800 dark:text-gray-200" htmlFor="email">
                        Staff Email
                    </label>
                    <input
                        className="rounded-md w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        name="email"
                        placeholder="admin@example.com"
                        required
                        type="email"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-md font-semibold text-gray-800 dark:text-gray-200" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button className="bg-red-500 hover:bg-red-600 font-bold text-white rounded-full px-4 py-3 text-lg transition-colors mt-4">
                    Sign In as Staff
                </button>

                {message && (
                    <p className="mt-4 p-4 bg-red-50 text-red-600 text-center rounded-md border border-red-200 font-medium">
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}
