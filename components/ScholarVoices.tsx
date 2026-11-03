interface ScholarTestimonial {
  name: string
  institution: string
  year: string
  quote?: string
  initials: string
}

const SCHOLARS: ScholarTestimonial[] = [
  {
    name: 'Adeleke Scholar Beneficiary',
    institution: 'Adeleke University',
    year: 'Class of 2020',
    quote:
      'The Olusegun Agagu Foundation did not just fund my tertiary tuition; they instilled in us the responsibility to leave our communities better than we met them.',
    initials: 'AS',
  },
  {
    name: 'Bursary Prize Recipient',
    institution: 'OAUSTECH, Okitipupa',
    year: 'Department of Geology, 2021',
    quote:
      'Studying in the very university Dr. Agagu founded, his academic excellence bursary was the catalyst that powered my research into subsurface sedimentary basins.',
    initials: 'BP',
  },
  {
    name: 'Secondary Excellence Scholar',
    institution: 'Premier College, Ijebu Ode',
    year: 'Bursary Awardee, 2019',
    quote:
      'This space belongs to a scholar whose life this Foundation has touched. Their story is an enduring testament to living educational philanthropy.',
    initials: 'SS',
  },
]

export function ScholarVoices() {
  return (
    <div className="w-full my-12 pt-8 border-t border-gold/30">
      <div className="mb-8">
        <span className="font-ui font-semibold text-xs text-gold uppercase tracking-[0.2em] block mb-2">
          Living Beneficiaries
        </span>
        {/* STRATEGY & IA REVIEW: Replaced corporate buzzword 'Human Proof' with dignified 'Scholar Reflections' and simplified introductory copy */}
        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-ivory">
          Scholar Reflections
        </h3>
        <p className="text-sm font-ui text-ivory/70 mt-1 max-w-xl">
          Students and graduates whose education has been supported through Foundation bursaries and endowed scholarships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SCHOLARS.map((sc, i) => (
          <div
            key={i}
            className="bg-black/25 border border-gold/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-md relative"
          >
            <div>
              {/* Large Gold Opening Quotation Mark at 4rem */}
              <span
                className="font-playfair text-[4rem] text-gold/40 leading-none select-none block -mb-6"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="font-playfair italic text-sm sm:text-base text-ivory leading-relaxed mb-6 pt-2">
                {sc.quote}
              </p>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center gap-3">
              {/* Gold Initials Monogram Circle */}
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold flex items-center justify-center font-playfair font-bold text-xs text-gold-light shrink-0">
                {sc.initials}
              </div>
              <div className="text-xs">
                <span className="font-playfair font-semibold text-ivory block leading-snug">
                  {sc.name}
                </span>
                <span className="font-ui text-[11px] text-ivory/70 block mt-0.5">
                  {sc.institution} &bull; {sc.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STRATEGY & IA REVIEW / FIX 2: Pointed previously broken anchor #apply-support to #contact where Secretariat handles scholarship and bursary correspondence */}
      <div className="mt-8 text-center sm:text-left">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-ui font-semibold text-gold hover:text-gold-light transition-colors group focus-ring rounded"
        >
          <span>Inquire About Scholarships</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  )
}

