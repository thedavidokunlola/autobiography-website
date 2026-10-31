import React from 'react'

interface IconProps {
  className?: string
}

export function SchoolIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 19.94 8.13 22 12 22C15.87 22 19 19.94 19 17.18V13.18L12 17L5 13.18Z" />
    </svg>
  )
}

export function ScienceIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 19H5C3.9 19 3 18.1 3 17V7C3 5.9 3.9 5 5 5H6V3H8V5H16V3H18V5H19C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19ZM5 7V17H19V7H5ZM6 8H11V13H6V8ZM13 8H18V10H13V8ZM13 11H18V13H13V11ZM6 14H18V16H6V14Z" />
    </svg>
  )
}

export function FlaskIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.8 18.4L14 9.7V4H15C15.6 4 16 3.6 16 3C16 2.4 15.6 2 15 2H9C8.4 2 8 2.4 8 3C8 3.6 8.4 4 9 4H10V9.7L4.2 18.4C3.7 19.2 4.3 20.2 5.2 20.2H18.8C19.7 20.2 20.3 19.2 19.8 18.4ZM7.5 18L11 12.8V4H13V12.8L16.5 18H7.5Z" />
    </svg>
  )
}

export function BankIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1L2 6V8H22V6L12 1ZM4 19H7V10H4V19ZM10 19H14V10H10V19ZM17 19H20V10H17V19ZM2 22H22V20H2V22Z" />
    </svg>
  )
}

export function LibraryIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM12 5.5V14.5L14.5 13L17 14.5V5.5H12Z" />
    </svg>
  )
}

export function HealthIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" />
    </svg>
  )
}

export function HistoryEduIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 4V2C9 1.45 8.55 1 8 1H4C3.45 1 3 1.45 3 2V4H1V6H3V17C3 18.66 4.34 20 6 20H18C19.66 20 21 18.66 21 17V6H23V4H9ZM19 17C19 17.55 18.55 18 18 18H6C5.45 18 5 17.55 5 17V6H19V17ZM17 9H7V8H17V9ZM15 12H7V11H15V12ZM12 15H7V14H12V15Z" />
    </svg>
  )
}

export function ArrowForwardIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function VerifiedIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 12L20.56 9.22L20.9 5.54L17.29 4.72L15.4 1.54L12 3L8.6 1.54L6.71 4.72L3.1 5.53L3.44 9.21L1 12L3.44 14.78L3.1 18.47L6.71 19.29L8.6 22.47L12 21L15.4 22.46L17.29 19.28L20.9 18.46L20.56 14.78L23 12ZM10.09 16.72L6.29 12.91L7.7 11.5L10.09 13.89L16.08 7.9L17.5 9.32L10.09 16.72Z" />
    </svg>
  )
}

export function StarIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  )
}

export function DownloadIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function PdfIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM11.5 9.5C11.5 10.3 10.8 11 10 11H9V8H10C10.8 8 11.5 8.7 11.5 9.5ZM16.5 10.5H15V8.5H16.5C17.1 8.5 17.5 8.9 17.5 9.5C17.5 10.1 17.1 10.5 16.5 10.5ZM13.5 13H12V8H13.5C14.3 8 15 8.7 15 9.5V11.5C15 12.3 14.3 13 13.5 13ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z" />
    </svg>
  )
}

export function CandleIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C11.5 2 11 2.4 11 3C11 4.5 12 6 12 6C12 6 13 4.5 13 3C13 2.4 12.5 2 12 2ZM9 9V22H15V9H9Z" />
    </svg>
  )
}

export function SolarPowerIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2L14.4 7.2L20 8L16 12L17 17.6L12 15L7 17.6L8 12L4 8L9.6 7.2L12 2ZM3 20H21V22H3V20Z" />
    </svg>
  )
}

export function MilitaryTechIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17 10.43V2H7V10.43C5.78 11.27 5 12.68 5 14.28C5 16.88 7.12 19 9.72 19H10V22H14V19H14.28C16.88 19 19 16.88 19 14.28C19 12.68 18.22 11.27 17 10.43ZM9 4H15V9.45L12 8.25L9 9.45V4Z" />
    </svg>
  )
}

