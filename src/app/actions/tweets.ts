'use server'

import clientPromise from '@/lib/mongodb'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import { encryptText, decryptText } from '@/lib/encryption'

export async function createTweet(content: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const client = await clientPromise
    const db = client.db('twitter_clone')
    const tweetsCollection = db.collection('tweets')

    const newTweet = {
        content: encryptText(content),
        authorId: user.id,
        authorUsername: user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown',
        authorVerified: user.user_metadata?.is_verified || false,
        createdAt: new Date(),
        likesCount: 0,
        repliesCount: 0,
        retweetsCount: 0,
    }

    await tweetsCollection.insertOne(newTweet)
    revalidatePath('/')

    return { success: true }
}

export async function getTweets() {
    const client = await clientPromise
    const db = client.db('twitter_clone')
    const tweetsCollection = db.collection('tweets')

    const tweets = await tweetsCollection.find({}).sort({ createdAt: -1 }).limit(50).toArray()

    return tweets.map(tweet => ({
        _id: tweet._id.toString(),
        content: decryptText(tweet.content),
        authorId: tweet.authorId,
        authorUsername: tweet.authorUsername,
        authorVerified: tweet.authorVerified,
        createdAt: new Date(tweet.createdAt).toLocaleDateString() + ' ' + new Date(tweet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likesCount: tweet.likesCount,
        repliesCount: tweet.repliesCount,
        retweetsCount: tweet.retweetsCount,
    }))
}

export async function deleteTweet(tweetId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const role = user.user_metadata?.role || 'user'
    const isStaff = role === 'admin' || role === 'supervisor'

    const client = await clientPromise
    const db = client.db('twitter_clone')
    const tweetsCollection = db.collection('tweets')

    const tweet = await tweetsCollection.findOne({ _id: new ObjectId(tweetId) })

    if (!tweet) {
        throw new Error('Tweet not found')
    }

    // Only author or staff can delete
    if (tweet.authorId !== user.id && !isStaff) {
        throw new Error('Forbidden')
    }

    await tweetsCollection.deleteOne({ _id: new ObjectId(tweetId) })
    revalidatePath('/')
    revalidatePath(`/${tweet.authorUsername}`)

    return { success: true }
}
