import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, UserCheck, Trash2, Home, LogOut } from 'lucide-react'
import { signout } from '@/app/actions/auth'

export default async function StaffDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/staff/login')
    }

    const role = user.user_metadata?.role || 'user'
    if (role !== 'admin' && role !== 'supervisor') {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center space-x-3">
                    <ShieldCheck className={`w-8 h-8 ${role === 'admin' ? 'text-red-500' : 'text-blue-500'}`} />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Staff Portal</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{role}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-gray-500 hover:text-blue-500 transition-colors flex items-center space-x-1 font-medium bg-gray-50 px-3 py-1.5 rounded-full">
                        <Home className="w-4 h-4" />
                        <span>Main App</span>
                    </Link>
                    <form action={signout}>
                        <button className="text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-1 font-medium bg-gray-50 px-3 py-1.5 rounded-full">
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Verification Module */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-blue-50/30">
                            <h2 className="text-xl font-bold flex items-center text-gray-900">
                                <UserCheck className="w-6 h-6 mr-2 text-blue-500" />
                                User Verification queue
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">Review accounts requesting verified badges.</p>
                        </div>

                        <div className="p-0">
                            {/* Dummy List */}
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex justify-between items-center p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-500">
                                            U{item}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">User Name {item}</h3>
                                            <p className="text-gray-500 text-sm">@username{item}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                                            Reject
                                        </button>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm transition-colors flex items-center">
                                            <ShieldCheck className="w-4 h-4 mr-1" /> Approve
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 text-center">
                                <button className="text-blue-500 font-semibold text-sm hover:underline">View all requests</button>
                            </div>
                        </div>
                    </div>

                    {/* Content Moderation Module */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-red-50/30">
                            <h2 className="text-xl font-bold flex items-center text-gray-900">
                                <Trash2 className="w-6 h-6 mr-2 text-red-500" />
                                Reported Content
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">Review flagged tweets and take action.</p>
                        </div>

                        <div className="p-0">
                            {/* Dummy Reports */}
                            {[1, 2].map((item) => (
                                <div key={item} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors flex flex-col space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">Hate Speech</span>
                                            <span className="text-gray-400 text-xs ml-2">Reported 2h ago</span>
                                        </div>
                                        <button className="text-red-500 hover:text-red-600 font-semibold text-sm bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center">
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete Post
                                        </button>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 text-sm relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-xl"></div>
                                        "This is an example of a tweet that requires moderation. It has been reported multiple times by users."
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
