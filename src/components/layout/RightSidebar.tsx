'use client'

import { Search } from 'lucide-react'

export default function RightSidebar() {
    return (
        <div className="hidden lg:block w-80 h-screen sticky top-0 p-4 border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
            {/* Search Bar */}
            <div className="relative group mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-500 group-focus-within:text-blue-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search Twitter"
                    className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-full w-full py-3 pr-4 pl-12 focus:outline-none focus:bg-white dark:focus:bg-black focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500 transition-all"
                />
            </div>

            {/* What's happening block */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl pt-4 pb-2 mb-6">
                <h2 className="font-extrabold text-xl px-4 pb-4 border-b border-gray-200 dark:border-gray-800 text-black dark:text-white">
                    What's happening
                </h2>

                {/* News Item 1 */}
                <div className="py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                        <div className="text-gray-500 text-xs">Technology • Trending</div>
                        <div className="text-gray-500">...</div>
                    </div>
                    <div className="font-bold text-black dark:text-white mt-1">Next.js 15 Released</div>
                    <div className="text-gray-500 text-sm mt-1">10.5K posts</div>
                </div>

                {/* News Item 2 */}
                <div className="py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                        <div className="text-gray-500 text-xs">Entertainment • Trending</div>
                        <div className="text-gray-500">...</div>
                    </div>
                    <div className="font-bold text-black dark:text-white mt-1">Dune: Part Two</div>
                    <div className="text-gray-500 text-sm mt-1">45.2K posts</div>
                </div>

                <div className="py-4 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-b-2xl">
                    <span className="text-blue-500 hover:text-blue-600">Show more</span>
                </div>
            </div>

            {/* Who to follow block */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl pt-4 pb-2">
                <h2 className="font-extrabold text-xl px-4 pb-4 border-b border-gray-200 dark:border-gray-800 text-black dark:text-white">
                    Who to follow
                </h2>

                {/* Suggestion 1 */}
                <div className="py-3 px-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-500">
                            V
                        </div>
                        <div className="ml-3">
                            <div className="font-bold text-black dark:text-white hover:underline">Vercel</div>
                            <div className="text-gray-500 text-sm">@vercel</div>
                        </div>
                    </div>
                    <button className="bg-black dark:bg-white text-white dark:text-black font-bold rounded-full px-4 py-1.5 text-sm hover:opacity-80 transition-opacity">
                        Follow
                    </button>
                </div>

                <div className="py-4 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-b-2xl">
                    <span className="text-blue-500 hover:text-blue-600">Show more</span>
                </div>
            </div>

        </div>
    )
}
