import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date().toISOString()

  // RULE-S2: 404 page excluded from sitemap
  return [
    {
      url: 'https://example.com/',
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://example.com/press',
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/work',
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/contact',
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
