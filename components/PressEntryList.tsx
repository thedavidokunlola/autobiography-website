import { type PressEntry } from '@/data/press'
import { formatPressDate } from '@/lib/formatDate'

interface PressEntryListProps {
  entries: PressEntry[]
  totalEntriesCount: number
}

export function PressEntryList({ entries, totalEntriesCount }: PressEntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-border p-8">
        <p className="font-playfair italic text-text-secondary">
          {totalEntriesCount > 0
            ? 'No press entries match your search. Try adjusting the filters.'
            : 'Press archive coming soon.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {entries.map((entry, index) => (
        <article
          key={`${entry.publication}-${entry.date}-${index}`}
          className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-sm hover:border-gold transition-all flex flex-col justify-between"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-ivory font-ui font-semibold text-charcoal uppercase tracking-wider border border-border">
                {entry.publication}
              </span>
              <time dateTime={entry.date} className="text-text-secondary font-ui text-[11px]">
                {formatPressDate(entry.date)}
              </time>
            </div>
            <h3 className="text-xl font-bold font-playfair text-charcoal">
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-crimson transition-colors focus-ring rounded"
              >
                {entry.title}
                {/* RULE-A4: sr-only span is required pattern, not aria-label */}
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </h3>
            <p className="text-charcoal/80 text-sm leading-relaxed font-body">
              {entry.summary}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-border flex items-center text-xs font-ui">
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold uppercase tracking-wider text-crimson hover:underline focus-ring rounded flex items-center gap-1"
            >
              <span>Read Full Article &rarr;</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}
