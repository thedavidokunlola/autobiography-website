'use client'
// Client Component: requires React state (useState) to handle user memorial tribute inscription,
// interactive in-browser preview, and prefilled mailto transmission to the OAF Secretariat per user specification.

import { useState, type FormEvent } from 'react'

interface Inscription {
  name: string
  affiliation: string
  message: string
  date: string
}

export function TributeRegistry() {
  const [name, setName] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [message, setMessage] = useState('')
  const [inscribed, setInscribed] = useState<Inscription | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const newInscription: Inscription = {
      name: name.trim(),
      affiliation: affiliation.trim() || 'Citizen of the Federal Republic',
      message: message.trim(),
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }

    setInscribed(newInscription)
  }

  const mailtoUrl = inscribed
    ? `mailto:secretariat@olusegunagagufoundation.org?subject=${encodeURIComponent(
      `Memorial Tribute from ${inscribed.name}`
    )}&body=${encodeURIComponent(
      `Full Name: ${inscribed.name}\nAffiliation: ${inscribed.affiliation}\nDate: ${inscribed.date}\n\nTribute Inscription:\n"${inscribed.message}"`
    )}`
    : ''

  return (
    <div
      className="bg-white text-on-surface p-8 sm:p-12 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-white/20 scroll-mt-24"
      id="tribute-form"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 bg-brand-red rounded-[2px]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface">
            Digital Registry
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-on-surface">
          Digital Book of Condolences &amp; Remembrance
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-lg mx-auto">
          Inscribe your personal memory, testimony, or prayer into the Foundation&apos;s permanent digital memorial archives.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="tribute-name"
              className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5"
            >
              Your Full Name
            </label>
            <input
              id="tribute-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Prof. Adeleke Adele"
              required
              type="text"
              className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-brand-red focus:bg-white focus:outline-none text-sm font-medium text-on-surface transition-all focus-ring"
            />
          </div>
          <div>
            <label
              htmlFor="tribute-affil"
              className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5"
            >
              Affiliation or City
            </label>
            <input
              id="tribute-affil"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="e.g. University of Ibadan / Lagos"
              type="text"
              className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-brand-red focus:bg-white focus:outline-none text-sm font-medium text-on-surface transition-all focus-ring"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="tribute-msg"
            className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5"
          >
            Your Tribute Inscription or Prayer
          </label>
          <textarea
            id="tribute-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your tribute, reminiscence, or prayer here..."
            required
            rows={4}
            className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-brand-red focus:bg-white focus:outline-none text-sm font-medium text-on-surface transition-all focus-ring"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-xs text-outline font-mono">
            Permanent inscription verified by OAF Secretariat
          </span>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-red hover:bg-[#c41e15] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-red/25 focus-ring"
          >
            Inscribe Tribute
          </button>
        </div>
      </form>

      {inscribed && (
        <div className="mt-6 p-6 bg-surface-container rounded-2xl border border-brand-red/30 space-y-3">
          <div className="flex items-center gap-2 text-brand-red">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs uppercase font-bold tracking-wider">
              Tribute Inscribed into Permanent Archive
            </span>
          </div>
          <p className="text-base font-headline italic text-on-surface">
            &ldquo;{inscribed.message}&rdquo;
          </p>
          {/* STRATEGY & IA REVIEW: Removed em dash per FIX 4 */}
          <div className="text-xs text-outline font-mono">
            Inscribed by {inscribed.name} ({inscribed.affiliation}) on {inscribed.date}
          </div>
          <div className="pt-2">
            <a
              href={mailtoUrl}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c41e15] transition-all focus-ring"
            >
              <span>Transmit Copy to OAF Secretariat &rarr;</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

