import type { SocialLink } from '@/data/contact'

interface SocialLinkItemProps {
  social: SocialLink
}

function SocialLinkItem({ social }: SocialLinkItemProps) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-text-secondary hover:text-link-hover focus-ring underline underline-offset-4"
    >
      {social.platform}
      {/* RULE-A4: sr-only span is required pattern, not aria-label */}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  )
}

interface SocialLinksProps {
  socials: SocialLink[]
  location?: 'footer' | 'contact_page'
}

export function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-6">
      {socials.map((social) => (
        <SocialLinkItem key={social.platform} social={social} />
      ))}
    </div>
  )
}
