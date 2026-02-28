'use client'

import { useState } from 'react'

import { createTweet } from '@/app/actions/tweets'

export default function CreateTweet({ userInitial }: { userInitial: string }) {
    const [content, setContent] = useState('')
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        setIsPending(true)
        try {
            await createTweet(content)
            setContent('')
        } catch (error) {
            console.error('Failed to create tweet', error)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center font-bold text-blue-500">
                {userInitial}
            </div>
            <form onSubmit={handleSubmit} className="flex-1">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none resize-none pt-2"
                    placeholder="What is happening?!"
                    rows={2}
                    maxLength={280}
                />
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex space-x-2 text-blue-500">
                        {/* Media Icons */}
                        <button type="button" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors tooltip" aria-label="Add photo/video">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className={`text-sm ${content.length > 260 ? 'text-red-500' : 'text-gray-400'}`}>
                            {content.length > 0 && `${content.length}/280`}
                        </span>
                        <button
                            type="submit"
                            disabled={isPending || content.length === 0 || content.length > 280}
                            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-full px-5 py-2 transition-colors"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
