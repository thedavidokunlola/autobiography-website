import React from 'react'

interface AcademicNode {
  id: string
  year: string
  title: string
  summary: string
  detail: string
}

const NODES: AcademicNode[] = [
  {
    id: 'node-1948',
    year: '1948',
    title: 'Born in Ondo State',
    summary: 'Early Roots & Heritage',
    detail:
      'Born on 16 February 1948 in Okitipupa. Completed formative education at St. Dominic’s Primary School and Ebenezer Grammar School with distinction in Natural Sciences.',
  },
  {
    id: 'node-1974',
    year: '1974',
    title: 'M.Sc. Geology',
    summary: 'University of Texas, Austin',
    detail:
      'Earned Master of Science in Geology from the University of Texas at Austin, specializing in subsurface stratigraphic mapping and petroleum basin evaluation.',
  },
  {
    id: 'node-1974-78',
    year: '1974\u20131978',
    title: 'Research Scientist',
    summary: 'U.S. Atomic Energy Commission',
    detail:
      'Served as Research Scientist investigating geothermal energy reservoirs and thermal energy extraction under federal scientific grants in the United States.',
  },
  {
    id: 'node-1978',
    year: '1978',
    title: 'Ph.D. Petroleum Geology',
    summary: 'University of Ibadan',
    detail:
      'Completed seminal doctorate at Nigeria’s premier university. His dissertation on Nigerian sedimentary basins remains a foundational benchmark for energy exploration.',
  },
  {
    id: 'node-1980s',
    year: '1980s',
    title: 'Senior Don & Consultant',
    summary: 'UI Faculty of Science',
    detail:
      'Lectured for sixteen years in the Department of Geology, University of Ibadan, while serving as senior geological consultant to major oil multinationals globally.',
  },
]

export function ScholarTimeline() {
  return (
    <div className="w-full my-8">
      {/* Desktop Horizontal View & Mobile Responsive Stack */}
      <div className="relative">
        {/* Horizontal gold connecting guide on desktop */}
        <div
          className="hidden lg:block absolute top-12 left-8 right-8 h-[2px] bg-gold/40"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
          {NODES.map((node) => (
            <details
              key={node.id}
              className="group bg-slate/50 border border-gold/30 rounded-2xl p-4 lg:p-5 transition-all hover:border-gold focus-within:ring-2 focus-within:ring-gold"
            >
              <summary className="list-none cursor-pointer flex lg:flex-col items-center lg:text-center justify-between gap-3 focus:outline-none">
                <span className="font-playfair font-bold text-lg lg:text-xl text-gold-light order-2 lg:order-1">
                  {node.year}
                </span>

                {/* Gold Circle Indicator */}
                <div
                  className="w-5 h-5 rounded-full bg-gold border-2 border-slate flex items-center justify-center shrink-0 order-1 lg:order-2 transition-transform group-hover:scale-125"
                  aria-hidden="true"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                </div>

                <div className="flex-1 lg:flex-none order-3">
                  <span className="block font-playfair font-semibold text-sm text-ivory">
                    {node.title}
                  </span>
                  <span className="block text-[11px] font-ui text-ivory/70 uppercase tracking-wider mt-0.5">
                    {node.summary}
                  </span>
                </div>

                {/* Visual expand icon */}
                <span
                  className="text-gold text-xs transition-transform duration-200 group-open:rotate-180 order-4"
                  aria-hidden="true"
                >
                  &#9662;
                </span>
              </summary>

              {/* Expanded Card Content */}
              <div className="mt-4 pt-3 border-t border-gold/20 text-xs sm:text-sm text-ivory/90 leading-relaxed font-body">
                {node.detail}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

