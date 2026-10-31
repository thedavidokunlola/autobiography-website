import type { Metadata } from 'next'
import Image from 'next/image'
import { biography } from '@/data/biography'
import { trustees } from '@/data/trustees'
import { contactInfo } from '@/data/contact'
import { AdireDivider, AdireBackground, FilaSilhouette, OafCrest } from '@/components/CulturalElements'
import { PowerCounter } from '@/components/PowerCounter'
import { ScholarTimeline } from '@/components/ScholarTimeline'
import { MemorialLectureStrip } from '@/components/MemorialLectureStrip'
import { ScholarVoices } from '@/components/ScholarVoices'
import { GalleryLightbox } from '@/components/GalleryLightbox'

// RULE-S3: en dash U+2013 separator with one space each side
export const metadata: Metadata = {
  title: `${biography.personName} \u2013 Presidential Memorial Archive`,
  description: `Official Presidential Memorial Archive & Foundation for ${biography.personName} (1948\u20132013). Renowned petroleum geologist, Federal Minister, 2nd Executive Governor of Ondo State.`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `${biography.personName} \u2013 Presidential Memorial Archive`,
    description: `Official Presidential Memorial Archive & Foundation for ${biography.personName} (1948\u20132013). Renowned petroleum geologist, Federal Minister, 2nd Executive Governor of Ondo State.`,
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
    title: `${biography.personName} \u2013 Presidential Memorial Archive`,
    description: `Official Presidential Memorial Archive & Foundation for ${biography.personName}.`,
    images: ['https://example.com/og/og-default.jpg'],
  },
}

// RULE-S1: Person JSON-LD schema — canonical URL in url, external profiles in sameAs
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: biography.personName,
  url: 'https://example.com/',
  description: biography.tagline,
  birthDate: '1948-02-16',
  deathDate: '2013-09-13',
  sameAs: contactInfo.socials.map((s) => s.url),
}

export default function HomePage() {
  return (
    <>
      {/* RULE-S1: Person JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO: THE OPENING */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-screen bg-crimson text-ivory flex items-center overflow-hidden pt-20"
      >
        <div className="w-full h-full flex flex-col lg:flex-row min-h-[92vh]">
          {/* Left Zone (58% desktop): Crimson Textured Background with 8% OAF Watermark */}
          <div className="w-full lg:w-[58%] px-6 sm:px-10 lg:px-16 py-12 lg:py-20 flex flex-col justify-center relative z-10">
            {/* OAF Crest Watermark at 8% opacity */}
            <div
              className="absolute right-4 bottom-4 w-96 h-96 pointer-events-none opacity-[0.08] text-gold"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L3 6V12C3 17.5 6.8 22.7 12 24C17.2 22.7 21 17.5 21 12V6L12 2Z" />
              </svg>
            </div>

            {/* Sub-headline */}
            <span className="font-ui font-medium text-gold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              Geologist &bull; Statesman &bull; Governor &bull; Builder of Nations
            </span>

            {/* RULE-A2: exactly one H1 per page */}
            <h1 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-[3.2rem] text-ivory leading-[1.1] mb-2 tracking-tight">
              Dr. Olusegun Kokumo Agagu CON
            </h1>

            {/* Dates in Playfair italic ivory */}
            <p className="font-playfair italic text-gold-light text-base sm:text-lg mb-6">
              16 February 1948 &ndash; 13 September 2013
            </p>

            {/* Credo Placement 1: Gold italic between thin gold rules */}
            <div className="my-4 py-3 border-y border-gold/40 max-w-xl">
              <blockquote className="font-playfair italic text-lg sm:text-xl text-gold-light leading-relaxed">
                &ldquo;To leave things better than he met them.&rdquo;
              </blockquote>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 my-6">
              <a
                href="#the-man"
                className="px-7 py-3 rounded-full bg-gold hover:bg-gold-light text-charcoal font-ui font-semibold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
              >
                Explore His Life
              </a>
              <a
                href="#the-foundation"
                className="px-7 py-3 rounded-full border border-ivory/60 hover:border-ivory text-ivory font-ui font-semibold text-xs uppercase tracking-wider transition-all focus-ring"
              >
                Visit the Foundation
              </a>
            </div>

            {/* Three Stat Chips in Gold-Outlined Capsules */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-ivory/15">
              <span className="px-3.5 py-1.5 rounded-full border border-gold/50 text-[11px] font-ui text-ivory/90 bg-black/15">
                Governor of Ondo State 2003&ndash;2009
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-gold/50 text-[11px] font-ui text-ivory/90 bg-black/15">
                Federal Minister: Aviation &amp; Power
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-gold/50 text-[11px] font-ui text-ivory/90 bg-black/15">
                Deputy Governor 1992
              </span>
            </div>
          </div>

          {/* Right Zone (42% desktop): Portrait Photograph with Warm CSS Filter & Gold Frame */}
          <div className="w-full lg:w-[42%] relative flex items-center justify-center p-6 lg:p-10 bg-deep-crimson/50">
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold/40 shadow-2xl group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIPECvsJpvYgoRST1FZfWB1eXmmON9fG3faID-CV55j_FKp8IWk3fWoPj3b-Ixr2eERC8S17MOkHhLPeI0ZiU3YDI7IJaUZlEgx3FBMf3QuU6qmf0Kt3fcGYqnQ77rCNPFZApmpTrVltqx36OpU9P4Td3ZNaPOuCEywH1hRbhVrAdj_W_nfMOafm6Woi91wO9vP7_yOUzj9E6P9H3W3tifeXOPyrJ1bAUNvDyhojdB"
                alt="Portrait of Dr. Olusegun Kokumo Agagu CON in presidential regalia"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top portrait-filter transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-5 left-5 right-5 text-ivory">
                <span className="font-ui text-[10px] tracking-widest uppercase font-semibold text-gold block">
                  Official Archival Plate
                </span>
                <span className="font-playfair text-sm text-ivory/90">
                  H.E. Dr. Olusegun Kokumo Agagu CON
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — THE MAN: PERSON AND FAMILY */}
      {/* ========================================================================= */}
      <section id="the-man" className="py-24 bg-ivory text-charcoal">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Candid Smiling Portrait, Family Tribute & Reserved Space */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden shadow-lg bg-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiu2zYUfMG9UhDYBlVltXMsFvqKDA7aExcLuSXS0EIDec5-Sg6pNg3v_Q0uLyDzMIOvelC_F-Z71bGMFSqjPqwN5J_Ws4TxtTtpCM9DbyBH8GCunLHeS8auDqZ31u7ixfpv648bkdt6IeDdii2R57ehgoQPxk1dwcZYkd-jhqs5XOYOsZU8ieL3FOw-D5Tp1C6jI1dajQs67rMzbDZzJCkZeBfzrZz5mE9FaFo0hB-"
                  alt="Candid Smiling Portrait of Dr. Olusegun Agagu in beige buba"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top portrait-filter"
                />
              </div>

              <span className="font-playfair italic text-gold text-sm block">
                Born, Ondo State &bull; 16 February 1948
              </span>

              {/* Elevated Family Tribute Block */}
              <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                <blockquote className="font-playfair text-[1.18rem] text-crimson leading-snug mb-2 font-medium">
                  &ldquo;Married to his school sweetheart and dance partner, Mrs. Olufunke Agagu, for more
                  than 39 years.&rdquo;
                </blockquote>
                <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block">
                  Three children &bull; Seven grandchildren
                </span>
              </div>

              {/* Reserved Space for Mrs. Agagu's Future Words */}
              <div className="p-6 bg-ivory rounded-2xl border-2 border-dashed border-crimson/40 text-center">
                <p className="font-playfair italic text-text-secondary text-sm">
                  &ldquo;This space is reserved for her words, when she is ready to share them.&rdquo;
                </p>
                <span className="font-ui text-[10px] uppercase tracking-widest text-text-secondary/70 block mt-2">
                  Family Memorial Archive
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Bio Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="section-label text-crimson block">WHO HE WAS</span>

              <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-charcoal leading-[1.2]">
                A Life Defined By Quiet Resolve, Family Devotion &amp; Human Elevation
              </h2>

              <div className="space-y-5 text-base sm:text-[1.05rem] text-charcoal/90 leading-[1.85] font-body">
                <p>
                  Beyond the corridors of regional and federal power, Olusegun Agagu was by instinct a
                  scholar, a builder, and a mentor. Raised with unyielding Ikale discipline in Okitipupa, his
                  temperament was shaped by patient observation and profound empathy. He possessed a rare
                  intellectual resourcefulness that elevated every institution he touched.
                </p>

                <p>
                  His daily choices were guided by an unwavering life philosophy: that no office, wealth, or
                  privilege had meaning unless it served to uplift fellow human beings. Whether lecturing at
                  the University of Ibadan, designing fiscal masterplans for Ondo State, or opening his home to
                  young students, he lived his personal creed in quiet, consistent deeds.
                </p>

                <p className="border-l-2 border-crimson pl-4 text-charcoal font-medium">
                  His passing on 13 September 2013 came as a massive shock to the nation. Yet the
                  architectural foundations he laid in education, civic infrastructure, and public integrity
                  remain immutable monuments to a life consecrated to service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2B — CULTURAL INTERLUDE: ONDO SON */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-crimson text-ivory overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Subtle Adire Pattern Background (6% opacity) */}
        <AdireBackground className="absolute inset-0 pointer-events-none opacity-[0.06]" />

        <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Traditional Fila (Cap) Silhouette SVG */}
          <div className="mb-4 text-gold" aria-hidden="true">
            <FilaSilhouette className="w-20 h-14" />
          </div>

          <h2 className="font-playfair font-normal text-2xl sm:text-3xl lg:text-[2.4rem] text-ivory leading-snug mb-5">
            Ondo Son. Nigerian Leader. African Visionary.
          </h2>

          <div className="space-y-4 max-w-xl text-base sm:text-lg font-playfair italic text-gold-light leading-relaxed">
            <p>
              Deeply rooted in the ancient coastal soil of Ondo State, his identity was anchored in the
              generations of Ikale statesmen who measured honor by community welfare.
            </p>
            <p>
              The Yoruba tradition of intellectual inquiry and public stewardship formed his moral compass,
              instilling the belief that leadership is a sacred communal trust.
            </p>
            <p>
              He succeeded on the national stage not in spite of his ancestral origins, but precisely
              because he drew unending strength from the earth that gave him birth.
            </p>
          </div>
        </div>

        {/* Adire Pattern Divider leading into Section 3 */}
        <div className="w-full mt-12">
          <AdireDivider className="opacity-70" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — THE SCHOLAR: EDUCATION AND EXPERTISE */}
      {/* ========================================================================= */}
      <section id="the-scholar" className="py-24 bg-slate text-ivory content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="section-label text-gold-light block mb-2">
              ACADEMIC FOUNDATION
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ivory mb-2">
              A Mind Forged in Science
            </h2>
            <p className="font-playfair italic text-gold-light text-lg">
              The Academic and Research Years
            </p>
          </div>

          {/* Education Timeline (5 Nodes with native details/summary) */}
          <ScholarTimeline />

          {/* Consultancy Section */}
          <div className="mt-16 pt-12 border-t border-gold/30">
            <h3 className="font-playfair italic text-xl text-gold-light mb-6">
              Geological Consultant to:
            </h3>

            {/* 10 Name Pills in Gold-Outlined Capsules */}
            <div className="flex flex-wrap gap-3">
              {[
                'Government of Oyo State',
                'Government of Ogun State',
                'Government of Osun State',
                'Government of Ondo State',
                'Shell Petroleum Development Company',
                'Mobil Producing Nigeria',
                'Texaco Overseas Petroleum',
                'Nigeria Agip Oil Company',
                'Lexington Exploration USA',
                'Nitex Exploration USA',
              ].map((client, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full border border-gold/40 bg-black/20 text-xs sm:text-sm font-ui text-ivory/90"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Entrepreneurship Section (3 Minimal Text Blocks — No icon decoration) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-black/20 rounded-2xl border border-gold/20">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                Water Resources
              </span>
              <h4 className="font-playfair font-bold text-base text-ivory mb-1">
                Water Borehole Drilling Enterprises
              </h4>
              <p className="font-playfair italic text-xs text-ivory/80">
                Pioneering subterranean aquifer extraction across southwestern Nigeria.
              </p>
            </div>

            <div className="p-6 bg-black/20 rounded-2xl border border-gold/20">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                Mineral Processing
              </span>
              <h4 className="font-playfair font-bold text-base text-ivory mb-1">
                Kaolin Mining &amp; Processing
              </h4>
              <p className="font-playfair italic text-xs text-ivory/80">
                Establishing industrial mineral value chains for domestic manufacturing.
              </p>
            </div>

            <div className="p-6 bg-black/20 rounded-2xl border border-gold/20">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                Solid Minerals
              </span>
              <h4 className="font-playfair font-bold text-base text-ivory mb-1">
                Marble, Feldspar &amp; Granite Concessions
              </h4>
              <p className="font-playfair italic text-xs text-ivory/80">
                Sustainable quarrying and mineral mapping across the federation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — THE JOURNEY: PUBLIC SERVICE TIMELINE */}
      {/* ========================================================================= */}
      <section id="the-journey" className="py-24 bg-ivory text-charcoal content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <span className="section-label text-crimson block mb-2">BIOGRAPHICAL SPINE</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-2">
              A Life in Service
            </h2>
            <p className="font-playfair italic text-gold text-lg">
              From Ondo to Abuja and back &mdash; a journey of transformation.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-[2px] before:bg-crimson/30">
            {/* Node 1 — 1992: Deputy Governor */}
            <div className="relative flex flex-col sm:flex-row items-center">
              <div className="flex items-center justify-start sm:justify-end w-full sm:w-1/2 sm:pr-8 pl-12 sm:pl-0">
                <div className="bg-white p-6 sm:p-7 rounded-2xl border-l-4 border-crimson shadow-sm max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-crimson text-ivory font-ui text-[11px] font-bold uppercase tracking-wider">
                    1992 &bull; Deputy Governor
                  </span>
                  <h3 className="font-playfair font-bold text-xl text-charcoal mt-3 mb-2">
                    The First Call to Serve
                  </h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body mb-3">
                    His resourcefulness, geologic knowledge, and untiring efforts led to Ondo State becoming
                    recognized as an Oil-Producing State, fundamentally expanding its economic revenue base.
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full border border-gold text-xs font-ui text-crimson font-medium bg-ivory">
                    Ondo: Oil-Producing State
                  </span>
                  <p className="font-playfair italic text-xs text-charcoal/70 mt-3">
                    His performance paved the way for what was to come.
                  </p>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-crimson" />
            </div>

            {/* Node 2 — 1999: Federal Minister of Aviation */}
            <div className="relative flex flex-col sm:flex-row items-center">
              <div className="hidden sm:block w-1/2" />
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-crimson" />
              <div className="flex items-center justify-start w-full sm:w-1/2 sm:pl-8 pl-12">
                <div className="bg-white p-6 sm:p-7 rounded-2xl border-l-4 border-crimson shadow-sm max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-crimson text-ivory font-ui text-[11px] font-bold uppercase tracking-wider">
                    1999 &bull; Federal Minister
                  </span>
                  <h3 className="font-playfair font-bold text-xl text-charcoal mt-3 mb-2">
                    Ministry of Aviation
                  </h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body mb-3">
                    Appointed by President Olusegun Obasanjo at the dawn of the Fourth Republic. His
                    one-year stint resulted in a dramatic turnaround of Nigerian airport safety and radar
                    overhauls.
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full border border-gold text-xs font-ui text-crimson font-medium bg-ivory">
                    Sector Transformed in 12 Months
                  </span>
                </div>
              </div>
            </div>

            {/* Node 3 — 2000 to 2002: Federal Minister of Power and Steel (CENTERPIECE) */}
            <div className="relative flex flex-col items-center">
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 w-5 h-5 rounded-full bg-crimson border-2 border-gold" />
              <div className="w-full pl-12 sm:pl-0 pt-4">
                <div className="max-w-3xl mx-auto">
                  <span className="px-3.5 py-1.5 rounded-full bg-crimson text-ivory font-ui text-xs font-bold uppercase tracking-wider block w-fit mb-3">
                    2000&ndash;2002 &bull; Federal Minister of Power &amp; Steel
                  </span>
                  {/* Animated Power Counter */}
                  <PowerCounter />
                </div>
              </div>
            </div>

            {/* Node 4 — November 2002: The Resignation */}
            <div className="relative flex flex-col sm:flex-row items-center">
              <div className="flex items-center justify-start sm:justify-end w-full sm:w-1/2 sm:pr-8 pl-12 sm:pl-0">
                <div className="bg-white p-6 rounded-2xl border-l-4 border-slate shadow-sm max-w-lg">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-charcoal/60">
                    November 2002
                  </span>
                  <h3 className="font-playfair font-bold text-lg text-charcoal mt-1 mb-2">
                    Answering a Higher Calling
                  </h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body">
                    He resigned from the Federal Cabinet to contest the governorship on the platform of the
                    PDP, answering a higher calling to serve the people of Ondo State directly.
                  </p>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-slate" />
            </div>

            {/* Node 5 — May 2003 to February 2009: Governor of Ondo State */}
            <div className="relative flex flex-col sm:flex-row items-center">
              <div className="hidden sm:block w-1/2" />
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-crimson" />
              <div className="flex items-center justify-start w-full sm:w-1/2 sm:pl-8 pl-12">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border-l-4 border-crimson shadow-md max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-crimson text-ivory font-ui text-[11px] font-bold uppercase tracking-wider">
                    2003&ndash;2009 &bull; Executive Governor
                  </span>
                  <h3 className="font-playfair font-bold text-2xl text-charcoal mt-3 mb-2">
                    Six Years of Visible Transformation
                  </h3>
                  <p className="font-playfair italic text-crimson text-sm font-semibold mb-3">
                    Transparent. Focused. Prudent. Visionary.
                  </p>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body mb-3">
                    He instituted the scientifically budgeted &ldquo;Roadmap to Progress&rdquo;, established
                    OAUSTECH, constructed thousands of kilometers of roads, and left an unprecedented fiscal
                    surplus.
                  </p>
                  <p className="font-playfair italic text-crimson text-sm font-medium">
                    He didn&apos;t just govern Ondo State. He elevated it.
                  </p>
                  <div className="mt-4 pt-3 border-t border-border text-[11px] font-ui text-text-secondary">
                    May 2003 &rarr; February 2009 &bull; Ondo State, Nigeria
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Moment — 13 September 2013 */}
            <div className="relative flex flex-col items-center pt-8">
              <div className="w-5 h-5 rounded-full bg-gold border-2 border-crimson mb-4" />
              <span className="font-playfair italic text-xl text-crimson font-bold">
                13 September 2013
              </span>
              <p className="font-playfair italic text-sm text-text-secondary mt-1 text-center">
                His passing came as a massive shock to the nation.
              </p>
            </div>
          </div>
        </div>

        {/* Credo Placement 2: Full-Width Crimson Rising Band */}
        <div className="mt-16 bg-crimson text-ivory py-14 px-6 text-center shadow-inner">
          <div className="max-w-3xl mx-auto">
            <blockquote className="font-playfair italic text-2xl sm:text-3xl lg:text-4xl text-gold-light leading-relaxed">
              &ldquo;To leave things better than we met them.&rdquo;
            </blockquote>
            <p className="font-ui text-sm sm:text-base text-ivory/80 mt-3 font-medium">
              And so, in 2014, the Foundation was born.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — THE STATESMAN: IMPACT IN NUMBERS */}
      {/* ========================================================================= */}
      <section className="py-20 bg-crimson text-ivory content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <h2 className="font-playfair font-normal text-3xl sm:text-4xl text-ivory">
              The Measure of a Leader
            </h2>
            <p className="font-playfair italic text-gold-light text-base mt-1">
              Numbers that tell only part of the story.
            </p>
          </div>

          {/* 6 Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {[
              { num: '1992', label: 'First Public Office (Deputy Governor)' },
              { num: '4,000+ MW', label: 'National Power by 2002' },
              { num: '6 Years', label: 'as Governor of Ondo State' },
              { num: '2 Ministries', label: 'Served as Federal Minister' },
              { num: '1 Year', label: 'Aviation Sector Turnaround' },
              { num: '1 State', label: 'Transformed into Oil Producer' },
            ].map((st, i) => (
              <div key={i} className="pt-3 border-t border-gold/40">
                <span className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-gold block mb-1">
                  {st.num}
                </span>
                <span className="font-ui text-xs sm:text-sm text-ivory/80 font-medium block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>

          {/* Focal Areas Strip (Native CSS Horizontal Scroll) */}
          <div className="pt-8 border-t border-ivory/20">
            <span className="font-ui text-xs text-gold uppercase tracking-widest block mb-4">
              Spheres of Enduring Consequence
            </span>
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 text-sm sm:text-base font-playfair italic text-gold-light whitespace-nowrap">
              <span>Academia</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Geology</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Petroleum Engineering</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Energy</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Politics &amp; Good Governance</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Culture and Arts (Highlife Music)</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Service</span>
              <span className="text-gold/40" aria-hidden="true">|</span>
              <span>Aviation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — THE FOUNDATION: INTRODUCTION AND MISSION */}
      {/* ========================================================================= */}
      <section id="the-foundation" className="py-24 bg-ivory text-charcoal content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
          <OafCrest className="w-16 h-16 mx-auto mb-4" />
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-crimson mb-2">
            The Olusegun Agagu Foundation
          </h2>
          <p className="font-ui text-xs sm:text-sm uppercase tracking-widest text-text-secondary mb-16">
            Established 2014 &bull; Keeping the Legacy Alive
          </p>

          {/* Three Mission Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
            {/* Pillar 1 — Immortalise */}
            <div className="bg-white p-8 rounded-2xl border-t-[3px] border-crimson border-x border-b border-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-crimson uppercase tracking-wider block mb-2">
                  Pillar I
                </span>
                <h3 className="font-playfair font-bold text-2xl text-crimson mb-3">
                  Immortalise His Name
                </h3>
                <p className="font-playfair text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  The Foundation was born to ensure the name, memory, and profound public contributions of
                  Dr. Olusegun Kokumo Agagu endure across generations of Nigerian scholars and citizens.
                </p>
              </div>
            </div>

            {/* Pillar 2 — Actualise (Credo Placement 3) */}
            <div className="bg-white p-8 rounded-2xl border-t-[3px] border-gold border-x border-b border-border shadow-md flex flex-col justify-between relative">
              <div>
                <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                  Pillar II &bull; Core Compass
                </span>
                <h3 className="font-playfair font-bold text-2xl text-charcoal mb-4">
                  Actualise His Credo
                </h3>
                <blockquote className="font-playfair italic text-lg sm:text-xl text-gold font-bold leading-relaxed mb-4">
                  &ldquo;To leave things better than he met them.&rdquo;
                </blockquote>
                <p className="font-playfair text-sm text-charcoal/80 leading-relaxed">
                  The Foundation&apos;s living operational compass in every tertiary endowment, educational
                  bursary, and public symposium it convenes.
                </p>
              </div>
            </div>

            {/* Pillar 3 — Further */}
            <div className="bg-white p-8 rounded-2xl border-t-[3px] border-crimson border-x border-b border-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-crimson uppercase tracking-wider block mb-2">
                  Pillar III
                </span>
                <h3 className="font-playfair font-bold text-2xl text-crimson mb-3">
                  Further His Ideals
                </h3>
                <div className="space-y-2 text-base font-playfair italic text-charcoal/90 pt-1">
                  <p>Intellectual excellence.</p>
                  <p>Good governance.</p>
                  <p>National development.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Focal Areas Grid (4x2 text-only grid) */}
          <div className="pt-12 border-t border-border text-left">
            <span className="section-label text-crimson block mb-6">
              FOUNDATION FOCAL PORTFOLIOS
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Academia', desc: 'Tertiary bursaries & research endowments' },
                { name: 'Geology', desc: 'Subsurface research & laboratory equipment' },
                { name: 'Petroleum Engineering', desc: 'Energy transition & extractive science' },
                { name: 'Energy', desc: 'Sustainable power systems & research' },
                { name: 'Politics & Governance', desc: 'Civil integrity colloquia & statecraft' },
                { name: 'Culture & Highlife', desc: 'Preserving African musical heritage' },
                { name: 'Service', desc: 'Community health & riverine interventions' },
                { name: 'Aviation Trauma', desc: 'Support interventions & safety advocacy' },
              ].map((f, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-border">
                  <h4 className="font-playfair font-semibold text-base text-charcoal">
                    {f.name}
                  </h4>
                  <p className="font-ui text-xs text-text-secondary mt-1">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — FOUNDATION IMPACT: PROGRAMMES AND SCHOLAR VOICES */}
      {/* ========================================================================= */}
      <section className="py-24 bg-forest-green text-ivory content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <span className="section-label text-gold block mb-2">PHILANTHROPIC STEWARDSHIP</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory mb-2">
              A Decade of Impact
            </h2>
            <p className="font-playfair italic text-gold-light text-lg">
              2014&ndash;2023 &bull; What We Have Built
            </p>
          </div>

          {/* 4 Impact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-gold/25">
            <div>
              <span className="font-playfair font-bold text-4xl lg:text-5xl text-gold block">9</span>
              <span className="font-ui text-xs uppercase tracking-wider text-ivory/80 font-medium block mt-1">
                Memorial Lectures Organized
              </span>
            </div>
            <div>
              <span className="font-playfair font-bold text-4xl lg:text-5xl text-gold block">400+</span>
              <span className="font-ui text-xs uppercase tracking-wider text-ivory/80 font-medium block mt-1">
                Awards &amp; Secondary Prizes
              </span>
            </div>
            <div>
              <span className="font-playfair font-bold text-4xl lg:text-5xl text-gold block">50+</span>
              <span className="font-ui text-xs uppercase tracking-wider text-ivory/80 font-medium block mt-1">
                Tertiary Beneficiaries Awarded
              </span>
            </div>
            <div>
              <span className="font-playfair font-bold text-4xl lg:text-5xl text-gold block">75</span>
              <span className="font-ui text-xs uppercase tracking-wider text-ivory/80 font-medium block mt-1">
                Full University Scholarships
              </span>
            </div>
          </div>

          {/* Three Programme Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14">
            <div className="bg-black/20 p-7 rounded-2xl border border-gold/30">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                Programme 01
              </span>
              <h3 className="font-playfair font-bold text-xl text-ivory mb-3">
                Scholarships &amp; Bursaries
              </h3>
              <p className="font-playfair text-sm text-ivory/85 leading-relaxed">
                35 full scholarships at Adeleke University; 40 full scholarships into Premier College (Ijebu
                Ode) and Adeleke High School (Ede); alongside 400+ cash prizes for secondary students.
              </p>
            </div>

            <div className="bg-black/20 p-7 rounded-2xl border border-gold/30">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                Programme 02
              </span>
              <h3 className="font-playfair font-bold text-xl text-ivory mb-3">
                University Endowment Fund
              </h3>
              <p className="font-playfair text-sm text-ivory/85 leading-relaxed">
                Endowments at the University of Ibadan, Adekunle Ajasin University, FUTA, and OAUSTECH. Cash
                prizes of &#8358;50,000 for 100&ndash;300 Level and &#8358;100,000 for 400 Level best Geology
                scholars.
              </p>
            </div>

            <div className="bg-black/20 p-7 rounded-2xl border border-gold/30">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                Programme 03
              </span>
              <h3 className="font-playfair font-bold text-xl text-ivory mb-3">
                OAUSTECH E-Library
              </h3>
              <p className="font-playfair text-sm text-ivory/85 leading-relaxed">
                &#8358;25 million donated to the Olusegun Agagu University of Science and Technology to
                establish a high-speed digital e-library, honoring his lifelong commitment to tertiary research.
              </p>
            </div>
          </div>

          {/* 2023 Milestone Banner: Split Halves */}
          <div className="bg-crimson rounded-2xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-ivory shadow-lg">
            <div>
              <span className="font-ui text-xs text-gold uppercase tracking-widest font-semibold block mb-1">
                2023 Decennial Milestone &bull; Book Launch
              </span>
              <h4 className="font-playfair font-bold text-2xl text-ivory mb-2">
                A Decade of Legacy Compendium
              </h4>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-body">
                Curated as a premier reference compendium and critical resource on good governance, archiving
                ten years of policy papers from African heads of state.
              </p>
            </div>
            <div className="md:border-l md:border-ivory/20 md:pl-8">
              <span className="font-ui text-xs text-gold uppercase tracking-widest font-semibold block mb-1">
                Decennial Cultural Celebration
              </span>
              <h4 className="font-playfair font-bold text-2xl text-ivory mb-2">
                Highlife Music Talent Concert
              </h4>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-body">
                Showcasing emerging young Nigerian Highlife artists, uniting generations through live
                brass, soulful melodies, and honoring his deep appreciation for traditional musical art.
              </p>
            </div>
          </div>

          {/* Scholar Voices Testimonial Component */}
          <ScholarVoices />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — MEMORIAL LECTURES: YEAR STRIP AND DETAIL PANELS */}
      {/* ========================================================================= */}
      <section id="lectures" className="py-24 bg-ivory text-charcoal content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="section-label text-crimson block mb-2">GLOBAL DISCOURSE</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-2">
              The Memorial Lectures
            </h2>
            <p className="font-playfair italic text-gold text-lg">
              Nine Years &bull; Nine Conversations &bull; One Enduring Purpose
            </p>
            <span className="font-ui text-xs text-text-secondary block mt-2">
              Held annually on the anniversary of Dr. Agagu&apos;s passing &mdash; 13 September
            </span>
          </div>

          {/* Layer 1 Year Strip & Layer 2 Slide-Over Panel */}
          <MemorialLectureStrip />

          {/* Prestige Callout Band */}
          <div className="mt-12 bg-crimson text-ivory p-8 rounded-2xl text-center relative overflow-hidden">
            <p className="font-playfair italic text-lg sm:text-xl text-ivory max-w-2xl mx-auto leading-relaxed">
              &ldquo;Nine keynote addresses by former Heads of State and Heads of Government from across
              Africa and the world.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9 — BOARD OF TRUSTEES */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate text-ivory content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="section-label text-gold-light block mb-2">FIDUCIARY CUSTODIANSHIP</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-ivory mb-2">
              The Guardians of the Legacy
            </h2>
            <p className="font-ui text-xs sm:text-sm text-gold-light uppercase tracking-widest">
              Board of Trustees &bull; The Olusegun Agagu Foundation
            </p>
          </div>

          {/* Phase 1 Typeset List */}
          <div className="bg-black/25 p-8 sm:p-12 rounded-3xl border border-gold/30 max-w-4xl">
            {/* Chairman */}
            <div className="pb-6 border-b border-gold/30">
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                Chairman of the Board
              </span>
              <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-gold">
                Dr. Deji Adeleke
              </h3>
            </div>

            {/* Remaining Trustees List */}
            <div className="py-8 space-y-4 font-playfair text-base sm:text-lg text-ivory leading-[2.2]">
              {trustees
                .filter((t) => t.name !== 'Dr. Deji Adeleke' && t.name !== 'Mr. Feyi Agagu' && !t.status)
                .map((trustee, idx) => (
                  <p key={idx} className="border-b border-ivory/10 pb-2">
                    {trustee.name}
                  </p>
                ))}
            </div>

            {/* Secretary */}
            <div className="py-6 border-t border-b border-gold/30">
              <span className="font-ui text-xs font-semibold text-gold-light uppercase tracking-wider block mb-1">
                Secretary to the Board
              </span>
              <p className="font-playfair italic text-xl text-gold-light font-bold">
                Mr. Feyi Agagu
              </p>
            </div>

            {/* In Memoriam / Transition Row */}
            <div className="pt-6">
              <span className="font-playfair italic text-xs text-ivory/60 block mb-2">
                In Memoriam &bull; Honor Roll:
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-ui text-ivory/70">
                <span>Prince Yemi Adefulu MFR (Late)</span>
                <span>&bull;</span>
                <span>Professor Dele Fawole (stepped down 2018)</span>
                <span>&bull;</span>
                <span>Mr. Akin Aruwajoye (appointed 2018)</span>
                <span>&bull;</span>
                <span>Mr. Kayode Falowo (appointed 2018)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — FUTURE INITIATIVES: THE WORK CONTINUES */}
      {/* ========================================================================= */}
      <section id="legacy" className="py-24 bg-ivory text-charcoal content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14">
            <span className="section-label text-crimson block mb-2">HORIZON VISION</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-crimson mb-2">
              The Work Continues
            </h2>
            <p className="font-playfair italic text-text-secondary text-lg">
              Because the mission to leave things better is never finished.
            </p>
          </div>

          {/* Three Initiative Descriptions (Side-by-Side Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-crimson uppercase tracking-wider block mb-2">
                  Initiative I
                </span>
                <h3 className="font-playfair font-bold text-xl text-crimson mb-3">
                  Expand. Deepen. Reach Further.
                </h3>
                <p className="font-playfair text-sm text-charcoal/80 leading-relaxed">
                  Add one new university every five years to the endowment scheme, providing awards for
                  three students per university in Geology or Petroleum Engineering, while scaling award values.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-crimson uppercase tracking-wider block mb-2">
                  Initiative II
                </span>
                <h3 className="font-playfair font-bold text-xl text-crimson mb-3">
                  His Story, For All Time
                </h3>
                <p className="font-playfair text-sm text-charcoal/80 leading-relaxed mb-3">
                  Publishing the comprehensive official autobiography of Dr. Olusegun Agagu to educate the
                  public on his lifetime and impart his rigorous principles of governance.
                </p>
                <p className="font-playfair italic text-crimson text-xs font-semibold">
                  So that the next generation knows the name, knows the man, knows what he stood for.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-crimson uppercase tracking-wider block mb-2">
                  Initiative III
                </span>
                <h3 className="font-playfair font-bold text-xl text-crimson mb-3">
                  New Fronts, Same Mission
                </h3>
                <div className="space-y-2 font-playfair italic text-xs sm:text-sm text-charcoal/85">
                  <p>&bull; Essay &amp; Research Paper competitions</p>
                  <p>&bull; Volunteer teaching and youth mentoring</p>
                  <p>&bull; Aviation safety intervention and trauma advocacy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Credo Placement 4: Full-Width Crimson Closing Banner */}
          <div className="bg-crimson text-ivory py-14 px-6 rounded-2xl text-center shadow-lg">
            <blockquote className="font-playfair italic text-2xl sm:text-3xl lg:text-4xl text-gold-light leading-relaxed max-w-3xl mx-auto">
              &ldquo;Together, we hope to continue &mdash; to leave things better than we met them.&rdquo;
            </blockquote>
            <span className="font-ui text-xs uppercase tracking-widest text-ivory/80 block mt-4 font-semibold">
              &mdash; The Olusegun Agagu Foundation
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — GALLERY: MOMENTS IN A LIFE WELL LIVED */}
      {/* ========================================================================= */}
      <section className="py-24 bg-charcoal text-ivory content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="section-label text-gold block mb-2">PHOTOGRAPHIC ARCHIVE</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory mb-2">
              Moments in a Life Well Lived
            </h2>
            <p className="font-playfair italic text-gold-light text-base">
              An Archival Photographic Memoir
            </p>
          </div>

          <GalleryLightbox />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — APPLY / SUPPORT: SPLIT LANDING */}
      {/* ========================================================================= */}
      <section id="apply-support" className="py-24 bg-ivory text-charcoal content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label text-crimson block mb-2">DUAL ENGAGEMENT PATHWAY</span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-charcoal mb-2">
              What brings you here today?
            </h2>
            <p className="font-playfair italic text-text-secondary text-base">
              Dedicated pathways for prospective scholarship students and institutional philanthropic partners.
            </p>
          </div>

          {/* Split Landing Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Path A — Students (Forest Green) */}
            <div className="bg-forest-green text-ivory p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider block mb-2">
                  Path A &bull; For Beneficiaries
                </span>
                <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-ivory mb-4">
                  I&apos;m a student looking for scholarships
                </h3>
                <p className="font-playfair text-sm text-ivory/85 leading-relaxed mb-6">
                  Access fully endowed tuition bursaries, secondary school academic prizes, and university
                  undergraduate support across our affiliated partner varsities (Adeleke, OAUSTECH, UI,
                  AAUA, and FUTA).
                </p>
                <div className="space-y-2 text-xs font-ui text-ivory/90 mb-6 bg-black/20 p-4 rounded-xl border border-gold/30">
                  <p>&bull; Full tuition bursaries for Geology &amp; Earth Sciences</p>
                  <p>&bull; Adeleke High School &amp; Premier College entry grants</p>
                  <p>&bull; Verification managed directly by OAF Secretariat</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/30">
                <a
                  href={`mailto:${contactInfo.pressEmail}?subject=Scholarship%20Application%20Inquiry%20%E2%80%93%20OAF`}
                  className="w-full inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-charcoal font-ui font-bold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
                >
                  Start Your Application &rarr;
                </a>
              </div>
            </div>

            {/* Path B — Donors & Partners (Crimson) */}
            <div className="bg-crimson text-ivory p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="font-ui text-xs font-semibold text-gold-light uppercase tracking-wider block mb-2">
                  Path B &bull; For Philanthropic Partners
                </span>
                <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-ivory mb-4">
                  I want to support or partner with the Foundation
                </h3>
                <p className="font-playfair text-sm text-ivory/85 leading-relaxed mb-6">
                  Collaborate with the Board of Trustees on university endowment co-sponsorships, annual
                  memorial lecture patronage, digital e-library expansion, or youth leadership fellowships.
                </p>
                <div className="space-y-2 text-xs font-ui text-ivory/90 mb-6 bg-black/20 p-4 rounded-xl border border-gold/30">
                  <p>&bull; 100% fiduciary transparency guaranteed by Board</p>
                  <p>&bull; Institutional university endowment expansion</p>
                  <p>&bull; Memorial lecture series &amp; policy compendium sponsorship</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/30">
                <a
                  href={`mailto:${contactInfo.pressEmail}?subject=Institutional%20Partnership%20Inquiry%20%E2%80%93%20OAF`}
                  className="w-full inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-ivory hover:bg-gold-light text-crimson font-ui font-bold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
                >
                  Partner With Us &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13 — CONTACT */}
      {/* ========================================================================= */}
      <section id="contact" className="py-24 bg-ivory text-charcoal content-auto">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column — Contact Card on Crimson Background */}
            <div className="lg:col-span-6 bg-crimson text-ivory p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <OafCrest className="w-12 h-12 mb-4" light={true} />
                <span className="font-playfair italic text-gold-light text-sm block">
                  {biography.name}
                </span>
                <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-ivory mt-1 mb-2">
                  Secretariat Directory
                </h3>
                <p className="font-playfair text-base text-ivory/90 font-medium">
                  Mr. Feyisayo Agagu, Secretary, Board of Trustees
                </p>

                <div className="space-y-4 pt-6 text-sm font-ui text-ivory/85">
                  <p className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-gold">Official Email</span>
                    <a
                      href={`mailto:${contactInfo.pressEmail}`}
                      className="text-base text-gold-light hover:underline min-h-[44px] flex items-center focus-ring rounded"
                    >
                      {contactInfo.pressEmail}
                    </a>
                  </p>
                  {contactInfo.phone && (
                    <p className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-gold">Telephone Desk</span>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-base text-gold-light hover:underline min-h-[44px] flex items-center focus-ring rounded"
                      >
                        {contactInfo.phone}
                      </a>
                    </p>
                  )}
                  <p className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-gold">Permanent Domain</span>
                    <a
                      href={contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gold-light hover:underline min-h-[44px] flex items-center focus-ring rounded"
                    >
                      {contactInfo.website.replace('https://', '')}
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-ivory/20 text-xs font-ui text-ivory/70">
                Liaison offices in Ibadan (Bodija Estate) &amp; Akure (Alagbaka GRA).
              </div>
            </div>

            {/* Right Column — CTA Card on Ivory Background */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-12 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="section-label text-crimson block mb-2">CIVIC STEWARDSHIP</span>
                <h3 className="font-playfair font-bold text-3xl text-crimson mb-4">
                  Help Us Leave Things Better
                </h3>
                <p className="font-playfair text-base text-charcoal/80 leading-relaxed mb-6 font-body">
                  The Foundation depends on the generosity, scholarship partnerships, and civic alliances of
                  individuals and corporations who share Dr. Agagu&apos;s lifelong devotion to education,
                  scientific integrity, and national development.
                </p>
              </div>

              {/* Three CTA Buttons Stacked Vertically */}
              <div className="flex flex-col gap-3.5 pt-4">
                <a
                  href={`mailto:${contactInfo.pressEmail}?subject=Support%20a%20Scholarship`}
                  className="w-full min-h-[44px] inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-charcoal font-ui font-semibold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
                >
                  Support a Scholarship
                </a>
                <a
                  href={`mailto:${contactInfo.pressEmail}?subject=Institutional%20Partnership`}
                  className="w-full min-h-[44px] inline-flex items-center justify-center px-6 py-3 rounded-full bg-crimson hover:bg-deep-crimson text-ivory font-ui font-semibold text-xs uppercase tracking-wider transition-all shadow-md focus-ring"
                >
                  Partner With Us
                </a>
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center px-6 py-3 rounded-full border border-crimson text-crimson hover:bg-crimson hover:text-ivory font-ui font-semibold text-xs uppercase tracking-wider transition-all focus-ring"
                >
                  <span>Visit OAF Website &nbsp;&nearr;</span>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
