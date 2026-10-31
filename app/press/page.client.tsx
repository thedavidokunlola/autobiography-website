'use client'
// Client Component: bridges Server Component (press page) to Client Component (PressFilter) state

import { useState, useCallback } from 'react'
import { type PressEntry } from '@/data/press'
import { PressFilter } from '@/components/PressFilter'
import { PressEntryList } from '@/components/PressEntryList'

interface PressPageClientProps {
  entries: PressEntry[]
}

export function PressPageClient({ entries }: PressPageClientProps) {
  const [filteredEntries, setFilteredEntries] = useState<PressEntry[]>(entries)

  const handleFilterChange = useCallback(
    (filtered: PressEntry[]) => {
      setFilteredEntries(filtered)
    },
    []
  )

  // RULE-P6: Update isFilterActive detection
  // This is handled inside PressFilter for the clear button visibility
  // A more precise approach: the parent monitors whether filters differ

  return (
    <>
      {/* Condition 1: if archive completely empty, hide filter controls */}
      {entries.length > 0 && (
        <div className="mb-8">
          <PressFilter entries={entries} onFilterChange={handleFilterChange} />
        </div>
      )}

      <PressEntryList
        entries={filteredEntries}
        totalEntriesCount={entries.length}
      />
    </>
  )
}
