import React from 'react'

interface CulturalProps {
  className?: string
}

/**
 * Adire Geometric SVG Border Pattern (Architecture v2.0 Cultural Texture System)
 * Used as a section divider in rhythm: crimson / gold / slate.
 */
export function AdireDivider({ className = 'w-full h-4 text-gold' }: CulturalProps) {
  return (
    <div className={`overflow-hidden flex items-center justify-center my-6 ${className}`} aria-hidden="true">
      <svg
        className="w-full h-4"
        viewBox="0 0 1200 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat"
      >
        <pattern id="adire-rhythm" width="48" height="16" patternUnits="userSpaceOnUse">
          {/* Diamond motif with inner stepped square - traditional Yoruba Adire motif */}
          <path d="M24 0L36 8L24 16L12 8L24 0Z" fill="#B8933A" fillOpacity="0.45" />
          <path d="M24 3L31.5 8L24 13L16.5 8L24 3Z" fill="#7A1418" fillOpacity="0.75" />
          <circle cx="24" cy="8" r="2" fill="#2B3A4A" />
          <path d="M0 8H12M36 8H48" stroke="#B8933A" strokeWidth="1" strokeOpacity="0.5" />
        </pattern>
        <rect width="100%" height="16" fill="url(#adire-rhythm)" />
      </svg>
    </div>
  )
}

/**
 * Adire Pattern Background (Subtle 6% opacity background for Section 2B)
 */
export function AdireBackground({ className = 'absolute inset-0 pointer-events-none opacity-6' }: CulturalProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="adire-bg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M30 0L60 30L30 60L0 30Z M30 10L50 30L30 50L10 30Z M30 20L40 30L30 40L20 30Z"
            stroke="#B8933A"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#adire-bg-grid)" />
      </svg>
    </div>
  )
}

/**
 * Traditional Fila (Yoruba Cap) Silhouette SVG
 * Appears exclusively in Section 2B (Cultural Interlude).
 */
export function FilaSilhouette({ className = 'w-20 h-16 text-gold' }: CulturalProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Elegant contoured profile of a traditional Yoruba folded fila (Gobi / Abeti-Aja fold) */}
      <path
        d="M8 44C8 44 6 36 12 30C18 24 32 16 48 10C58 6 68 8 72 12C76 16 74 24 66 28C56 32 38 36 24 40C16 42 10 44 8 44Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M10 42C12 45 20 48 40 48C60 48 70 44 72 41C74 38 72 34 68 32C60 36 44 40 28 41C18 42 12 41 10 42Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M20 45C30 47 50 47 62 45"
        stroke="#F7F3EC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  )
}

/**
 * Official OAF Crest Emblem
 */
export function OafCrest({ className = 'w-10 h-10', light = false }: { className?: string; light?: boolean }) {
  return (
    <div
      className={`rounded-full border flex items-center justify-center p-1.5 transition-transform ${
        light
          ? 'bg-ivory/10 border-gold/40 text-gold-light'
          : 'bg-crimson/10 border-crimson/30 text-crimson'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L3 6V12C3 17.5 6.8 22.7 12 24C17.2 22.7 21 17.5 21 12V6L12 2ZM12 4.2L19 7.3V12C19 16.3 16 20.5 12 21.8C8 20.5 5 16.3 5 12V7.3L12 4.2ZM12 7L7 10V14L12 17L17 14V10L12 7ZM12 9.2L15 11V13.2L12 15L9 13.2V11L12 9.2Z" />
      </svg>
    </div>
  )
}

