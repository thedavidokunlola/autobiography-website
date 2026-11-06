import { type WorkEntry } from '@/data/work'
import { formatDate } from '@/lib/formatDate'

interface WorkEntryProps {
  entry: WorkEntry
}

export function WorkEntryItem({ entry }: WorkEntryProps) {
  const endDateDisplay = entry.endDate === 'Present' ? 'Present' : formatDate(entry.endDate)

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border shadow-sm hover:border-gold transition-all flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="font-ui text-xs font-bold uppercase tracking-wider text-crimson">
            {entry.role}
          </span>
          <span className="text-xs font-ui text-text-secondary px-3 py-1 bg-ivory rounded-full border border-border">
            {formatDate(entry.startDate)} &ndash; {endDateDisplay}
          </span>
        </div>
        <h3 className="font-bold text-xl font-playfair text-charcoal mb-3">
          {entry.organization}
        </h3>
        <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed mb-4 font-body">
          {entry.description}
        </p>
      </div>

      {entry.learnMoreUrl && (
        <div className="pt-4 border-t border-border flex items-center font-ui">
          <a
            href={entry.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-crimson hover:underline focus-ring rounded flex items-center gap-1"
          >
            <span>Learn more &rarr;</span>
            {/* RULE-A4: sr-only span is required pattern, not aria-label */}
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      )}
    </div>
  )
}
