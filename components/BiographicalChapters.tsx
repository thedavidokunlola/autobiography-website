'use client'
// Client Component: requires React state (useState) for interactive chapter tab navigation — RULE-B4

import { useState } from 'react'

interface Chapter {
  id: string
  numeral: string
  shortTitle: string
  period: string
  code: string
  headline: string
  content: string
  highlights?: Array<{ label: string; detail?: string }>
  quote?: string
}

// STRATEGY & IA REVIEW: Streamlined chapter narratives into clear, dignified English; removed corporate buzzwords and em dashes per FIX 4
const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    numeral: 'I',
    shortTitle: 'Early Roots',
    period: '1948 \u2013 1971',
    code: 'BIO-01',
    headline: 'Early Life, Education & Roots in Okitipupa',
    content:
      'Born on 16 February 1948 in Okitipupa, Ondo State, Olusegun Kokumo Agagu was a dedicated student from his youth. His schooling at St. Dominic’s Primary School and Ebenezer Grammar School prepared him for a distinguished career in geology and public service.',
    highlights: [
      { label: 'Honours in Natural Sciences (1967)' },
      { label: 'Youth mentorship across Ikale land' },
    ],
  },
  {
    id: 'ch2',
    numeral: 'II',
    shortTitle: 'Geologist & Don',
    period: '1972 \u2013 1998',
    code: 'BIO-02',
    headline: 'Petroleum Geologist & University Lecturer',
    content:
      'For sixteen years, Dr. Agagu taught at the Department of Geology at the University of Ibadan, training many of Nigeria’s leading earth scientists and publishing widely on Nigerian sedimentary basins and petroleum geology.',
    quote:
      '“The earth does not yield its riches to reckless guesswork; it surrenders to rigorous measurement and patient scientific insight.”',
  },
  {
    id: 'ch3',
    numeral: 'III',
    shortTitle: 'Federal Minister',
    period: '1999 \u2013 2002',
    code: 'BIO-03',
    headline: 'Federal Minister: Aviation, Power & Steel',
    content:
      'In 1999, President Olusegun Obasanjo appointed Dr. Agagu to the Federal Cabinet. As Minister of Aviation, he led improvements in air safety. As Minister of Power and Steel, he oversaw a rise in national power generation from 1,425 MW to over 4,000 MW alongside transmission improvements.',
    highlights: [
      { label: 'Aviation Safety Modernization (1999\u20132000)' },
      { label: 'Power grid capacity scaled to 4,000+ MW' },
    ],
  },
  {
    id: 'ch4',
    numeral: 'IV',
    shortTitle: 'Executive Governor',
    period: '2003 \u2013 2009',
    code: 'BIO-04',
    headline: 'Governor of Ondo State (2003\u20132009)',
    content:
      'As Governor of Ondo State from 2003 to 2009, Dr. Agagu introduced the Roadmap to Progress, a clear development plan for the state. He founded the Ondo State University of Science and Technology (now OAUSTECH), built critical road networks, and managed public funds with prudence.',
    highlights: [
      { label: 'Establishment of OAUSTECH' },
      { label: 'Roadmap to Progress Plan' },
    ],
  },
  {
    id: 'ch5',
    numeral: 'V',
    shortTitle: 'The Patriarch',
    period: '2009 \u2013 2013',
    code: 'BIO-05',
    headline: 'Family Life & Devotion to Community',
    content:
      'Dr. Agagu was a devoted family man married to his wife, Mrs. Olufunke Agagu, for more than 39 years. Together they raised three children and were blessed with grandchildren. Throughout his life, he remained an approachable mentor and a community leader who sought to leave things better than he met them.',
    highlights: [
      { label: 'Father of 3 and grandfather of 7' },
      { label: 'Enduring credo of service to others' },
    ],
  },
]

export function BiographicalChapters() {
  const [activeChapterId, setActiveChapterId] = useState('ch1')
  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0]

  return (
    <div className="mt-20 pt-16 border-t border-white/10 scroll-mt-24" id="chapters">
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-tertiary font-ui block mb-2">
            | BIOGRAPHICAL CHRONOLOGY |
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            The 5 Chapters of a Consequential Life
          </h3>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Biographical Chapters">
          {CHAPTERS.map((ch) => {
            const isActive = ch.id === activeChapterId
            return (
              <button
                key={ch.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${ch.id}`}
                id={`tab-${ch.id}`}
                onClick={() => setActiveChapterId(ch.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus-ring ${
                  isActive
                    ? 'bg-brand-red text-white shadow-lg'
                    : 'bg-[#0c0805] text-white/75 border border-white/10 hover:border-tertiary hover:text-white'
                }`}
              >
                {ch.numeral}. {ch.shortTitle}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dynamic Chapter Display Card */}
      <div
        id={`panel-${activeChapter.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeChapter.id}`}
        className="bg-[#0c0805] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col gap-5 transition-all duration-300"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-tertiary">
            Chapter {activeChapter.numeral} &bull; {activeChapter.period}
          </span>
        </div>

        <h4 className="text-xl sm:text-2xl font-bold text-white font-headline">
          {activeChapter.headline}
        </h4>

        <p className="text-base text-[#c1c0c0] leading-relaxed font-body">
          {activeChapter.content}
        </p>

        {activeChapter.quote && (
          <div className="p-5 bg-[#140b0a] rounded-xl text-sm italic font-headline text-white/95 border-l-4 border-brand-red mt-2">
            {activeChapter.quote}
          </div>
        )}

        {activeChapter.highlights && (
          <div className="flex flex-wrap gap-3 pt-2">
            {activeChapter.highlights.map((h, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-[#140b0a] rounded-xl text-xs font-semibold text-white/90 border border-white/10"
              >
                {h.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

