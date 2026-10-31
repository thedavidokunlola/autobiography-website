import type { Metadata } from 'next'
import Link from 'next/link'

// RULE-S2: 404 page carries noindex meta
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="max-w-container mx-auto px-6 lg:px-12 pt-28 lg:pt-36 pb-24 flex items-center justify-center">
      <div className="bg-white p-12 rounded-3xl border border-border shadow-lg text-center max-w-lg w-full">
        <span className="font-ui text-xs font-bold uppercase tracking-widest text-crimson block mb-2">
          404 &bull; ARCHIVE RECORD NOT FOUND
        </span>
        <h1 className="text-3xl font-bold font-playfair text-charcoal mb-3">
          Page Not Located
        </h1>
        <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed mb-8">
          The requested archival document, directory route, or plate does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-crimson hover:bg-deep-crimson text-ivory font-ui font-semibold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
        >
          Return to Archive Home
        </Link>
      </div>
    </div>
  )
}
