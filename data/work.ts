import 'server-only'

export interface WorkEntry {
  category: 'Foundation' | 'NGO' | 'Advisory Role'
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
  learnMoreUrl?: string
}

export const workEntries: WorkEntry[] = []
