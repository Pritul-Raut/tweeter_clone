export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-3xl mix-blend-multiply"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-100/40 blur-3xl mix-blend-multiply"></div>
            </div>
            <div className="z-10 bg-white/80 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-4">
                {children}
            </div>
        </div>
    )
}
