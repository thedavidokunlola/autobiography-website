import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { biography } from '@/data/biography'
import { contactInfo } from '@/data/contact'
import '@/styles/globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: `${biography.name} \u2013 ${biography.tagline}`,
  description: `The official website of ${biography.name}. Honouring the legacy of ${biography.personName} through intellectual excellence, good governance and national development.`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `${biography.name} \u2013 ${biography.tagline}`,
    description: `The official website of ${biography.name}. Honouring the legacy of ${biography.personName} through intellectual excellence, good governance and national development.`,
    images: [
      {
        url: 'https://example.com/og/og-default.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://example.com/',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${biography.name} \u2013 ${biography.tagline}`,
    description: `The official website of ${biography.name}. Honouring the legacy of ${biography.personName} through intellectual excellence, good governance and national development.`,
    images: ['https://example.com/og/og-default.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header siteName={biography.name} pressEmail={contactInfo.pressEmail} />
        <main className="flex-1">{children}</main>
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
