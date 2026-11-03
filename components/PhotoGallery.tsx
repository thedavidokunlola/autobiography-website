import Image from 'next/image'
import { type GalleryPhoto } from '@/data/photos'

interface PhotoGalleryProps {
  photos: GalleryPhoto[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  // RULE-G4: masonry grid: 3 cols desktop, 2 cols tablet, 1 col mobile
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {photos.map((photo) => (
        // RULE-P2: full-res link wraps <Image>, no lightbox / modal / carousel
        // RULE-A4: sr-only span for external link announcement
        <a
          key={photo.src}
          href={photo.fullResSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="block break-inside-avoid focus-ring rounded-2xl overflow-hidden border border-[#e5e5e5] bg-[#fcfbf9] shadow-sm group hover:border-brand-red hover:shadow-md transition-all"
        >
          <div className="relative overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              quality={80}
              loading="lazy"
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      ))}
    </div>
  )
}
