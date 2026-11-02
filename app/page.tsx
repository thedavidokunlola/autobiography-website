import type { Metadata } from 'next'
import Image from 'next/image'
import { biography } from '@/data/biography'
import { contactInfo } from '@/data/contact'
import { AdireBackground } from '@/components/CulturalElements'
import { PowerCounter } from '@/components/PowerCounter'
import { BiographicalChapters } from '@/components/BiographicalChapters'
import { MemorialLectureStrip } from '@/components/MemorialLectureStrip'
import { ScholarVoices } from '@/components/ScholarVoices'
import { PhotoGallery } from '@/components/PhotoGallery'
import { galleryPhotos } from '@/data/photos'
import { TributeRegistry } from '@/components/TributeRegistry'
import {
  SchoolIcon,
  ScienceIcon,
  BankIcon,
  HistoryEduIcon,
  ArrowForwardIcon,
  VerifiedIcon,
  StarIcon,
  DownloadIcon,
  CandleIcon,
  MusicNoteIcon,
  VolunteerActivismIcon,
  FlightTakeoffIcon,
  BoltIcon,
  EngineeringIcon,
} from '@/components/Icons'

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
      {/* 1. HERO SECTION (Takes full viewport height 100vh) */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative h-screen min-h-screen max-h-screen pt-20 pb-6 lg:pt-24 lg:pb-8 bg-[#140b0a] text-white overflow-hidden flex items-center"
      >
        {/* Hero Section Background Image (hero.png from pdf folder) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Dr. Olusegun Kokumo Agagu CON Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-right"
          />
          {/* Subtle gradient overlay to ensure perfect text contrast across all viewports */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#140b0a] via-[#140b0a]/80 lg:via-[#140b0a]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b0a] via-transparent to-black/30 lg:hidden" />
        </div>

        <div className="max-w-[1340px] w-full mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content — Refined, Dignified & World-Class Editorial Hierarchy */}
            <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-5 items-start">
              {/* Main Headline (RULE-A2: exactly one H1 per page) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold tracking-tight leading-[1.12] font-display text-white drop-shadow-md">
                A Life Given to Service. A Legacy Built to Last.
                <span className="block text-tertiary font-serif italic font-normal text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] mt-2">
                  Dr. Olusegun Kokumo Agagu, CON
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/85 max-w-xl font-normal leading-relaxed font-body drop-shadow">
                Petroleum geologist and Former Governor of Ondo State. He lived by one credo &ldquo;To leave things better than he met them.&rdquo;
              </p>

              {/* Dual Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#about"
                  className="px-6 sm:px-7 py-3 rounded-full bg-brand-red hover:bg-[#c41e15] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-brand-red/30 flex items-center gap-2 focus-ring"
                >
                  <span>DISCOVER HIS STORY</span>
                  <ArrowForwardIcon className="w-4 h-4" />
                </a>
                <a
                  href="#foundation"
                  className="px-6 sm:px-7 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/25 backdrop-blur-sm font-bold text-xs uppercase tracking-wider transition-all focus-ring"
                >
                  THE FOUNDATION
                </a>
              </div>

              {/* Empirical Micro Stats Row directly from PDF */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/15 w-full max-w-md mt-1 backdrop-blur-sm">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">9+</div>
                  <div className="text-[10px] sm:text-[11px] text-white/70 uppercase tracking-wider font-semibold font-ui">Memorial Lectures</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-tertiary">400+</div>
                  <div className="text-[10px] sm:text-[11px] text-white/70 uppercase tracking-wider font-semibold font-ui">Scholars Awarded</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">&#8358;25M</div>
                  <div className="text-[10px] sm:text-[11px] text-white/70 uppercase tracking-wider font-semibold font-ui">E-Library Fund</div>
                </div>
              </div>
            </div>

            {/* Right Hero Space — Unobstructed view of Dr. Agagu's portrait in hero.png */}
            <div className="hidden lg:block lg:col-span-5" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AUTOBIOGRAPHY & LIFE RECORD (Inspired by Weblium Actor Portfolio Design) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#1e110b] text-white relative overflow-hidden" id="about">
        {/* Subtle background ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140b0a] via-[#1e110b] to-[#140b0a] pointer-events-none" />
        <AdireBackground className="absolute inset-0 pointer-events-none opacity-[0.03]" />

        <div className="max-w-[1340px] mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header with Signature Weblium Pipe Eyebrow */}
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-tertiary font-ui mb-3">
              | ABOUT DR. OLUSEGUN AGAGU |
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-[1.15]">
              A Life of Scientific Distinction, Enterprise &amp; Servant Leadership
            </h2>
          </div>

          {/* 2-Column Luxury Autobiography Grid (Weblium #about Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Signature Framed Archival Portrait (12px frame) & Distinctions List */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Weblium Signature Luxury Framed Portrait */}
              <div className="relative rounded-2xl overflow-hidden border-[12px] border-[#0c0805] shadow-2xl bg-[#0c0805] group">
                <div className="aspect-[4/5] relative w-full overflow-hidden">
                  <Image
                    src="/images/about-portrait.jpg"
                    alt="Official portrait for Olusegun Agagu Foundation archive record"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Curated Honors & National Recognition (Modeled after Weblium Awards List) */}
              <div className="bg-[#140b0a]/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <VerifiedIcon className="w-4 h-4 text-tertiary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white font-ui">
                    National Honours &amp; Institutional Distinctions
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-white/80 font-ui">
                  <li className="flex items-start gap-2.5">
                    <span className="text-tertiary font-bold">&bull;</span>
                    <span>
                      <strong className="text-white">Commander of the Order of the Niger (CON)</strong> &mdash; National Honour of the Federal Republic of Nigeria.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-tertiary font-bold">&bull;</span>
                    <span>
                      <strong className="text-white">Doctor of Science (Honoris Causa)</strong> &mdash; In recognition of landmark public governance &amp; institution building.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-tertiary font-bold">&bull;</span>
                    <span>
                      <strong className="text-white">Fellow, Nigerian Mining &amp; Geosciences Society (NMGS)</strong> &mdash; For seminal contributions to earth sciences.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-tertiary font-bold">&bull;</span>
                    <span>
                      <strong className="text-white">Fellow, Nigerian Association of Petroleum Explorationists (NAPE)</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-tertiary font-bold">&bull;</span>
                    <span>
                      <strong className="text-white">Pioneer Deputy Governor (1992)</strong> &mdash; Architect of untiring efforts that secured Ondo&apos;s Oil-Producing Status.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-tertiary font-bold">&bull;</span>
                    <span>
                      <strong className="text-white">National Power Turnaround (1999&ndash;2002)</strong> &mdash; Grew grid generation from 1,425 MW to 4,000+ MW.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Narrative Autobiography (Weblium Typography & Flow) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Lead Highlight Statement */}
              <p className="text-xl sm:text-2xl font-serif text-white/95 leading-relaxed font-normal">
                Born on 16 February 1948, Dr. Olusegun Kokumo Agagu&apos;s life was a testament to academic rigor, industrial enterprise, and selfless public stewardship &mdash; dedicated to leaving every institution and community better than he met it.
              </p>

              {/* Narrative Paragraphs Direct from Official PDF Record */}
              <div className="space-y-4 text-sm sm:text-base text-[#c1c0c0] leading-relaxed font-body">
                <p>
                  As a scholar with an unyielding passion for education, Olusegun Agagu obtained a Master&apos;s degree in Geology from the University of Texas, Austin, USA in 1974. He then served as a Research Scientist with the University of Texas for the United States Atomic Energy Commission on Geothermal Energy. Returning to Nigeria, he joined the faculty of the Geology Department at the University of Ibadan, where he earned his Ph.D. in Petroleum Geology in 1978 and trained a generation of Nigeria&apos;s leading earth scientists.
                </p>
                <p>
                  Dr. Agagu served as a geological consultant to numerous multinational corporations and sovereign governments, including Shell Petroleum Development Company, Mobil Producing Nigeria, Texaco, Nigeria Agip Oil Company, Lexington Exploration U.S.A., Nitex Exploration U.S.A., and the Governments of Oyo, Ogun, Osun, and Ondo States.
                </p>
                <p>
                  A visionary industrialist, he founded successful private enterprises across Nigeria, including a commercial water borehole drilling enterprise, a kaolin mining and processing company, and multiple quarrying ventures in marble, feldspar, and granite.
                </p>
                <p>
                  In public service, he made indelible national impacts: as Deputy Governor of Ondo State (1992), Federal Minister of Aviation (1999&ndash;2000), Federal Minister of Power and Steel (2000&ndash;2002), and Executive Governor of Ondo State (2003&ndash;2009), where he founded the Ondo State University of Science and Technology (now OAUSTECH) and instituted the visionary &ldquo;Roadmap to Progress&rdquo;.
                </p>
              </div>

              {/* Family & Devotion Tribute Card (Direct from PDF Page 3) */}
              <div className="p-6 rounded-2xl bg-[#0c0805] border border-white/10 shadow-lg mt-2">
                <blockquote className="font-serif italic text-base sm:text-lg text-white/95 leading-snug mb-3">
                  &ldquo;Until he passed on, Dr. Olusegun Agagu was a loving family man married to his school sweetheart and dance partner, Mrs. Olufunke Agagu, for more than 39 years. Their union was blessed with three children. He is also survived by seven grandchildren...and counting.&rdquo;
                </blockquote>
                <div className="flex items-center justify-between text-xs font-mono text-tertiary">
                  <span>&mdash; Official Biography Record, Page 3</span>
                  <span className="text-white/50">39+ Years of Devotion</span>
                </div>
              </div>

              {/* Sovereign Credo Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-red/20 to-transparent border-l-4 border-brand-red flex items-center justify-between mt-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary block font-ui">
                    HIS GUIDING CREDO
                  </span>
                  <p className="text-base sm:text-lg font-serif italic text-white font-medium">
                    &ldquo;To leave things better than he met them.&rdquo;
                  </p>
                </div>
                <a
                  href="#chapters"
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all focus-ring"
                >
                  Life Chapters &darr;
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* EDUCATION & PEDIGREE (Weblium #education Section Layout) */}
          {/* ========================================================================= */}
          <div className="mt-24 pt-16 border-t border-white/10" id="education">
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-tertiary font-ui mb-2">
                | EDUCATION &amp; PEDIGREE |
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Academic Pedigree &amp; Scientific Research
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* University of Texas Austin */}
              <div className="p-6 rounded-2xl bg-[#0c0805] border border-white/10 flex flex-col justify-between hover:border-tertiary/50 transition-colors shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span>Austin, Texas, USA</span>
                    <span className="text-tertiary font-bold">1974</span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-1">
                    University of Texas, Austin
                  </h4>
                  <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3 font-ui">
                    M.Sc. in Geology
                  </p>
                  <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                    Appointed Research Scientist for the United States Atomic Energy Commission on Geothermal Energy, pioneering high-temperature energy reservoir analysis.
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-mono text-white/60">
                  Atomic Energy Commission Scholar
                </div>
              </div>

              {/* University of Ibadan - Ph.D. */}
              <div className="p-6 rounded-2xl bg-[#0c0805] border border-white/10 flex flex-col justify-between hover:border-tertiary/50 transition-colors shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span>Ibadan, Oyo State, Nigeria</span>
                    <span className="text-tertiary font-bold">1978</span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-1">
                    University of Ibadan
                  </h4>
                  <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3 font-ui">
                    Ph.D. in Petroleum Geology
                  </p>
                  <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                    Earned doctorate in Petroleum Geology and lectured for sixteen years at the prestigious Department of Geology, authoring seminal sedimentary papers.
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-mono text-white/60">
                  Doctoral Scholar &bull; Department of Geology
                </div>
              </div>

              {/* University of Ibadan - B.Sc. */}
              <div className="p-6 rounded-2xl bg-[#0c0805] border border-white/10 flex flex-col justify-between hover:border-tertiary/50 transition-colors shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span>Ibadan, Oyo State, Nigeria</span>
                    <span className="text-tertiary font-bold">1971</span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-1">
                    University of Ibadan
                  </h4>
                  <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3 font-ui">
                    B.Sc. (Hons) in Geology
                  </p>
                  <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                    Graduated with top academic honours in Geology, laying the empirical foundation for a pioneering scientific, commercial, and political career.
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-mono text-white/60">
                  Bachelor of Science with Honours
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CORE ATTRIBUTES & ASPECTS (Weblium #features-icons Layout) */}
          {/* ========================================================================= */}
          <div className="mt-20 pt-16 border-t border-white/10" id="features">
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-tertiary font-ui mb-2">
                | CORE ATTRIBUTES |
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Highlighting Key Aspects of a Consequential Life
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1: Dedication to Scientific Craft */}
              <div className="p-6 rounded-2xl bg-[#140b0a] border border-white/10 hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center mb-4">
                  <ScienceIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-display text-white mb-1">
                  Scientific Rigour
                </h4>
                <p className="text-xs text-tertiary font-ui font-semibold mb-2">
                  Empirical precision in all things
                </p>
                <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                  Whether analyzing geothermal reservoirs at UT Austin or managing public budgets in Ondo State, he brought data-driven scientific integrity to every challenge.
                </p>
              </div>

              {/* Feature 2: Industrial & Mining Enterprise */}
              <div className="p-6 rounded-2xl bg-[#140b0a] border border-white/10 hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-tertiary/20 text-tertiary flex items-center justify-center mb-4">
                  <EngineeringIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-display text-white mb-1">
                  Industrial Enterprise
                </h4>
                <p className="text-xs text-tertiary font-ui font-semibold mb-2">
                  Building indigenous industry
                </p>
                <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                  Founded thriving private ventures in borehole drilling, kaolin processing, and granite mining across Nigeria, generating jobs and domestic industrial value.
                </p>
              </div>

              {/* Feature 3: Technocratic Statesmanship */}
              <div className="p-6 rounded-2xl bg-[#140b0a] border border-white/10 hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center mb-4">
                  <BoltIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-display text-white mb-1">
                  Technocratic Vision
                </h4>
                <p className="text-xs text-tertiary font-ui font-semibold mb-2">
                  Transforming public administration
                </p>
                <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                  Spearheaded national electric power capacity scaling, instituted the &lsquo;Roadmap to Progress&rsquo;, and established OAUSTECH for sustainable youth advancement.
                </p>
              </div>

              {/* Feature 4: Devotion & Unshakable Faith */}
              <div className="p-6 rounded-2xl bg-[#140b0a] border border-white/10 hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-tertiary/20 text-tertiary flex items-center justify-center mb-4">
                  <StarIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-display text-white mb-1">
                  Patriarch &amp; Philanthropist
                </h4>
                <p className="text-xs text-tertiary font-ui font-semibold mb-2">
                  Compassionate family legacy
                </p>
                <p className="text-xs text-[#c1c0c0] leading-relaxed font-body">
                  A loving husband of 39+ years, father, grandfather, and approachable mentor who touched thousands of lives with quiet generosity and unwavering moral dignity.
                </p>
              </div>
            </div>
          </div>

          {/* Geological Consulting Clients in Sleek Capsules (Direct from PDF Page 3) */}
          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-4 font-ui">
              Geological Consultant to Governments &amp; Industry (Official Record)
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                'Shell Petroleum Development Company',
                'Mobil Producing Nigeria',
                'Texaco',
                'Nigeria Agip Oil Company',
                'Lexington Exploration U.S.A.',
                'Nitex Exploration U.S.A.',
                'Government of Oyo State',
                'Government of Ogun State',
                'Government of Osun State',
                'Government of Ondo State',
              ].map((client, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-white/85 font-ui hover:border-tertiary transition-colors"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Biographical Chapters (Preserved in Dark Luxury Theme) */}
          <div className="mt-20 pt-16 border-t border-white/10">
            <BiographicalChapters />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TEMPORARILY HIDDEN SECTIONS FOR CLIENT PRESENTATION */}
      {/* Remove style={{ display: 'none' }} to restore all sections below */}
      {/* ========================================================================= */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {/* ========================================================================= */}
        {/* 3. ABOUT THE FOUNDATION & 8 FOCAL AREAS (PDF Page 4) */}
        {/* ========================================================================= */}
        <section style={{ display: 'none' }} className="py-24 bg-surface-container-low text-on-surface" id="foundation">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          {/* Eyebrow & Mission Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface font-ui">
                About The Foundation &bull; Established 2014
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-on-surface">
              Mission &amp; Focal Areas
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-4 font-body">
              {biography.missionIntro}
            </p>
          </div>

          {/* 3 Mission Points (PDF Page 4) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-7 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold text-xs flex items-center justify-center mb-4 font-ui">
                  01
                </span>
                <h3 className="text-lg font-bold font-display text-on-surface mb-2">Immortalise His Name &amp; Legacy</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body">
                  Immortalise the name and legacy of the late Dr. Olusegun Agagu through enduring institutions, archives, and academic endowments.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border-2 border-brand-red shadow-md flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-brand-red text-white font-bold text-xs flex items-center justify-center mb-4 font-ui">
                  02
                </span>
                <h3 className="text-lg font-bold font-display text-on-surface mb-2">Actualise His Personal Credo</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body">
                  Live up to and seek to actualise his personal credo which was{' '}
                  <strong className="text-brand-red italic">&lsquo;to leave things better than he met them&rsquo;</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold text-xs flex items-center justify-center mb-4 font-ui">
                  03
                </span>
                <h3 className="text-lg font-bold font-display text-on-surface mb-2">Further His Passionate Ideals</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body">
                  Further the ideals he lived by and worked passionately towards, particularly intellectual excellence, good governance and national development.
                </p>
              </div>
            </div>
          </div>

          {/* Section Sub-header: The 8 Focal Areas */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red font-ui block mb-2">
              Eight Pillars of Impact
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-on-surface">
              The Foundation&apos;s Focal Areas
            </h3>
          </div>

          {/* 8 Focal Areas Grid (Directly from PDF Page 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Focal Area 1: Academia */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <SchoolIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Academia
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Promoting intellectual excellence, tertiary research bursaries, and faculty awards across Nigerian universities.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 01
              </div>
            </div>

            {/* Focal Area 2: Geology */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <ScienceIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Geology
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Endowing prizes and scholarships for undergraduate and postgraduate earth sciences scholars (UI, AAUA, FUTA, OAUSTECH).
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 02
              </div>
            </div>

            {/* Focal Area 3: Petroleum Engineering */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <EngineeringIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Petroleum Engineering
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Fostering technical engineering education, exploration research, and local content capacity in hydrocarbons.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 03
              </div>
            </div>

            {/* Focal Area 4: Energy */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <BoltIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Energy
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Advancing sustainable power infrastructure, transmission policy, and rural electrification initiatives.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 04
              </div>
            </div>

            {/* Focal Area 5: Politics / Good Governance */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <BankIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Politics / Good Governance
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Convening policy dialogues, publishing policy compendiums, and mentoring leaders in transparent public administration.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 05
              </div>
            </div>

            {/* Focal Area 6: Culture and Arts (Highlife Music) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <MusicNoteIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Culture &amp; Arts (Highlife)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Honoring African heritage through Highlife music talent shows, live instrumentation, and youth artistic empowerment.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 06
              </div>
            </div>

            {/* Focal Area 7: Service */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <VolunteerActivismIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Service
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Upholding community welfare, secondary school bursaries, youth mentorship, and selfless civic stewardship.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 07
              </div>
            </div>

            {/* Focal Area 8: Aviation Trauma */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <FlightTakeoffIcon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-1 group-hover:text-brand-red transition-colors">
                  Aviation Trauma
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Advancing air travel safety research, passenger advocacy, and trauma support systems across Nigeria.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 text-[11px] font-mono text-outline">
                Focal Pillar 08
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR ACTIVITIES & EMPIRICAL IMPACT (PDF Pages 6 & 7) */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-20 bg-white border-y border-outline-variant/60" id="impact">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface font-ui">
                  Our Activities [1/12 &amp; 2/12]
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-on-surface">
                Impact In Concrete Numbers
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md mt-2 md:mt-0 font-body">
              Verified historical record of bursaries, full scholarships, E-Library donations, and university endowments.
            </p>
          </div>

          {/* 5 Impact Metrics from PDF Pages 6 & 7 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 text-center flex flex-col justify-center items-center">
              <span className="text-4xl lg:text-5xl font-bold font-display text-brand-red">9+</span>
              <span className="text-xs uppercase font-bold tracking-wider text-on-surface mt-2 font-ui">Memorial Lectures</span>
              <span className="text-[11px] text-outline mt-1 font-body">Organised annually on passing anniversary</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 text-center flex flex-col justify-center items-center">
              <span className="text-4xl lg:text-5xl font-bold font-display text-on-surface">400+</span>
              <span className="text-xs uppercase font-bold tracking-wider text-on-surface mt-2 font-ui">Secondary Bursaries</span>
              <span className="text-[11px] text-outline mt-1 font-body">Awards &amp; cash prizes given so far</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 text-center flex flex-col justify-center items-center">
              <span className="text-4xl lg:text-5xl font-bold font-display text-brand-red">50+</span>
              <span className="text-xs uppercase font-bold tracking-wider text-on-surface mt-2 font-ui">Tertiary Beneficiaries</span>
              <span className="text-[11px] text-outline mt-1 font-body">Across 4 tertiary institutions</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 text-center flex flex-col justify-center items-center">
              <span className="text-4xl lg:text-5xl font-bold font-display text-on-surface">75</span>
              <span className="text-xs uppercase font-bold tracking-wider text-on-surface mt-2 font-ui">Full Scholarships</span>
              <span className="text-[11px] text-outline mt-1 font-body">35 Adeleke Univ + 40 Premier &amp; Adeleke High</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 text-center flex flex-col justify-center items-center col-span-2 md:col-span-1">
              <span className="text-4xl lg:text-5xl font-bold font-display text-brand-red">&#8358;25M</span>
              <span className="text-xs uppercase font-bold tracking-wider text-on-surface mt-2 font-ui">E-Library Donation</span>
              <span className="text-[11px] text-outline mt-1 font-body">Donated to OAUSTECH</span>
            </div>
          </div>

          {/* Tertiary Endowment Fund Detail Box (PDF Page 7) */}
          <div className="mt-12 p-8 bg-surface-container-low rounded-3xl border border-outline-variant/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red block mb-1 font-ui">
                  Permanent University Endowment Fund (PDF Page 7)
                </span>
                <h3 className="text-2xl font-bold font-display text-on-surface">
                  Geology Cash Awards Across Four Tertiary Institutions
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-ui">
                <span className="px-4 py-2 rounded-full bg-white border border-outline-variant/60 font-semibold text-on-surface">
                  100&ndash;300 Level: &#8358;50,000 Award
                </span>
                <span className="px-4 py-2 rounded-full bg-brand-red text-white font-bold">
                  400 Level: &#8358;100,000 Award
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {[
                { name: 'University of Ibadan (UI)', desc: 'Premier Geology Department' },
                { name: 'Adekunle Ajasin University (AAUA)', desc: 'Akungba-Akoko, Ondo State' },
                { name: 'Federal University of Technology, Akure (FUTA)', desc: 'Applied Geology & Geophysics' },
                { name: 'Olusegun Agagu University of Science & Technology (OAUSTECH)', desc: 'Okitipupa, Ondo State' },
              ].map((inst, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-outline-variant/50">
                  <span className="text-[10px] uppercase font-bold text-outline font-ui block mb-1">
                    Endowed Institution 0{i + 1}
                  </span>
                  <h4 className="font-bold text-sm text-on-surface font-display">{inst.name}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 font-body">{inst.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Milestone: National Power Generation Scaling */}
          <div className="mt-16 pt-12 border-t border-outline-variant/60">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-1 font-ui">
                Federal Minister for Power &amp; Steel (2000&ndash;2002)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-on-surface">
                Scaling National Electrical Generation Capacity
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 font-body">
                As recorded in the official biography (PDF Page 2): power generation increased dramatically from 1,425 MW in 2000 to over 4,000 MW in 2002 with complementary reinforcement of transmission and distribution networks.
              </p>
            </div>
            <PowerCounter />
          </div>

          {/* Scholar Testimonials */}
          <ScholarVoices />
        </div>

        {/* Credo Placement 2: Full-Width Crimson Band */}
        <div className="mt-20 bg-crimson text-ivory py-14 px-6 text-center shadow-inner">
          <div className="max-w-3xl mx-auto">
            <blockquote className="font-playfair italic text-2xl sm:text-3xl lg:text-4xl text-gold-light leading-relaxed">
              &ldquo;To leave things better than he met them.&rdquo;
            </blockquote>
            <p className="font-ui text-sm sm:text-base text-ivory/90 mt-3 font-medium">
              And so, in 2014, the Foundation was born.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MEMORIAL LECTURES ARCHIVE (2014 – 2023 Decade of Legacy) */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-24 bg-surface-container-low text-on-surface" id="lectures">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface font-ui">
                Our Activities [3/12 to 12/12]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-on-surface">
              The Annual Memorial Lectures (2014&ndash;2023)
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3 font-body">
              Memorial lectures held every year on the anniversary of the passing of Dr. Olusegun Agagu, addressed by African heads of state, ministers, and eminent scholars.
            </p>
          </div>

          {/* Key Editions Cards (Direct from PDF Pages 8-17) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 2014 Inaugural Lecture (PDF Page 8) */}
            <div className="bg-white p-7 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-red text-white text-[11px] font-bold uppercase tracking-wider font-ui">
                    Inaugural &bull; 2014
                  </span>
                  <span className="text-xs font-mono text-outline">LEC-2014-01</span>
                </div>
                <h3 className="text-xl font-bold font-display text-on-surface mb-2">Keynote Address on Good Governance</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 font-body">
                  Delivered by H.E. Festus Gontebanye Mogae, Former President of Botswana (represented by the Ambassador of Botswana to Nigeria).
                </p>
                <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface mb-2 font-ui space-y-1">
                  <div><strong className="text-brand-red">Chaired by:</strong> H.E. Chief Olusegun Obasanjo (GCON), Former President of Nigeria</div>
                  <div><strong className="text-on-surface">Guest Speakers:</strong> Mrs. Omobola Johnson, Mr. A. Oba Otudeko (CFR), Chief Olusola Oke</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-ui">
                  Inaugural Convocation
                </span>
                <span className="text-[10px] font-mono text-outline">Lagos, Nigeria</span>
              </div>
            </div>

            {/* 2016 3rd Lecture (PDF Page 10) */}
            <div className="bg-white p-7 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-[11px] font-bold uppercase tracking-wider font-ui">
                    3rd Lecture &bull; 2016
                  </span>
                  <span className="text-xs font-mono text-outline">LEC-2016-03</span>
                </div>
                <h3 className="text-xl font-bold font-display text-on-surface mb-2">Regional Cooperation &amp; Integration in Africa</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 font-body">
                  Keynote Address by H.E. Benjamin Mkapa, Former President of Tanzania.
                </p>
                <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface mb-2 font-ui space-y-1">
                  <div><strong className="text-brand-red">Chaired by:</strong> H.E. Asiwaju Bola Ahmed Tinubu</div>
                  <div><strong className="text-on-surface">Special Guest:</strong> H.E. Ambassador Baba Gana Kingibe</div>
                  <div><strong className="text-on-surface">Goodwill Message:</strong> H.E. Chief Olusegun Obasanjo, GCFR</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-ui">
                  Continental Forum
                </span>
                <span className="text-[10px] font-mono text-outline">Lagos, Nigeria</span>
              </div>
            </div>

            {/* 2018 5th Lecture (PDF Page 12) */}
            <div className="bg-white p-7 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-[11px] font-bold uppercase tracking-wider font-ui">
                    5th Lecture &bull; 2018
                  </span>
                  <span className="text-xs font-mono text-outline">LEC-2018-05</span>
                </div>
                <h3 className="text-xl font-bold font-display text-on-surface mb-2">Women: A Needed Force in Politics and the Polity</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 font-body">
                  Keynote Address by Her Excellency, Former President Dr. Joyce Banda of Malawi.
                </p>
                <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface mb-2 font-ui space-y-1">
                  <div><strong className="text-brand-red">Chairman:</strong> H.R.H. Muhammadu Sanusi II (The Emir of Kano)</div>
                  <div><strong className="text-on-surface">Guest Speakers:</strong> Chief Folake Solanke SAN CON, Prof. Sheila Tlou (UN)</div>
                  <div><strong className="text-on-surface">Grand Patron:</strong> Chief Olusegun Obasanjo, GCFR</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-ui">
                  Women in Leadership
                </span>
                <span className="text-[10px] font-mono text-outline">Lagos, Nigeria</span>
              </div>
            </div>

            {/* 2019 6th Lecture (PDF Page 13) */}
            <div className="bg-white p-7 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-[11px] font-bold uppercase tracking-wider font-ui">
                    6th Lecture &bull; 2019
                  </span>
                  <span className="text-xs font-mono text-outline">LEC-2019-06</span>
                </div>
                <h3 className="text-xl font-bold font-display text-on-surface mb-2">Climate Change &amp; Population Migration in Africa</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 font-body">
                  Keynote Address by Her Excellency, Former President Dr. Ameenah Fakim-Gurib of Mauritius.
                </p>
                <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface mb-2 font-ui space-y-1">
                  <div><strong className="text-brand-red">Chairman:</strong> Chief Emeka Anyaoku (Former Commonwealth Sec-Gen)</div>
                  <div><strong className="text-on-surface">Chief Host:</strong> H.E. Babajide Sanwo-Olu (Governor of Lagos)</div>
                  <div><strong className="text-on-surface">Goodwill:</strong> Ms. Amina Mohammed OFR (UN Deputy Sec-General)</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-ui">
                  Climate &amp; Migration
                </span>
                <span className="text-[10px] font-mono text-outline">Lagos, Nigeria</span>
              </div>
            </div>

            {/* 2023 Decennial Milestone & Book Launch (PDF Page 17 - Double Width) */}
            <div className="bg-white p-7 rounded-3xl border-2 border-brand-red shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow md:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-red text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 font-ui">
                    <StarIcon className="w-3.5 h-3.5" />
                    Decennial Milestone &bull; 2023
                  </span>
                  <span className="text-xs font-mono text-brand-red font-bold">PDF Page 17</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-on-surface mb-2">
                  Compendium Launch &amp; Highlife Talent Show (2023)
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4 font-body">
                  Marking a decade of legacy with two historic cultural and policy milestones celebrating Dr. Agagu&apos;s enduring impact on good governance and African heritage.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 font-ui">
                  <div className="p-4 bg-surface-container rounded-2xl text-xs text-on-surface">
                    <strong className="text-brand-red block mb-1 text-sm font-display">Book Launch: A DECADE OF LEGACY</strong>
                    <p className="text-on-surface-variant leading-relaxed">
                      A Compendium of Policy Papers from the Olusegun Agagu Memorial Lectures was curated and launched with the aim of having it be a reference book and critical resource on good governance.
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container rounded-2xl text-xs text-on-surface">
                    <strong className="text-brand-red block mb-1 text-sm font-display">Highlife Music Concert</strong>
                    <p className="text-on-surface-variant leading-relaxed">
                      Featured and supported young Nigerian Highlife musicians, showcasing the richness of African heritage through electrifying performances, live instrumentation, and soulful melodies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <a
                  href={`mailto:${contactInfo.pressEmail}?subject=Compendium%20Inquiry%20%E2%80%93%20A%20Decade%20of%20Legacy`}
                  className="px-5 py-2 rounded-full bg-brand-red hover:bg-[#c41e15] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 focus-ring"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Inquire For Compendium Book
                </a>
                <span className="text-xs text-outline font-semibold font-ui">Permanent Policy Reference</span>
              </div>
            </div>
          </div>

          {/* Interactive Native Lecture Slide-Over Strip */}
          <MemorialLectureStrip />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOARD OF TRUSTEES (PDF Page 5) */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-24 bg-white text-on-surface" id="board">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface font-ui">
                  About The Foundation &bull; PDF Page 5
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-on-surface">
                The Board of Trustees
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md mt-2 md:mt-0 font-body">
              The assiduous team that keeps this legacy going, stewarding Dr. Agagu&apos;s philanthropic vision and fiduciary excellence.
            </p>
          </div>

          {/* Active Trustees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biography.boardOfTrustees
              .filter((t) => !t.role.includes('Emeritus') && !t.role.includes('Memoriam'))
              .map((trustee, idx) => {
                const initials = trustee.name
                  .replace(/^(Dr\.|Chief|Mrs\.|Alhaji|Ms\.|Mr\.|Prof\.)\s*/g, '')
                  .split(' ')
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')

                return (
                  <div
                    key={idx}
                    className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 flex flex-col justify-between hover:shadow-lg transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/60 flex items-center justify-center font-display font-bold text-xl text-brand-red shadow-sm group-hover:bg-brand-red group-hover:text-white transition-colors">
                          {initials}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block font-ui">
                            {trustee.role}
                          </span>
                          <h3 className="font-bold text-base text-on-surface font-display">
                            {trustee.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                        {trustee.role === 'Chairman' &&
                          'Providing overarching fiduciary direction, institutional partnerships, and endowment leadership.'}
                        {trustee.role === 'Secretary' &&
                          'Directing secretariat operations, tertiary scholarship verifications, and administrative compliance.'}
                        {trustee.role === 'Trustee' &&
                          'Contributing strategic oversight, educational endowment governance, and civic stewardship.'}
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-outline pt-3 border-t border-outline-variant/40 mt-4">
                      {trustee.note ? trustee.note : 'Board of Trustees &bull; Active'}
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Historic & Emeritus Trustees (PDF Page 5) */}
          <div className="mt-12 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/50 text-xs font-ui text-on-surface-variant flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-bold uppercase tracking-wider text-on-surface block mb-1">
                Historic Trustees &bull; PDF Page 5:
              </span>
              <span>
                Professor Dele Fawole (stepped down 2018) &bull; Prince Yemi Adefulu MFR (Late)
              </span>
            </div>
            <div className="text-outline font-mono">
              In Perpetual Honor of Foundation Founders
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FUTURE INITIATIVES (PDF Page 18) */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-24 bg-surface-container-low text-on-surface" id="initiatives">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface font-ui">
                Strategic Horizons &bull; PDF Page 18
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-on-surface">
              Future Initiatives
            </h2>
            <p className="text-base text-on-surface-variant mt-3 font-body">
              Expanding the Foundation&apos;s reach through multi-year strategic programmes across universities, literature, and aviation safety.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Initiative 1: Scholarships and Awards Programme (PDF Page 18) */}
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
                  <SchoolIcon className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block mb-1 font-ui">
                  Initiative I
                </span>
                <h3 className="text-xl font-bold font-display text-on-surface mb-3">
                  Scholarships &amp; Awards Expansion
                </h3>
                <ul className="text-xs text-on-surface-variant space-y-2 mb-6 font-body list-disc pl-4">
                  {biography.futureInitiatives.scholarshipsAndAwards.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between text-xs font-ui">
                <span className="text-outline">Geology &amp; Petroleum Eng.</span>
                <span className="font-bold text-brand-red">Active Scheme</span>
              </div>
            </div>

            {/* Initiative 2: Autobiography (PDF Page 18) */}
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
                  <HistoryEduIcon className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block mb-1 font-ui">
                  Initiative II
                </span>
                <h3 className="text-xl font-bold font-display text-on-surface mb-3">
                  Official Autobiography Publication
                </h3>
                <ul className="text-xs text-on-surface-variant space-y-2 mb-6 font-body list-disc pl-4">
                  {biography.futureInitiatives.autobiography.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between text-xs font-ui">
                <span className="text-outline">Memoir &amp; Archives</span>
                <span className="font-bold text-brand-red">In Development</span>
              </div>
            </div>

            {/* Initiative 3: Other Initiatives (PDF Page 18) */}
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
                  <FlightTakeoffIcon className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block mb-1 font-ui">
                  Initiative III
                </span>
                <h3 className="text-xl font-bold font-display text-on-surface mb-3">
                  Research &amp; Aviation Safety Interventions
                </h3>
                <ul className="text-xs text-on-surface-variant space-y-2 mb-6 font-body list-disc pl-4">
                  {biography.futureInitiatives.otherInitiatives.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between text-xs font-ui">
                <span className="text-outline">Aviation Safety &amp; Mentoring</span>
                <span className="font-bold text-brand-red">Strategic Action</span>
              </div>
            </div>
          </div>

          {/* Institutional Partnership Call Card */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl border border-outline-variant/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-display text-on-surface">Partner with the Olusegun Agagu Foundation</h3>
              <p className="text-sm text-on-surface-variant mt-1 font-body">We welcome university endowments, research affiliations, and community education partnerships.</p>
            </div>
            <a
              className="px-8 py-3.5 rounded-full bg-brand-red hover:bg-[#c41e15] text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-md focus-ring"
              href={`mailto:${contactInfo.pressEmail}?subject=Institutional%20Partnership%20Inquiry%20%E2%80%93%20OAF`}
            >
              Inquire for Partnership &rarr;
            </a>
          </div>

          {/* Credo Placement 4: Full-Width Crimson Closing Banner */}
          <div className="mt-14 bg-crimson text-ivory py-14 px-6 rounded-3xl text-center shadow-lg">
            <blockquote className="font-playfair italic text-2xl sm:text-3xl lg:text-4xl text-gold-light leading-relaxed max-w-3xl mx-auto">
              &ldquo;Together, we hope we can continue to do more &lsquo;to leave things better than we met them&rsquo;.&rdquo;
            </blockquote>
            <span className="font-ui text-xs uppercase tracking-widest text-ivory/80 block mt-4 font-semibold">
              &mdash; Our Thanks &bull; PDF Page 19
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PHOTOGRAPHIC MEMOIR ARCHIVE */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-24 bg-[#140b0a] text-white" id="gallery">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 font-ui">
                Photographic Archive
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
              Moments in a Life Well Lived
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-2 font-body">
              An Archival Photographic Memoir capturing six decades of scholarship, statesmanship, and grace.
            </p>
          </div>

          <PhotoGallery photos={galleryPhotos} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CLOSING TRIBUTE, OUR THANKS & DIGITAL CONDOLENCE BOOK (PDF Page 19) */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-24 bg-[#140b0a] text-white relative overflow-hidden" id="tribute">
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-red/20 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Portrait Vignette */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-900 group">
                <div className="relative w-full h-[480px]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIPECvsJpvYgoRST1FZfWB1eXmmON9fG3faID-CV55j_FKp8IWk3fWoPj3b-Ixr2eERC8S17MOkHhLPeI0ZiU3YDI7IJaUZlEgx3FBMf3QuU6qmf0Kt3fcGYqnQ77rCNPFZApmpTrVltqx36OpU9P4Td3ZNaPOuCEywH1hRbhVrAdj_W_nfMOafm6Woi91wO9vP7_yOUzj9E6P9H3W3tifeXOPyrJ1bAUNvDyhojdB"
                    alt="Archival Memorial Portrait of Dr. Olusegun Kokumo Agagu CON"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1 font-ui">In Loving Memory</span>
                  <p className="text-xl font-bold font-headline">H.E. Dr. Olusegun Kokumo Agagu, CON</p>
                  <p className="text-xs text-white/70 font-mono mt-1">16 February 1948 &mdash; 13 September 2013</p>
                </div>
              </div>
            </div>

            {/* Memorial Text & Our Thanks (PDF Page 19) */}
            <div className="lg:col-span-7 flex flex-col gap-6 items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-tertiary text-xs uppercase font-bold tracking-wider font-ui">
                <CandleIcon className="w-4 h-4" />
                Perpetual Remembrance &bull; Our Thanks (PDF Page 19)
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-white leading-tight">
                Our Thanks &amp; Living Tribute
              </h2>
              <div className="p-6 bg-white/5 border-l-4 border-brand-red rounded-r-2xl w-full space-y-3">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body">
                  &ldquo;We thank all those who have supported the initiative and enabled these good works to continue.&rdquo;
                </p>
                <blockquote className="text-xl sm:text-2xl font-headline italic text-tertiary leading-snug">
                  &ldquo;Together, we hope we can continue to do more &lsquo;to leave things better than we met them&rsquo;.&rdquo;
                </blockquote>
                <span className="text-xs uppercase tracking-wider text-white/60 block mt-2 font-bold font-ui">
                  &mdash; The Olusegun Agagu Foundation
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-body">
                Visitors, scholars, and citizens are warmly invited to inscribe their personal reflections, reminiscences, and tributes into the permanent digital memorial registry.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  className="px-8 py-3.5 rounded-full bg-brand-red hover:bg-[#c41e15] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md focus-ring"
                  href="#tribute-form"
                >
                  Inscribe in Condolence Book
                </a>
                <a
                  className="text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white transition-colors focus-ring"
                  href="#contact"
                >
                  Contact Secretariat &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Digital Book of Condolences */}
          <TributeRegistry />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. OFFICIAL SECRETARIAT CONTACT (PDF Page 20) */}
      {/* ========================================================================= */}
      <section style={{ display: 'none' }} className="py-20 bg-surface-container-low text-on-surface border-t border-outline-variant/60" id="contact">
        <div className="max-w-[1340px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface font-ui">
                Contact Us &bull; PDF Page 20
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-on-surface">
              The Olusegun Agagu Foundation Secretariat
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 font-body">
              For bursaries, university endowments, Memorial Lecture papers, and institutional correspondence.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-outline-variant/60 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-outline block mb-1 font-ui">
                  Organization
                </span>
                <h3 className="font-bold text-lg text-on-surface font-display">
                  Olusegun Agagu Foundation
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 font-body">
                  A registered philanthropic endowment and memorial trust.
                </p>

                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline block mb-1 font-ui">
                    Secretariat Contact Person
                  </span>
                  <p className="font-bold text-sm text-on-surface font-ui">Mr. Feyisayo Agagu</p>
                  <p className="text-xs text-brand-red font-semibold font-ui">Secretary, Board of Trustees</p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-ui">
                <div className="p-4 bg-surface-container rounded-2xl">
                  <span className="text-outline uppercase block font-semibold text-[10px] mb-1">
                    Official Email
                  </span>
                  <a
                    href="mailto:fagagu@yahoo.com"
                    className="text-brand-red font-bold text-sm hover:underline focus-ring rounded"
                  >
                    fagagu@yahoo.com
                  </a>
                </div>

                <div className="p-4 bg-surface-container rounded-2xl">
                  <span className="text-outline uppercase block font-semibold text-[10px] mb-1">
                    Telephone Line
                  </span>
                  <a
                    href="tel:+2348030597100"
                    className="text-on-surface font-bold text-sm hover:underline focus-ring rounded"
                  >
                    +2348030597100
                  </a>
                </div>

                <div className="p-4 bg-surface-container rounded-2xl">
                  <span className="text-outline uppercase block font-semibold text-[10px] mb-1">
                    Official Web Portal
                  </span>
                  <a
                    href="https://olusegunagagufoundation.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-red font-bold text-sm hover:underline focus-ring rounded inline-flex items-center gap-1"
                  >
                    <span>https://olusegunagagufoundation.org</span>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
