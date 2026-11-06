import Image from 'next/image'
import { type GalleryPhoto } from '@/data/photos'

interface PhotoGalleryProps {
  photos: GalleryPhoto[]
}

function distributePhotos(photos: GalleryPhoto[], numCols: number): GalleryPhoto[][] {
  const cols: GalleryPhoto[][] = Array.from({ length: numCols }, () => [])
  const heights = Array(numCols).fill(0)

  for (const photo of photos) {
    let minCol = 0
    for (let c = 1; c < numCols; c++) {
      if (heights[c] < heights[minCol]) {
        minCol = c
      }
    }
    cols[minCol].push(photo)
    heights[minCol] += photo.height / photo.width
  }

  return cols
}

function PhotoCard({ photo }: { photo: GalleryPhoto }) {
  // RULE-P2: full-res link wraps <Image>, no lightbox / modal / carousel
  // RULE-A4: sr-only span for external link announcement
  return (
    <a
      href={photo.fullResSrc}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-[8px] overflow-hidden border border-[#e5e5e5] bg-[#fcfbf9] shadow-sm group hover:border-brand-red hover:shadow-md transition-all focus-ring"
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
  )
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  // RULE-G4: masonry grid: 3 cols desktop, 2 cols tablet, 1 col mobile with balanced column heights
  const cols3 = distributePhotos(photos, 3)
  const cols2 = distributePhotos(photos, 2)

  return (
    <>
      {/* Desktop: 3-column height-balanced masonry grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 items-start">
        {cols3.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            {col.map((photo) => (
              <PhotoCard key={photo.src} photo={photo} />
            ))}
          </div>
        ))}
      </div>

      {/* Tablet: 2-column height-balanced masonry grid */}
      <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-4 items-start">
        {cols2.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            {col.map((photo) => (
              <PhotoCard key={photo.src} photo={photo} />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: 1-column stack */}
      <div className="flex flex-col gap-4 md:hidden">
        {photos.map((photo) => (
          <PhotoCard key={photo.src} photo={photo} />
        ))}
      </div>
    </>
  )
}
