import Link from 'next/link'
import { contactInfo } from '@/data/contact'
import { OafCrest, AdireDivider } from './CulturalElements'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0e0706] text-white/70 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Left Brand & Creed (Placement 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 p-1.5 flex items-center justify-center">
                <OafCrest className="w-full h-full object-contain" light={true} />
              </div>
              <div>
                <span className="text-white font-bold text-lg block leading-none font-display">
                  The Olusegun Agagu Foundation
                </span>
                <span className="text-tertiary text-[10px] tracking-widest uppercase font-semibold font-ui">
                  Memorial Archive &amp; Presidential Trust
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-md leading-relaxed mt-2 font-body">
              Perpetuating the intellectual scholarship, governance tenets, and philanthropic endowments of Dr. Olusegun Kokumo Agagu for future generations of public leaders.
            </p>

            {/* Credo Placement 5 — Framed Credo */}
            <div className="p-4 bg-white/5 rounded-2xl border-l-2 border-brand-red mt-2">
              <blockquote className="text-xs italic font-serif text-white/90">
                &ldquo;To leave things better than we met them.&rdquo;
              </blockquote>
              <span className="block text-[10px] uppercase font-bold text-tertiary tracking-widest mt-1 font-ui">
                &mdash; H.E. Dr. Olusegun Kokumo Agagu, CON
              </span>
            </div>
          </div>

          {/* Middle Column: Archive Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-ui">
              Archive Navigation
            </h3>
            <div className="flex flex-col gap-2.5 text-xs font-ui">
              <Link href="/#about" className="hover:text-white transition-colors focus-ring rounded">
                Biographical Memoirs
              </Link>
              <Link href="/#foundation" className="hover:text-white transition-colors focus-ring rounded">
                The Foundation &amp; 8 Focal Areas
              </Link>
              <Link href="/#impact" className="hover:text-white transition-colors focus-ring rounded">
                Impact &amp; Endowments
              </Link>
              <Link href="/#lectures" className="hover:text-white transition-colors focus-ring rounded">
                Annual Memorial Lectures
              </Link>
              <Link href="/#board" className="hover:text-white transition-colors focus-ring rounded">
                Board of Trustees &amp; Governance
              </Link>
              <Link href="/#initiatives" className="hover:text-white transition-colors focus-ring rounded">
                Future Initiatives
              </Link>
              <Link href="/work" className="hover:text-white transition-colors focus-ring rounded">
                Civic History &amp; Endowments
              </Link>
              <Link href="/press" className="hover:text-white transition-colors focus-ring rounded">
                Press &amp; Media Archive
              </Link>
              <Link href="/#tribute" className="text-tertiary hover:underline transition-colors focus-ring rounded">
                Digital Book of Condolences &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Secretariat & Inquiries */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-ui">
              Secretariat &amp; Offices
            </h3>
            <div className="text-xs space-y-2 text-white/70 font-ui">
              <p>
                <strong className="text-white">Ibadan Secretariat:</strong> Bodija Estate, Ibadan, Oyo State, Nigeria
              </p>
              <p>
                <strong className="text-white">Akure Liaison:</strong> Alagbaka GRA, Akure, Ondo State, Nigeria
              </p>
              <p>
                <strong className="text-white">Official Email:</strong>{' '}
                <a href={`mailto:${contactInfo.pressEmail}`} className="text-tertiary hover:underline focus-ring rounded">
                  {contactInfo.pressEmail}
                </a>
              </p>
              {contactInfo.phone && (
                <p>
                  <strong className="text-white">Telephone Desk:</strong>{' '}
                  <a href={`tel:${contactInfo.phone}`} className="text-white/90 hover:underline focus-ring rounded">
                    {contactInfo.phone}
                  </a>
                </p>
              )}
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${contactInfo.pressEmail}?subject=Institutional%20Inquiry%20%E2%80%93%20OAF`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-red hover:bg-[#c41e15] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md focus-ring"
              >
                Inquire With Secretariat &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Adire Pattern Divider above bottom row */}
        <div className="my-8">
          <AdireDivider className="opacity-40" />
        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase font-semibold tracking-wider text-white/50 font-ui">
          <span>&copy; {currentYear} The Olusegun Agagu Foundation (OAF). All Rights Reserved.</span>
          <span>A Living Memorial &amp; Endowed Archival Trust</span>
        </div>
      </div>
    </footer>
  )
}
