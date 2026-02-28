'use client'

import Link from 'next/link'
import { Home, Search, Bell, Mail, User, ShieldAlert, LogOut, Verified } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { signout } from '@/app/actions/auth'

export default function Sidebar({ userRole }: { userRole: string }) {
    const pathname = usePathname()

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Explore', href: '/explore', icon: Search },
        { name: 'Notifications', href: '/notifications', icon: Bell },
        { name: 'Messages', href: '/messages', icon: Mail },
        { name: 'Profile', href: '/profile', icon: User },
    ]

    if (userRole === 'admin' || userRole === 'supervisor') {
        navLinks.push({ name: 'Staff Dashboard', href: '/staff/dashboard', icon: ShieldAlert })
    }

    return (
        <div className="w-16 sm:w-20 xl:w-64 flex flex-col justify-between h-screen sticky top-0 border-r border-gray-100 dark:border-gray-800 p-2 xl:p-4 bg-white dark:bg-black">
            <div className="flex flex-col items-center xl:items-start space-y-2 mt-4">
                {/* Logo */}
                <Link href="/" className="mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors flex items-center justify-center">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 fill-blue-500">
                        <g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g>
                    </svg>
                </Link>

                {/* Navigation Links */}
                <div className="flex flex-col w-full space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`) && link.href !== '/'
                        const Icon = link.icon
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center space-x-4 p-3 rounded-full transition-all duration-200 group w-fit xl:w-full hover:bg-gray-100 dark:hover:bg-gray-900 ${isActive ? 'font-bold' : 'font-medium'
                                    }`}
                            >
                                <Icon className={`w-7 h-7 text-black dark:text-white transition-transform duration-200 group-hover:scale-110 ${isActive ? 'fill-black dark:fill-white' : ''}`} />
                                <span className="hidden xl:inline text-xl text-black dark:text-white">{link.name}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Tweet Button */}
                <button className="hidden xl:block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full py-4 mt-6 transition-colors shadow-sm">
                    Tweet
                </button>
                <button className="xl:hidden bg-blue-500 text-white rounded-full p-3 mt-6 hover:bg-blue-600 transition-colors">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
                        <g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g>
                    </svg>
                </button>
            </div>

            {/* Profile Section & Logout */}
            <div className="mb-4">
                <form action={signout}>
                    <button className="flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 w-fit xl:w-full text-left focus:outline-none">
                        <LogOut className="w-7 h-7 text-gray-700 dark:text-gray-300" />
                        <div className="hidden xl:flex flex-col">
                            <span className="font-bold text-sm text-black dark:text-white">Sign out</span>
                            <span className="text-gray-500 text-sm">@{userRole || 'user'}</span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}
