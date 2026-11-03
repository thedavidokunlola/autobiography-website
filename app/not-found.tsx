import type { Metadata } from 'next'
import Link from 'next/link'

// RULE-S2: 404 page carries noindex meta
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="max-w-container mx-auto px-6 lg:px-12 pt-28 lg:pt-36 pb-24 flex items-center justify-center">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-border shadow-lg text-center max-w-lg w-full">
        <span className="font-ui text-xs font-bold uppercase tracking-widest text-crimson block mb-2">
          404 &bull; RECORD NOT LOCATED
        </span>
        <h1 className="text-3xl font-bold font-playfair text-charcoal mb-3">
          Archival Record Not Found
        </h1>
        <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed mb-6">
          The requested document or page does not exist or may have been relocated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-crimson hover:bg-deep-crimson text-ivory font-ui font-semibold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
          >
            Return to Home
          </Link>
          <Link
            href="/press"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-ivory hover:bg-white text-charcoal border border-border font-ui font-semibold text-xs uppercase tracking-wider transition-all focus-ring"
          >
            Press Archive
          </Link>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-center gap-4 text-xs font-ui text-charcoal/70">
          <Link href="/work" className="hover:text-crimson transition-colors focus-ring rounded">
            Civic Work
          </Link>
          <span>&bull;</span>
          <Link href="/contact" className="hover:text-crimson transition-colors focus-ring rounded">
            Contact Desk
          </Link>
        </div>
      </div>
    </div>
  )
}
