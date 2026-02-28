import Sidebar from '@/components/layout/Sidebar'
import RightSidebar from '@/components/layout/RightSidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Find user role, default to user
    const userRole = user?.user_metadata?.role || 'user'

    return (
        <div className="max-w-7xl mx-auto flex min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <Sidebar userRole={userRole} />
            <main className="flex-1 min-h-screen border-r border-gray-100 dark:border-gray-800">
                {children}
            </main>
            <RightSidebar />
        </div>
    )
}
