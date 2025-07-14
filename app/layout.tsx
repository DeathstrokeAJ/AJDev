import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adithya Parambil | Full Stack Developer & Mobile App Developer",
  description:
    "Portfolio of Adithya Parambil - Full Stack Developer, Mobile App Developer, and React/React Native Specialist",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Full-Stack Developer Portfolio - Adithya Parambil" />
        <meta property="og:title" content="Adithya Parambil - Full Stack Developer Portfolio" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen bg-background">
            <Navigation />
            <Suspense>
              <main>{children}</main>
            </Suspense>
            <Analytics />
          </div>
          <footer className="w-full border-t border-border bg-card py-6 mt-12 flex flex-col items-center gap-3">
            <div className="flex gap-4 mb-2">
              <a href="mailto:adithyaj2910@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-mail w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4h16v16H4z" stroke="none"/><path d="M22 6.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.5m20 0A2 2 0 0 0 20 4H4a2 2 0 0 0-2 2.5m20 0v.01c0 .38-.22.72-.56.88l-7.44 4.13a2 2 0 0 1-1.96 0L2.56 7.39A.997.997 0 0 1 2 6.51V6.5"/></svg>
              </a>
              <a href="https://github.com/DeathstrokeAJ" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-github w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="https://linkedin.com/in/adithya-parambil" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-linkedin w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-5a6 6 0 0 1 6-6z"/><circle cx="8" cy="8" r="2"/></svg>
              </a>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Built with 💻 Next.js + Tailwind CSS | Hosted on Vercel
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
