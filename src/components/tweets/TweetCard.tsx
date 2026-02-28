import { deleteTweet } from '@/app/actions/tweets'
import { Verified, Trash2 } from 'lucide-react'
import Link from 'next/link'

type TweetProps = {
    tweet: {
        _id: string
        content: string
        authorId: string
        authorUsername: string
        authorVerified: boolean
        createdAt: string
        likesCount: number
        repliesCount: number
        retweetsCount: number
    }
    currentUserRole?: string
    currentUserId?: string
}

export default function TweetCard({ tweet, currentUserRole, currentUserId }: TweetProps) {
    const isStaff = currentUserRole === 'admin' || currentUserRole === 'supervisor'
    const isAuthor = currentUserId === tweet.authorId

    return (
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors flex space-x-4">
            <Link href={`/${tweet.authorUsername}`} className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-500">
                    {tweet.authorUsername.charAt(0).toUpperCase()}
                </div>
            </Link>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <Link href={`/${tweet.authorUsername}`} className="font-bold hover:underline flex items-center space-x-1">
                            <span>{tweet.authorUsername}</span>
                            {tweet.authorVerified && <Verified className="w-4 h-4 text-blue-500 fill-current" />}
                        </Link>
                        <span className="text-gray-500">@{tweet.authorUsername}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 hover:underline">{tweet.createdAt}</span>
                    </div>

                    {/* Moderation / Delete Button */}
                    {(isStaff || isAuthor) && (
                        <form action={async () => {
                            "use server"
                            await deleteTweet(tweet._id)
                        }}>
                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete Tweet">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                </div>

                <Link href={`/tweet/${tweet._id}`}>
                    <p className="mt-1 whitespace-pre-wrap">{tweet.content}</p>
                </Link>

                {/* Interactions */}
                <div className="flex justify-between text-gray-500 mt-3 w-4/5 max-w-md">
                    <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors group">
                        <div className="p-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 rounded-full transition-colors">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        </div>
                        <span className="text-sm">{tweet.repliesCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 hover:text-green-500 transition-colors group">
                        <div className="p-2 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 rounded-full transition-colors">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                        </div>
                        <span className="text-sm">{tweet.retweetsCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 hover:text-pink-500 transition-colors group">
                        <div className="p-2 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 rounded-full transition-colors">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                        </div>
                        <span className="text-sm">{tweet.likesCount}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
