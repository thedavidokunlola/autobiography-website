'use client'

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

const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    numeral: 'I',
    shortTitle: 'Early Roots',
    period: '1948 \u2013 1971',
    code: 'BIO-01',
    headline: 'Early Life, Heritage & Intellectual Genesis in Okitipupa',
    content:
      'Born on 16 February 1948 in the vibrant historical settlement of Okitipupa in Ondo State, Olusegun Kokumo Agagu demonstrated an extraordinary intellectual aptitude from boyhood. Raised with unyielding discipline, his formative schooling at St. Dominic’s Primary School and Ebenezer Grammar School set the stage for an academic genius destined to shape Nigeria’s post-colonial geological understanding.',
    highlights: [
      { label: 'Top honors in Natural Sciences (1967)' },
      { label: 'Mentoring youth across Ikale land' },
    ],
  },
  {
    id: 'ch2',
    numeral: 'II',
    shortTitle: 'Geologist & Don',
    period: '1972 \u2013 1998',
    code: 'BIO-02',
    headline: 'The Pioneering Petroleum Geologist & University Don',
    content:
      'For sixteen dedicated years, Dr. Agagu served on the faculty of the Department of Geology at the University of Ibadan, mentoring generations of earth scientists who went on to lead major oil majors globally. His seminal papers on Nigerian sedimentary basins, deep-water stratigraphy, and petroleum reservoirs remain masterworks cited worldwide.',
    quote:
      '“The earth does not yield its riches to reckless guesswork; it surrenders to rigorous measurement and patient scientific insight.”',
  },
  {
    id: 'ch3',
    numeral: 'III',
    shortTitle: 'Federal Minister',
    period: '1999 \u2013 2002',
    code: 'BIO-03',
    headline: 'Statesman at the National Helm: Aviation, Power & Steel',
    content:
      'At the dawn of Nigeria’s Fourth Republic, President Olusegun Obasanjo called upon Dr. Agagu’s scientific mind. As Minister of Aviation, he instituted vital radar overhauls and safety audits. In Power and Steel, he laid the framework for landmark energy unbundling, championing sustainable electrical grids for emerging industrial hubs.',
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
    headline: 'The Executive Governor & Architect of Ondo Modernity',
    content:
      'Assuming the mantle as Governor of Ondo State in May 2003, Dr. Agagu instituted the famous "Roadmap to Progress" \u2014 a scientifically budgeted masterplan. He established Ondo State University of Science and Technology (OSUTECH, now OAUSTECH in his honor), paved thousands of kilometers of coastal and highland roads, and left an unprecedented fiscal surplus.',
    highlights: [
      { label: 'Establishment of OAUSTECH' },
      { label: 'Roadmap to Progress Masterplan' },
    ],
  },
  {
    id: 'ch5',
    numeral: 'V',
    shortTitle: 'The Patriarch',
    period: 'The Patriarch',
    code: 'BIO-05',
    headline: 'The Gentle Patriarch, Devoted Husband & Mentor',
    content:
      'Beyond the corridors of power, Dr. Agagu was a gentle patriarch of unflinching kindness. Married to his beloved life partner, Her Excellency Chief (Mrs.) Olufunke Agagu, their union was a bedrock of grace and hospitality for nearly 40 years. He was an approachable mentor to young scholars and a devout believer who lived to uplift fellow human beings.',
    highlights: [
      { label: 'Beloved father of 3, grandfather of 7+' },
      { label: 'Enduring creed of philanthropy & service' },
    ],
  },
]

export function BiographicalChapters() {
  const [activeChapterId, setActiveChapterId] = useState('ch1')
  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0]

  return (
    <div className="mt-20 pt-16 border-t border-white/10" id="chapters">
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
          <span className="text-xs text-white/50 font-mono">
            ARCHIVE CODE: {activeChapter.code}
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

