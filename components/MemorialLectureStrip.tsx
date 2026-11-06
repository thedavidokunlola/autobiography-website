'use client'
// Client Component: requires React state (useState, useRef) and DOM APIs for horizontal drag-scroll & modal lecture view — RULE-B4

import { useState, useEffect, useRef, useCallback } from 'react'

interface LectureYear {
  year: string
  lectureNumber: string
  theme: string
  keynote: string
  country: string
  isVirtual?: boolean
  chair?: string
  guestSpeakers?: string[]
  specialGuests?: string[]
  goodwill?: string
  grandPatron?: string
  panelSpeakers?: string[]
  location?: string
}

const LECTURES: LectureYear[] = [
  {
    year: '2014',
    lectureNumber: '1st Memorial Lecture',
    theme: 'Good Governance and National Integrity',
    keynote: 'H.E. Festus Gontebanye Mogae',
    country: 'Former President of Botswana',
    chair: 'H.E. Chief Olusegun Obasanjo, GCON (Former President of Nigeria)',
    guestSpeakers: [
      'Mrs. Omobola Johnson, Honourable Minister of Communication Technology',
      'Mr. A. Oba Otudeko, CFR, Chairman, Honeywell Group',
      'Chief Olusola Oke',
    ],
    location: 'Nigerian Institute of International Affairs (NIIA)',
  },
  {
    year: '2015',
    lectureNumber: '2nd Memorial Lecture',
    theme: 'Resources, Policy and the Economics',
    keynote: 'H.E. Edem Kodjo (rep. Cornelius Aidam)',
    country: 'Former Prime Minister of Togo',
    chair: 'H.E. Chief Olusegun Obasanjo, GCON',
    specialGuests: [
      'Professor Ibrahim Agboola Gambari, Former Foreign Minister & UN Under-Secretary General',
    ],
  },
  {
    year: '2016',
    lectureNumber: '3rd Memorial Lecture',
    theme: 'Imperatives of Regional Cooperation and Integration in Africa',
    keynote: 'H.E. Benjamin Mkapa',
    country: 'Former President of Tanzania',
    chair: 'H.E. Asiwaju Bola Ahmed Tinubu',
    specialGuests: ['H.E. Ambassador Baba Gana Kingibe'],
    goodwill: 'H.E. Chief Olusegun Obasanjo, GCFR',
  },
  {
    year: '2017',
    lectureNumber: '4th Memorial Lecture',
    theme: 'Wealth Creation through Entrepreneurship in Changing Economic Cycles',
    keynote: 'H.E. Joaquim Alberto Chissano',
    country: 'Former President of Mozambique',
    chair: 'H.M. Igwe Nnaemeka Alfred Achebe, CFR (Obi of Onitsha)',
    guestSpeakers: ['H.E. Dr. Kayode Fayemi, CON (Minister of Mines & Steel)'],
    specialGuests: ['H.E. Chief (Dr.) E. A. O. Shonekan, GCFR, CBE'],
    grandPatron: 'H.E. Chief Olusegun Obasanjo, GCFR',
    location: 'Civic Centre, Victoria Island',
  },
  {
    year: '2018',
    lectureNumber: '5th Memorial Lecture',
    theme: 'Women: a Needed Force in Politics and the Polity',
    keynote: 'H.E. Dr. Joyce Banda',
    country: 'Former President of Malawi',
    chair: 'H.R.H. Muhammadu Sanusi II (The Emir of Kano)',
    guestSpeakers: [
      'Chief Folake Solanke, SAN, CON',
      'Prof. Sheila Tlou (United Nations Director)',
    ],
    grandPatron: 'H.E. Chief Olusegun Obasanjo, GCFR',
    location: 'Civic Centre, Victoria Island',
  },
  {
    year: '2019',
    lectureNumber: '6th Memorial Lecture',
    theme: 'Climate Change and the Problem of Population Migration in Africa',
    keynote: 'H.E. Dr. Ameenah Fakim-Gurib',
    country: 'Former President of Mauritius',
    chair: 'Chief Emeka Anyaoku (Former Commonwealth Secretary General)',
    specialGuests: [
      'H.E. Babajide Sanwo-Olu, Executive Governor of Lagos State (Chief Host)',
      'Ms. Amina Mohammed, OFR (UN Deputy Secretary-General - Goodwill Message)',
      'Prof. Oye Ibidapo-Obe (Former Vice-Chancellor, UNILAG)',
    ],
    location: 'Civic Centre, Victoria Island',
  },
  {
    year: '2020',
    lectureNumber: '7th Memorial Lecture (Virtual)',
    theme: 'Embracing Culture as a Driver of Progress',
    keynote: 'H.E. Rosalía Arteaga Serrano',
    country: 'Former President of Ecuador',
    isVirtual: true,
    guestSpeakers: [
      'Hon. Ben Murray-Bruce, Founder of Silverbird Group',
      'Polly Alakija, Chairman, Lagos State Council for Arts and Culture',
      'Bimbo Esho, MD, Evergreen Musical Company',
    ],
    location: 'Global Virtual Broadcast',
  },
  {
    year: '2021',
    lectureNumber: '8th Memorial Lecture (Virtual)',
    theme: 'Entrepreneurship: Intergenerational Approaches to Building Wealth',
    keynote: 'High-Level Colloquium on African Enterprise',
    country: 'African Diaspora Network & Tech Innovation',
    isVirtual: true,
    panelSpeakers: [
      'Almaz Negash: Founder & Executive Director, African Diaspora Network',
      'Odunayo Eweniyi: Co-Founder & COO, PiggyVest',
      'Iyinoluwa ‘E’ Aboyeji: General Partner & Co-Founder, Future Africa',
    ],
    location: 'Global Hybrid Symposium',
  },
  {
    year: '2022',
    lectureNumber: '9th Memorial Lecture',
    theme: 'Leadership, Continental Transformation & Sovereign Stewardship',
    keynote: 'H.E. Dr. Ernest Bai Koroma',
    country: 'Former President of Sierra Leone',
    panelSpeakers: [
      'Dr. Benedict Okey Oramah: Chairman of the Board, Afreximbank',
      'Ndidi Nwuneli: Expert on Social Innovation & Agriculture',
      'Akindele Phillips: Co-Founder & CEO, Farmcrowdy',
      'Prof. Lateef Sanni: Renowned Post-Harvest & Food Security Expert',
    ],
  },
  {
    year: '2023',
    lectureNumber: 'Compendium Launch and Highlife Concert',
    theme: 'A Decade of Legacy: Policy Compendium Launch & Highlife Music Concert',
    keynote: 'Launch of Policy Compendium & Youth Highlife Showcase',
    country: 'Marking 10 Years of Enduring Legacy',
    chair: 'The Olusegun Agagu Foundation Board of Trustees',
  },
]

export function MemorialLectureStrip() {
  const [selectedLecture, setSelectedLecture] = useState<LectureYear | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const closePanel = useCallback(() => {
    setSelectedLecture(null)
    triggerRef.current?.focus()
  }, [])

  // Focus trap inside slide-over panel
  useEffect(() => {
    if (!selectedLecture) return

    closeBtnRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closePanel()
        return
      }

      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedLecture, closePanel])

  return (
    <div className="w-full my-8">
      {/* Layer 1 — Native CSS Horizontal Scroll Strip */}
      <div
        className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
        tabIndex={0}
        aria-label="Annual Memorial Lectures Carousel. Use arrow keys to scroll."
      >
        {LECTURES.map((lec) => (
          <div
            key={lec.year}
            className="w-[260px] sm:w-[280px] shrink-0 bg-white border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-gold transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-playfair font-bold text-3xl text-crimson">
                  {lec.year}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-ivory text-charcoal border border-border text-[9.5px] font-ui uppercase tracking-wider font-semibold max-w-[160px] truncate">
                  {lec.lectureNumber}
                </span>
              </div>

              <h4 className="font-playfair italic text-sm text-charcoal leading-snug line-clamp-2 mb-3">
                {lec.theme}
              </h4>

              <div className="text-xs">
                <span className="font-ui font-medium text-gold block truncate">
                  {lec.keynote}
                </span>
                <span className="font-ui text-text-secondary text-[11px] block mt-0.5">
                  {lec.country}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget
                  setSelectedLecture(lec)
                }}
                className="text-xs font-ui font-semibold text-crimson hover:text-gold transition-colors flex items-center gap-1 focus-ring rounded"
              >
                <span>View full details</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Layer 2 — Slide-Over Detail Panel */}
      {selectedLecture && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lecture-panel-title"
        >
          {/* 60% Dark Overlay */}
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={closePanel}
            aria-hidden="true"
          />

          {/* Panel Container (520px wide desktop, 100vw mobile, 240ms ease-out) */}
          <div
            ref={panelRef}
            className="relative z-10 w-full lg:max-w-[520px] h-full bg-crimson text-ivory p-6 lg:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ivory/20 pb-4 mb-6">
                <div>
                  <span className="text-gold text-xs font-ui uppercase tracking-widest font-semibold block">
                    {selectedLecture.lectureNumber}
                  </span>
                  <span
                    id="lecture-panel-title"
                    className="font-playfair font-bold text-4xl text-gold-light"
                  >
                    {selectedLecture.year}
                  </span>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closePanel}
                  className="p-2 text-ivory hover:text-gold rounded-full focus-ring"
                  aria-label="Close lecture details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Theme */}
              <div className="mb-6">
                <span className="font-ui text-[11px] uppercase tracking-wider text-gold-light/80 block mb-1">
                  Lecture Theme
                </span>
                <h3 className="font-playfair italic text-xl text-ivory leading-snug">
                  &ldquo;{selectedLecture.theme}&rdquo;
                </h3>
                {selectedLecture.location && (
                  <span className="font-ui text-xs text-ivory/70 mt-2 block">
                    Venue: {selectedLecture.location}
                  </span>
                )}
              </div>

              {/* Keynote Block */}
              <div className="p-4 bg-black/20 rounded-xl border border-gold/30 mb-5">
                <span className="font-ui text-[10px] uppercase tracking-widest text-gold block mb-1">
                  Keynote Address
                </span>
                <h4 className="font-playfair font-bold text-lg text-ivory">
                  {selectedLecture.keynote}
                </h4>
                <p className="font-ui text-xs text-ivory/80 mt-0.5">
                  {selectedLecture.country}
                </p>
              </div>

              {/* Chair Block */}
              {selectedLecture.chair && (
                <div className="mb-5">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-gold-light/80 block mb-1">
                    Chairman of the Occasion
                  </span>
                  <p className="font-playfair text-sm text-ivory font-medium">
                    {selectedLecture.chair}
                  </p>
                </div>
              )}

              {/* Guest Speakers */}
              {selectedLecture.guestSpeakers && (
                <div className="mb-5">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-gold-light/80 block mb-2">
                    Distinguished Guest Speakers
                  </span>
                  <ul className="space-y-2 text-xs font-playfair italic text-ivory/90">
                    {selectedLecture.guestSpeakers.map((spk, idx) => (
                      <li key={idx} className="border-l-2 border-gold pl-3">
                        {spk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Special Guests */}
              {selectedLecture.specialGuests && (
                <div className="mb-5">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-gold-light/80 block mb-2">
                    Special Guests of Honour
                  </span>
                  <ul className="space-y-1.5 text-xs font-playfair text-ivory/90">
                    {selectedLecture.specialGuests.map((sg, idx) => (
                      <li key={idx}>{sg}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Panel Speakers */}
              {selectedLecture.panelSpeakers && (
                <div className="mb-5">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-gold-light/80 block mb-2">
                    Colloquium Panelists
                  </span>
                  <ul className="space-y-2 text-xs font-playfair text-ivory/90">
                    {selectedLecture.panelSpeakers.map((p, idx) => (
                      <li key={idx} className="border-l-2 border-gold pl-3">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Goodwill / Grand Patron */}
              {(selectedLecture.goodwill || selectedLecture.grandPatron) && (
                <div className="pt-3 border-t border-ivory/20 text-xs font-ui text-ivory/80">
                  {selectedLecture.goodwill && (
                    <p className="mb-1">
                      <strong className="text-gold">Goodwill Message:</strong>{' '}
                      {selectedLecture.goodwill}
                    </p>
                  )}
                  {selectedLecture.grandPatron && (
                    <p>
                      <strong className="text-gold">Grand Patron:</strong>{' '}
                      {selectedLecture.grandPatron}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Panel Close Action */}
            <div className="pt-6 border-t border-ivory/20 mt-6 flex justify-end">
              <button
                type="button"
                onClick={closePanel}
                className="px-6 py-2.5 rounded-full bg-ivory text-charcoal font-ui font-semibold text-xs uppercase tracking-wider hover:bg-gold-light transition-colors focus-ring"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

