import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CreateTweet from '@/components/tweets/CreateTweet'
import TweetCard from '@/components/tweets/TweetCard'
import { getTweets } from '@/app/actions/tweets'

export const dynamic = 'force-dynamic';

export default async function Home() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const role = user.user_metadata?.role || 'user'
    const userInitial = (user.user_metadata?.username || user.email || 'U').charAt(0).toUpperCase()

    // Fetch tweets server-side
    const tweets = await getTweets()

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex justify-between items-center p-4">
                <h1 className="text-xl font-bold">Home</h1>
            </div>

            {/* Tweet Creation Area */}
            <CreateTweet userInitial={userInitial} />

            {/* Feed Area */}
            <div className="flex-1 flex flex-col">
                {tweets.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <h2 className="text-xl font-bold text-black dark:text-white mb-2">Welcome to X Clone!</h2>
                        <p>Be the first to post something amazing.</p>
                    </div>
                ) : (
                    tweets.map((tweet) => (
                        <TweetCard
                            key={tweet._id}
                            tweet={tweet}
                            currentUserRole={role}
                            currentUserId={user.id}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
