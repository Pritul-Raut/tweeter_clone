import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Verified } from 'lucide-react'

// Profile Page params typing
type ProfileProps = {
    params: Promise<{
        username: string
    }>
}

export default async function ProfilePage({ params }: ProfileProps) {
    const resolvedParams = await params;
    const username = resolvedParams.username;

    const supabase = await createClient();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md flex items-center p-2 space-x-6 border-b border-gray-100 dark:border-gray-800">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors ml-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current text-black dark:text-white"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg>
                </button>
                <div>
                    <h1 className="text-xl font-bold flex items-center space-x-1">
                        <span>{username}</span>
                        {/* Example of verified badge */}
                        <Verified className="w-5 h-5 text-blue-500 fill-current" />
                    </h1>
                    <p className="text-sm text-gray-500">123 posts</p>
                </div>
            </div>

            {/* Banner */}
            <div className="h-48 bg-gray-200 dark:bg-gray-800 w-full relative">
                {/* Banner image would go here */}
            </div>

            {/* Profile Info */}
            <div className="px-4 pb-4 border-b border-gray-100 dark:border-gray-800 relative">
                <div className="flex justify-between items-start">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-black bg-blue-100 -mt-16 flex items-center justify-center font-bold text-4xl text-blue-500 relative z-10 box-content">
                        {username.charAt(0).toUpperCase()}
                    </div>
                    <button className="mt-4 border border-gray-300 dark:border-gray-600 font-bold rounded-full px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                        Edit profile
                    </button>
                </div>

                <div className="mt-2">
                    <h1 className="text-xl font-extrabold">{username}</h1>
                    <p className="text-gray-500">@{username}</p>
                </div>

                <div className="mt-3">
                    <p>This is a sample bio for the Twitter clone user profile. Building awesome apps with Next.js!</p>
                </div>

                <div className="flex space-x-4 mt-4 text-gray-500">
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold text-black dark:text-white">1,234</span> Following
                    </div>
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold text-black dark:text-white">5,678</span> Followers
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex w-full border-b border-gray-100 dark:border-gray-800 font-bold">
                <div className="flex-1 text-center py-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer relative">
                    Posts
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center py-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer">
                    Replies
                </div>
                <div className="flex-1 text-center py-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer">
                    Media
                </div>
                <div className="flex-1 text-center py-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer">
                    Likes
                </div>
            </div>

            {/* User Posts Placeholder */}
            <div className="flex-1 flex flex-col">
                <div className="p-8 text-center text-gray-500">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">@{username} hasn't posted</h2 >
                    <p>When they do, their posts will show up here.</p>
                </div>
            </div>
        </div>
    )
}
