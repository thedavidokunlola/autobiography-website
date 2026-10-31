import Link from 'next/link'
import { contactInfo } from '@/data/contact'
import { biography } from '@/data/biography'
import { OafCrest, AdireDivider } from './CulturalElements'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-crimson text-ivory/80 pt-16 pb-12 border-t border-gold/20">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-ivory/10">
          {/* Column 1 — Identity & The Credo (Placement 5) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <OafCrest className="w-10 h-10" light={true} />
              <div>
                <span className="font-playfair font-bold text-lg text-ivory block leading-none">
                  Dr. Olusegun Kokumo Agagu CON
                </span>
                <span className="font-playfair italic text-xs text-gold-light/90 block mt-1">
                  16 February 1948 &ndash; 13 September 2013
                </span>
              </div>
            </div>

            {/* Adire Pattern Divider */}
            <AdireDivider className="my-3 opacity-60" />

            {/* Credo Placement 5 — The Site's Final Word (Small, Quiet, Modest) */}
            <p className="font-playfair italic text-sm text-gold-light">
              &ldquo;To leave things better than he met them.&rdquo;
            </p>
          </div>

          {/* Column 2 — Quick Navigation (No redundant heading) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 font-ui text-xs">
            <Link href="/#hero" className="text-ivory hover:text-gold transition-colors py-0.5">
              Home
            </Link>
            <Link href="/#the-man" className="text-ivory hover:text-gold transition-colors py-0.5">
              The Man
            </Link>
            <Link href="/#the-journey" className="text-ivory hover:text-gold transition-colors py-0.5">
              The Journey
            </Link>
            <Link href="/#the-foundation" className="text-ivory hover:text-gold transition-colors py-0.5">
              The Foundation
            </Link>
            <Link href="/#legacy" className="text-ivory hover:text-gold transition-colors py-0.5">
              Legacy
            </Link>
            <Link href="/#apply-support" className="text-gold font-medium hover:text-gold-light transition-colors py-0.5">
              Apply / Support
            </Link>
            <Link href="/#contact" className="text-ivory hover:text-gold transition-colors py-0.5">
              Contact
            </Link>
          </div>

          {/* Column 3 — Foundation Info */}
          <div className="lg:col-span-4 flex flex-col gap-2 font-ui text-xs">
            <span className="font-ui font-semibold text-ivory block text-sm">
              {biography.name}
            </span>
            <span className="text-ivory/60 block">Established 2014 &bull; Keeping the Legacy Alive</span>

            <div className="space-y-1.5 pt-2 text-ivory/80">
              <p>
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {contactInfo.website.replace('https://', '')}
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </p>
              <p>
                <a href={`mailto:${contactInfo.pressEmail}`} className="hover:text-gold transition-colors">
                  {contactInfo.pressEmail}
                </a>
              </p>
              {contactInfo.phone && (
                <p>
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-gold transition-colors">
                    {contactInfo.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Adire Pattern Divider above bottom bar */}
        <AdireDivider className="my-6 opacity-40" />

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-ui text-ivory/60">
          <span>&copy; {currentYear} The Olusegun Agagu Foundation. All rights reserved.</span>
          <span className="font-playfair italic text-ivory/70">A tribute to a life in service.</span>
        </div>
      </div>
    </footer>
  )
}
