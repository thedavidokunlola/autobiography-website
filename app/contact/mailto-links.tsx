interface ContactMailtoLinksProps {
  type: 'press' | 'bookings'
  email: string
}

export function ContactMailtoLinks({ email }: ContactMailtoLinksProps) {
  return (
    <a
      href={`mailto:${email}`}
      className="text-text-primary hover:text-link-hover underline underline-offset-4 focus-ring"
    >
      {email}
    </a>
  )
}
