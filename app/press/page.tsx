import type { Metadata } from 'next'
import { biography } from '@/data/biography'
import { pressEntries } from '@/data/press'
import { PressPageClient } from './page.client'

// RULE-S3: en dash U+2013 separator with one space each side
export const metadata: Metadata = {
  title: `Press \u2013 ${biography.name}`,
  description: `A complete archive of media coverage featuring ${biography.name}.`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `Press \u2013 ${biography.name}`,
    description: `A complete archive of media coverage featuring ${biography.name}.`,
    images: [
      {
        url: 'https://example.com/og/og-default.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://example.com/press',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Press \u2013 ${biography.name}`,
    description: `A complete archive of media coverage featuring ${biography.name}.`,
    images: ['https://example.com/og/og-default.jpg'],
  },
}

export default function PressPage() {
  // RULE-D5: sort entries by ISO date descending (newest first)
  const sortedEntries = [...pressEntries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="max-w-container mx-auto px-6 lg:px-12 pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 bg-crimson rounded-[2px]" />
          <span className="section-label text-crimson">
            Media &amp; Public Records
          </span>
        </div>
        {/* RULE-A2: exactly one H1 per page */}
        <h1 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
          Press Archive
        </h1>
        <p className="font-playfair text-base sm:text-lg text-charcoal/80 leading-relaxed font-body">
          Chronological media coverage, policy announcements, and verified public records documenting
          the ongoing legacy and activities of {biography.name}.
        </p>
      </div>

      <PressPageClient entries={sortedEntries} />
    </div>
  )
}
