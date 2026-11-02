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
  title: 'Home | Dr. Olusegun Kokumo Agagu, CON',
  description: `The official website of ${biography.name}. Honouring the legacy of ${biography.personName} through intellectual excellence, good governance and national development.`,
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
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
      <head>
        {/* Suppress unhandled errors from conflicting third-party browser extensions (e.g. EVM wallet evmMask.js) in dev mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                var isExtensionErr = function(msg, file, stack) {
                  return (
                    (msg && (msg.indexOf('ethereum') !== -1 || msg.indexOf('redefine property') !== -1)) ||
                    (file && file.indexOf('chrome-extension://') !== -1) ||
                    (stack && stack.indexOf('chrome-extension://') !== -1)
                  );
                };
                window.addEventListener('error', function(e) {
                  if (isExtensionErr(e.message, e.filename, e.error && e.error.stack)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  var reason = e.reason || {};
                  if (isExtensionErr(reason.message, '', reason.stack)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#140b0a]">
        <Header siteName={biography.name} pressEmail={contactInfo.pressEmail} />
        <main className="flex-1 bg-[#140b0a]">{children}</main>
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
