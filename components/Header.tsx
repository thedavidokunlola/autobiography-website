'use client'
// Client Component: requires scroll listener for 80px background transition,
// active section observation, mobile nav focus trap (RULE-A3), and GA tracking (RULE-P9).

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sendGAEvent } from '@next/third-parties/google'
import { OafCrest } from './CulturalElements'

interface HeaderProps {
  siteName: string
  pressEmail: string
}

const NAV_LINKS = [
  { href: '/#hero', label: 'Home', sectionId: 'hero' },
  { href: '/#about', label: 'Biography', sectionId: 'about' },
  { href: '/#foundation', label: 'The Foundation', sectionId: 'foundation' },
  { href: '/#impact', label: 'Impact & Endowments', sectionId: 'impact' },
  { href: '/#lectures', label: 'Memorial Lectures', sectionId: 'lectures' },
  { href: '/#board', label: 'Trustees', sectionId: 'board' },
  { href: '/#initiatives', label: 'Future Initiatives', sectionId: 'initiatives' },
  { href: '/#tribute', label: 'Condolences', sectionId: 'tribute' },
]

export function Header({ siteName, pressEmail }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Scroll listener: transparent over hero, solid crimson (#7A1418) after 80px
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Track active section for anchor links on home page
      if (pathname === '/') {
        const sections = ['hero', 'about', 'foundation', 'impact', 'lectures', 'board', 'initiatives', 'tribute', 'gallery']
        for (const sec of sections) {
          const el = document.getElementById(sec)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 140 && rect.bottom >= 140) {
              setActiveSection(sec)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  // RULE-A3: Keyboard focus trap inside open mobile menu
  useEffect(() => {
    if (!menuOpen) return

    const menu = menuRef.current
    if (!menu) return

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    closeButtonRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }

      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    menu.addEventListener('keydown', handleKeyDown)
    return () => menu.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen, closeMenu])

  // RULE-A8: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== '/'
          ? 'bg-crimson text-ivory shadow-lg border-b border-gold/20'
          : 'bg-transparent text-ivory border-b border-white/10'
      }`}
    >
      <div className="max-w-container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: OAF crest logo links to top */}
        <Link
          href="/#hero"
          className="flex items-center gap-3 group focus-ring rounded-lg"
          aria-label={`${siteName} - Return to top`}
        >
          <OafCrest className="w-10 h-10 group-hover:scale-105" light={true} />
          <div className="flex flex-col">
            <span className="font-playfair font-bold text-lg text-ivory tracking-tight leading-none">
              OAF Archive
            </span>
            <span className="font-ui text-gold-light text-[10px] tracking-[0.16em] uppercase font-semibold mt-1">
              Memorial &amp; Library
            </span>
          </div>
        </Link>

        {/* Center: Main Navigation Links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 font-ui text-[13.5px]">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === '/'
                ? activeSection === link.sectionId
                : pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors text-ivory/80 hover:text-ivory focus-ring ${
                  isActive ? 'text-ivory font-medium' : ''
                }`}
              >
                {link.label}
                {/* 2px gold underline on active section — no background change */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* RULE-P9: Press Contact accessible in header without scrolling */}
          <a
            href={`mailto:${pressEmail}?subject=Press%20Inquiry%20%E2%80%93%20OAF%20Archive`}
            onClick={() =>
              sendGAEvent('contact_click', {
                link_type: 'press_email',
                link_url: `mailto:${pressEmail}`,
              })
            }
            className="text-xs font-ui uppercase tracking-wider text-ivory/70 hover:text-gold-light transition-colors px-2 py-1 focus-ring"
          >
            Press Desk
          </a>

          {/* Explore Archive Button */}
          <Link
            href="/#gallery"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-[#120807] font-semibold text-xs uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all shadow-md focus-ring"
          >
            Explore Archive
          </Link>

          {/* Sign Ledger (Brand Red Button) */}
          <Link
            href="/#tribute-form"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-red text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#c41e15] transition-all shadow-lg shadow-brand-red/25 focus-ring"
          >
            Sign Ledger
          </Link>
        </div>

        {/* Mobile Nav Toggle Button */}
        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden p-2 text-ivory hover:text-gold-light focus-ring rounded"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open navigation menu"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setMenuOpen(true)
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Overlay — Full-screen crimson overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-crimson text-ivory flex flex-col p-6 overflow-y-auto lg:hidden"
        >
          {/* Top Bar with OAF crest & Close button */}
          <div className="flex items-center justify-between h-14 border-b border-ivory/15 pb-4">
            <div className="flex items-center gap-2.5">
              <OafCrest className="w-8 h-8" light={true} />
              <span className="font-playfair font-bold text-base text-ivory">OAF Archive</span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="p-2 text-ivory hover:text-gold focus-ring rounded"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  closeMenu()
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-6 pb-2 flex flex-col gap-3">
            <Link
              href="/#tribute-form"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-red text-white font-ui font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-red/30 focus-ring"
            >
              Sign Ledger
            </Link>
            <Link
              href="/#gallery"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#120807] font-ui font-semibold text-xs uppercase tracking-wider shadow-md focus-ring"
            >
              Explore Archive
            </Link>
          </div>

          {/* Navigation Links Stack */}
          <nav className="flex flex-col gap-5 py-6 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-playfair font-bold text-2xl text-ivory hover:text-gold-light transition-colors py-1 focus-ring"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="font-playfair font-bold text-2xl text-ivory hover:text-gold-light transition-colors py-1 focus-ring"
            >
              Contact
            </Link>
          </nav>

          {/* Footer inside mobile overlay */}
          <div className="pt-6 border-t border-ivory/15 flex flex-col gap-2 text-xs font-ui text-ivory/70">
            <a
              href={`mailto:${pressEmail}`}
              className="text-gold-light hover:underline"
              onClick={() => {
                closeMenu()
                sendGAEvent('contact_click', {
                  link_type: 'press_email',
                  link_url: `mailto:${pressEmail}`,
                })
              }}
            >
              Press Desk: {pressEmail}
            </a>
            <span>&copy; {new Date().getFullYear()} The Olusegun Agagu Foundation</span>
          </div>
        </div>
      )}
    </header>
  )
}
