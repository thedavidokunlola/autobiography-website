'use client'
// Client Component: requires useState for keyword input, publication/year filter state — RULE-B4

import { useState, useMemo, useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { type PressEntry } from '@/data/press'

interface PressFilterProps {
  entries: PressEntry[]
  onFilterChange: (filtered: PressEntry[]) => void
}

export function PressFilter({ entries, onFilterChange }: PressFilterProps) {
  const [keyword, setKeyword] = useState('')
  const [publication, setPublication] = useState('')
  const [year, setYear] = useState('')

  // RULE-P4: publication and year filters use <select> dropdowns, not button groups
  const publications = useMemo(() => {
    const unique = Array.from(new Set(entries.map((e) => e.publication)))
    return unique.sort()
  }, [entries])

  const years = useMemo(() => {
    const unique = Array.from(new Set(entries.map((e) => e.date.slice(0, 4))))
    return unique.sort((a, b) => b.localeCompare(a))
  }, [entries])

  const isFilterActive = keyword !== '' || publication !== '' || year !== ''

  const filtered = useMemo(() => {
    let result = entries

    // RULE-P5: keyword filter fires synchronously on each keystroke, no debounce
    if (keyword.trim() !== '') {
      const lower = keyword.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(lower) ||
          e.publication.toLowerCase().includes(lower) ||
          e.summary.toLowerCase().includes(lower)
      )
    }

    if (publication !== '') {
      result = result.filter((e) => e.publication === publication)
    }

    if (year !== '') {
      result = result.filter((e) => e.date.startsWith(year))
    }

    return result.sort((a, b) => b.date.localeCompare(a.date))
  }, [entries, keyword, publication, year])

  // Communicate filtered results to parent
  useEffect(() => {
    onFilterChange(filtered)
  }, [filtered, onFilterChange])

  function handleClearFilters() {
    setKeyword('')
    setPublication('')
    setYear('')
  }

  return (
    <div className="mb-10">
      {/* RULE-A7: press filter wrapped in <fieldset> with <legend> */}
      <fieldset className="border border-border bg-white rounded-3xl p-6 lg:p-8 shadow-sm">
        <legend className="section-label text-crimson px-3">
          Filter Media Archive
        </legend>

        <div className="flex flex-col sm:flex-row gap-5">
          {/* Keyword search */}
          <div className="flex-1">
            <label
              htmlFor="press-keyword"
              className="block text-xs font-ui font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5"
            >
              Search Archive
            </label>
            <input
              id="press-keyword"
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
                // PRIVACY HOLD: keyword filter_value withheld pending NDPR/GDPR compliance confirmation (RULE-V1)
                sendGAEvent('filter_applied', {
                  filter_type: 'keyword',
                  // filter_value: e.target.value ← intentionally omitted — PRIVACY HOLD
                })
              }}
              onKeyDown={(e) => {
                // Heuristic #3 & #7: Support Escape key to instantly reset search input
                if (e.key === 'Escape') {
                  setKeyword('')
                }
              }}
              placeholder="Search by title, publication, or summary... (Esc to clear)"
              className="w-full px-4 py-3 bg-ivory/50 border border-border rounded-xl text-sm font-ui text-charcoal focus-ring focus:border-crimson focus:bg-white transition-all"
            />
          </div>

          {/* Publication filter — RULE-P4: <select> dropdown only */}
          <div className="sm:w-64">
            <label
              htmlFor="press-publication"
              className="block text-xs font-ui font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5"
            >
              Publication
            </label>
            <select
              id="press-publication"
              value={publication}
              onChange={(e) => {
                setPublication(e.target.value)
                sendGAEvent('filter_applied', {
                  filter_type: 'publication',
                  filter_value: e.target.value,
                })
              }}
              className="w-full px-4 py-3 bg-ivory/50 border border-border rounded-xl text-sm font-ui text-charcoal focus-ring focus:border-crimson focus:bg-white transition-all"
            >
              <option value="">All publications</option>
              {publications.map((pub) => (
                <option key={pub} value={pub}>
                  {pub}
                </option>
              ))}
            </select>
          </div>

          {/* Year filter — RULE-P4: <select> dropdown only */}
          <div className="sm:w-40">
            <label
              htmlFor="press-year"
              className="block text-xs font-ui font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5"
            >
              Year
            </label>
            <select
              id="press-year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value)
                sendGAEvent('filter_applied', {
                  filter_type: 'year',
                  filter_value: e.target.value,
                })
              }}
              className="w-full px-4 py-3 bg-ivory/50 border border-border rounded-xl text-sm font-ui text-charcoal focus-ring focus:border-crimson focus:bg-white transition-all"
            >
              <option value="">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RULE-P6: Clear filters button invisible when no filter active */}
        {isFilterActive && (
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-ui font-bold uppercase tracking-wider text-crimson hover:underline focus-ring rounded"
            >
              &larr; Clear all filters
            </button>
            <span className="text-xs text-charcoal/60 font-ui">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'} found
            </span>
          </div>
        )}
      </fieldset>
    </div>
  )
}
