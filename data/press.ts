import 'server-only'

export interface PressEntry {
  publication: string
  date: string
  title: string
  summary: string
  url: string
  videoEmbedUrl?: string
}

export const pressEntries: PressEntry[] = []
