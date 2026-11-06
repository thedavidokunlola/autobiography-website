import Image from 'next/image'
import { type GalleryPhoto } from '@/data/photos'

interface PhotoGalleryProps {
  photos: GalleryPhoto[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  // RULE-G4: masonry grid: 3 cols desktop, 2 cols tablet, 1 col mobile with 16px column gap
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {photos.map((photo) => (
        // RULE-P2: full-res link wraps <Image>, no lightbox / modal / carousel
        // RULE-A4: sr-only span for external link announcement
        <a
          key={photo.src}
          href={photo.fullResSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mb-4 break-inside-avoid rounded-[8px] overflow-hidden border border-[#e5e5e5] bg-[#fcfbf9] shadow-sm group hover:border-brand-red hover:shadow-md transition-all focus-ring"
        >
          <div className="relative overflow-hidden rounded-[8px]">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              quality={80}
              loading="lazy"
              className="w-full h-auto block rounded-[8px] transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      ))}
    </div>
  )
}
