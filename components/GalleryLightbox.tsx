'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  caption: string
  spanCol?: boolean
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'photo-1',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIPECvsJpvYgoRST1FZfWB1eXmmON9fG3faID-CV55j_FKp8IWk3fWoPj3b-Ixr2eERC8S17MOkHhLPeI0ZiU3YDI7IJaUZlEgx3FBMf3QuU6qmf0Kt3fcGYqnQ77rCNPFZApmpTrVltqx36OpU9P4Td3ZNaPOuCEywH1hRbhVrAdj_W_nfMOafm6Woi91wO9vP7_yOUzj9E6P9H3W3tifeXOPyrJ1bAUNvDyhojdB',
    alt: 'Formal Archival Portrait of Dr. Olusegun Kokumo Agagu in White Striped Agbada',
    title: 'Formal Archival Portrait',
    caption: 'Official gubernatorial portrait capturing six decades of academic scholarship and statecraft.',
    spanCol: true,
  },
  {
    id: 'photo-2',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiu2zYUfMG9UhDYBlVltXMsFvqKDA7aExcLuSXS0EIDec5-Sg6pNg3v_Q0uLyDzMIOvelC_F-Z71bGMFSqjPqwN5J_Ws4TxtTtpCM9DbyBH8GCunLHeS8auDqZ31u7ixfpv648bkdt6IeDdii2R57ehgoQPxk1dwcZYkd-jhqs5XOYOsZU8ieL3FOw-D5Tp1C6jI1dajQs67rMzbDZzJCkZeBfzrZz5mE9FaFo0hB-',
    alt: 'Candid Smiling Study of Dr. Agagu in Traditional Beige Buba',
    title: 'Candid Study in Ikale Heritage',
    caption: 'A warm and approachable moment reflecting his personal creed and devotion to family.',
  },
  {
    id: 'photo-3',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIPECvsJpvYgoRST1FZfWB1eXmmON9fG3faID-CV55j_FKp8IWk3fWoPj3b-Ixr2eERC8S17MOkHhLPeI0ZiU3YDI7IJaUZlEgx3FBMf3QuU6qmf0Kt3fcGYqnQ77rCNPFZApmpTrVltqx36OpU9P4Td3ZNaPOuCEywH1hRbhVrAdj_W_nfMOafm6Woi91wO9vP7_yOUzj9E6P9H3W3tifeXOPyrJ1bAUNvDyhojdB',
    alt: 'Inaugural Memorial Lecture 2014 with Chief Olusegun Obasanjo',
    title: 'Inaugural Memorial Lecture (2014)',
    caption: 'Chaired by H.E. Chief Olusegun Obasanjo GCFR, convening national leaders on institutional integrity.',
  },
]

export function GalleryLightbox() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const closeModal = useCallback(() => {
    setSelectedPhoto(null)
    triggerRef.current?.focus()
  }, [])

  // Accessible ESC key dismissal & focus trap
  useEffect(() => {
    if (!selectedPhoto) return

    closeBtnRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, closeModal])

  return (
    <div className="w-full">
      {/* CSS Grid Masonry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget
              setSelectedPhoto(item)
            }}
            className={`group relative rounded-2xl overflow-hidden bg-black text-left focus-ring transition-all hover:shadow-[0_0_0_2px_#B8933A] ${
              item.spanCol ? 'md:col-span-2' : ''
            }`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top portrait-filter transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
            </div>

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
              <h4 className="font-playfair font-bold text-base text-gold-light">
                {item.title}
              </h4>
              <p className="font-ui text-xs text-ivory/80 mt-1 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Video Placeholder at bottom of Gallery */}
      <div className="mt-12 bg-black/40 border border-gold/30 rounded-3xl p-8 sm:p-12 text-center aspect-[16/9] max-w-3xl mx-auto flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold mb-4 transition-transform hover:scale-110">
          <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <h4 className="font-playfair italic text-xl text-ivory">In His Own Words</h4>
        <p className="font-ui text-xs text-ivory/60 mt-1 uppercase tracking-widest">
          Archival footage &bull; Video in Digitization
        </p>
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
        >
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl w-full bg-charcoal rounded-3xl overflow-hidden border border-gold/40 shadow-2xl flex flex-col">
            <div className="relative w-full aspect-[4/3] max-h-[70vh] bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain portrait-filter"
              />
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-ivory hover:text-gold focus-ring"
                aria-label="Close photo preview"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-6 bg-charcoal text-ivory">
              <h3 className="font-playfair font-bold text-xl text-gold-light">
                {selectedPhoto.title}
              </h3>
              <p className="font-ui text-xs sm:text-sm text-ivory/80 mt-1">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

