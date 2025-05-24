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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen bg-background">
            <Navigation />
            <Suspense>
              <main>{children}</main>
            </Suspense>
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
