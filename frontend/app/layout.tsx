import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {/* Global Navbar for Auth state */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 backdrop-blur-md bg-white/50 dark:bg-black/50">
            <div className="font-black text-xl tracking-tighter italic">BRAIN.AI</div>
            <div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-zinc-900 text-white px-5 py-2 rounded-full font-bold hover:bg-zinc-700 transition-all">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}