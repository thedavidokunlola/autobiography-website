import type { Metadata } from 'next'
import { biography } from '@/data/biography'
import { contactInfo } from '@/data/contact'
import { SocialLinks } from '@/components/SocialLinks'
import { OafCrest } from '@/components/CulturalElements'

// RULE-S3: en dash U+2013 separator with one space each side
export const metadata: Metadata = {
  title: `Contact \u2013 ${biography.name}`,
  description: `Contact ${biography.name} for official correspondence, press inquiries, and archive requests.`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `Contact \u2013 ${biography.name}`,
    description: `Contact ${biography.name} for official correspondence, press inquiries, and archive requests.`,
    images: [
      {
        url: 'https://example.com/og/og-default.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://example.com/contact',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact \u2013 ${biography.name}`,
    description: `Contact ${biography.name} for official correspondence, press inquiries, and archive requests.`,
    images: ['https://example.com/og/og-default.jpg'],
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-container mx-auto px-6 lg:px-12 pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 bg-crimson rounded-[2px]" />
          <span className="section-label text-crimson">
            Secretariat &amp; Liaison
          </span>
        </div>
        {/* RULE-A2: exactly one H1 per page */}
        <h1 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
          Contact Archive Desk
        </h1>
        <p className="font-playfair text-base sm:text-lg text-charcoal/80 leading-relaxed font-body">
          Official channels for press inquiries, university endowment partnerships, scholarship
          verification, and presidential memorial records.
        </p>
      </div>

      {/* RULE-P1: No form elements — mailto links and external handles only */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Email Card */}
        <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:border-gold transition-all">
          <div>
            <OafCrest className="w-10 h-10 mb-4" />
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-crimson block mb-1">
              Direct Inquiries
            </span>
            <h2 className="text-xl font-bold font-playfair text-charcoal mb-2">
              Official Email
            </h2>
            <p className="text-charcoal/80 text-sm leading-relaxed mb-6 font-body">
              For all institutional correspondence, media requests, and general foundation matters.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <a
              href={`mailto:${contactInfo.pressEmail}`}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-crimson hover:bg-deep-crimson text-ivory font-ui font-semibold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
            >
              Send Email ({contactInfo.pressEmail})
            </a>
          </div>
        </div>

        {/* Contact Person Card */}
        {contactInfo.contactPerson && (
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:border-gold transition-all">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-crimson block mb-1">
                Executive Leadership
              </span>
              <h2 className="text-xl font-bold font-playfair text-charcoal mb-2">
                Secretariat Lead
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6 font-body">
                Direct liaison with the Board of Trustees and endowment administrators.
              </p>
            </div>
            <div className="pt-4 border-t border-border">
              <span className="font-bold text-charcoal block text-base font-playfair">
                {contactInfo.contactPerson}
              </span>
              {contactInfo.role && (
                <span className="text-xs text-charcoal/70 font-ui font-medium block mt-0.5">
                  {contactInfo.role}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Phone Liaison Card */}
        {contactInfo.phone && (
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:border-gold transition-all">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-crimson block mb-1">
                Telephone Desk
              </span>
              <h2 className="text-xl font-bold font-playfair text-charcoal mb-2">
                Official Phone
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6 font-body">
                Available during standard Nigerian business hours (09:00 &ndash; 17:00 WAT).
              </p>
            </div>
            <div className="pt-4 border-t border-border">
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-base font-bold text-charcoal hover:text-crimson transition-colors focus-ring rounded font-ui"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
        )}

        {/* Website Card */}
        {contactInfo.website && (
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:border-gold transition-all">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-crimson block mb-1">
                Permanent Registry
              </span>
              <h2 className="text-xl font-bold font-playfair text-charcoal mb-2">
                Digital Domain
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6 font-body">
                Official domain maintaining permanent cryptographic archives and verified records.
              </p>
            </div>
            <div className="pt-4 border-t border-border font-ui">
              <a
                href={contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-crimson hover:underline focus-ring rounded flex items-center gap-1"
              >
                <span>{contactInfo.website.replace('https://', '')} &rarr;</span>
                {/* RULE-A4: sr-only span is required pattern, not aria-label */}
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </div>
        )}

        {/* Office Address Card — RULE-P10: plain text only, no map embed */}
        {contactInfo.officeAddress && (
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:border-gold transition-all md:col-span-2">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-crimson block mb-1">
                Physical Presence
              </span>
              <h2 className="text-xl font-bold font-playfair text-charcoal mb-2">
                Secretariat &amp; Liaison Offices
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-4 font-body">
                Official offices for physical submissions, archival inspection, and trustee meetings.
              </p>
            </div>
            <div className="pt-4 border-t border-border">
              <address className="text-charcoal text-sm not-italic whitespace-pre-line leading-relaxed font-ui">
                {contactInfo.officeAddress}
              </address>
            </div>
          </div>
        )}
      </div>

      {/* Social media channels if present */}
      {contactInfo.socials.length > 0 && (
        <div className="mt-12 p-8 bg-white rounded-3xl border border-border shadow-sm">
          <h2 className="text-lg font-bold font-playfair text-charcoal mb-4">
            Follow &amp; Public Broadcasts
          </h2>
          <SocialLinks socials={contactInfo.socials} location="contact_page" />
        </div>
      )}
    </div>
  )
}
