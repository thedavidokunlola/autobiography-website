import { type WorkEntry } from '@/data/work'
import { WorkEntryItem } from '@/components/WorkEntry'

interface WorkCategoryProps {
  category: string
  entries: WorkEntry[]
}

export function WorkCategory({ category, entries }: WorkCategoryProps) {
  // RULE-P8: if category has zero entries, H2 does not render
  if (entries.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 bg-crimson rounded-[2px]" />
        <h2 className="text-2xl font-bold font-playfair text-charcoal">{category}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entries.map((entry) => (
          <WorkEntryItem key={entry.organization + entry.startDate} entry={entry} />
        ))}
      </div>
    </section>
  )
}
