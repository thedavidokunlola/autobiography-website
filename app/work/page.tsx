import type { Metadata } from 'next'
import { biography } from '@/data/biography'
import { workEntries } from '@/data/work'
import { WorkCategory } from '@/components/WorkCategory'

// RULE-S3: en dash U+2013 separator with one space each side
export const metadata: Metadata = {
  title: `Work \u2013 ${biography.name}`,
  description: `${biography.name}'s record of civic commitments and public service.`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `Work \u2013 ${biography.name}`,
    description: `${biography.name}'s record of civic commitments and public service.`,
    images: [
      {
        url: 'https://example.com/og/og-default.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://example.com/work',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Work \u2013 ${biography.name}`,
    description: `${biography.name}'s record of civic commitments and public service.`,
    images: ['https://example.com/og/og-default.jpg'],
  },
}

const CATEGORIES = ['Foundation', 'NGO', 'Advisory Role'] as const

export default function WorkPage() {
  // RULE-P7: no filters, no search. Fully static and read-only.
  return (
    <div className="max-w-container mx-auto px-6 lg:px-12 pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 bg-crimson rounded-[2px]" />
          <span className="section-label text-crimson">
            Civic History &amp; Service
          </span>
        </div>
        {/* RULE-A2: exactly one H1 per page */}
        <h1 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
          Civic &amp; Philanthropic History
        </h1>
        <p className="font-playfair text-base sm:text-lg text-charcoal/80 leading-relaxed font-body">
          {biography.name}&apos;s verified record of foundation stewardship, NGO partnerships, and
          high-level advisory governance.
        </p>
      </div>

      {/* Condition 4: if entire work data file is empty (RULE-P8) */}
      {workEntries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-border p-12 text-center max-w-xl mx-auto">
          <p className="font-playfair italic text-text-secondary text-base sm:text-lg">
            Work history coming soon.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const categoryEntries = workEntries
              .filter((entry) => entry.category === category)
              // RULE-D2: sort by raw "YYYY-MM" startDate (lexicographic = chronological), most recent first
              .sort((a, b) => b.startDate.localeCompare(a.startDate))

            // RULE-P8: WorkCategory handles zero-entry case internally (returns null)
            return (
              <WorkCategory
                key={category}
                category={category}
                entries={categoryEntries}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
