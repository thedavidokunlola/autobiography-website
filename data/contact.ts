import 'server-only'

export interface SocialLink {
  platform: string
  handle: string
  url: string
}

export const contactInfo = {
  organization: 'The Olusegun Agagu Foundation',
  contactPerson: 'Mr. Feyisayo Agagu',
  role: 'Secretary, Board of Trustees',
  pressEmail: 'fagagu@yahoo.com',
  bookingsEmail: 'fagagu@yahoo.com',
  phone: '+2348030597100',
  website: 'https://olusegunagagufoundation.org',
  officeAddress:
    'Ibadan Secretariat: Bodija Estate, Ibadan, Oyo State, Nigeria\nAkure Liaison: Alagbaka GRA, Akure, Ondo State, Nigeria',
  socials: [
    {
      platform: 'Foundation Portal',
      handle: 'olusegunagagufoundation.org',
      url: 'https://olusegunagagufoundation.org',
    },
  ] as SocialLink[],
}
