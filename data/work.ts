import 'server-only'

export interface WorkEntry {
  category: 'Foundation' | 'NGO' | 'Advisory Role'
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
  learnMoreUrl?: string
}

export const workEntries: WorkEntry[] = [
  {
    category: 'Foundation',
    organization: 'The Olusegun Agagu Foundation',
    role: 'Founder & Primary Benefactor',
    startDate: '2014-01',
    endDate: '2024-12',
    description:
      'Established in 2014 to immortalise the name and legacy of the late Dr. Olusegun Agagu, live up to and seek to actualise his personal credo "to leave things better than he met them", and further the ideals he lived by, particularly intellectual excellence, good governance and national development.',
    learnMoreUrl: 'https://olusegunagagufoundation.org',
  },
  {
    category: 'Foundation',
    organization: 'Adeleke University & High School Scholarship Scheme',
    role: 'Endowed Scholarship Sponsor',
    startDate: '2014-09',
    endDate: '2024-09',
    description:
      'Sponsored 35 full scholarships at Adeleke University and 40 full secondary school scholarships into Premier College (Ijebu Ode) and Adeleke High School (Ede), alongside over 400 bursaries and cash prizes for secondary students.',
    learnMoreUrl: 'https://olusegunagagufoundation.org',
  },
  {
    category: 'Foundation',
    organization: 'Olusegun Agagu University of Science and Technology (OAUSTECH)',
    role: 'E-Library Benefactor & Geology Endowment Sponsor',
    startDate: '2015-05',
    endDate: '2024-05',
    description:
      'Donated N25 million to establish a state-of-the-art E-Library at OAUSTECH, alongside permanent annual endowments providing cash awards for the best students in Geology from 100 to 400 Level.',
    learnMoreUrl: 'https://olusegunagagufoundation.org',
  },
  {
    category: 'NGO',
    organization: 'University Geology Endowment Consortia (UI, AAUA, FUTA, OAUSTECH)',
    role: 'Endowment Founding Trustee',
    startDate: '2014-10',
    endDate: '2024-10',
    description:
      'Established permanent academic endowment funds across the University of Ibadan, Adekunle Ajasin University, Federal University of Technology Akure, and OAUSTECH, awarding N50,000 for top Geology students (100–300 Level) and N100,000 for 400 Level scholars.',
    learnMoreUrl: 'https://olusegunagagufoundation.org',
  },
  {
    category: 'Advisory Role',
    organization: 'Federal Ministry of Aviation',
    role: 'Federal Minister of the Republic',
    startDate: '1999-05',
    endDate: '2000-05',
    description:
      'Appointed to the Federal Cabinet of Ministers by President Olusegun Obasanjo when civilian rule was re-established in 1999. His 1-year stint resulted in a dramatic turnaround of Nigeria aviation sector and air travel infrastructure.',
  },
  {
    category: 'Advisory Role',
    organization: 'Federal Ministry of Power and Steel',
    role: 'Federal Minister of the Republic',
    startDate: '2000-06',
    endDate: '2002-11',
    description:
      'Spearheaded the expansion of Nigeria national electrical power generation from 1,425 megawatts in 2000 to over 4,000 megawatts in 2002, with complementary reinforcement of transmission and distribution networks across the country.',
  },
  {
    category: 'Advisory Role',
    organization: 'Government of Ondo State',
    role: 'Executive Governor',
    startDate: '2003-05',
    endDate: '2009-02',
    description:
      'Ran a transparent, focused, prudent, visionary and efficient administration that led to visible transformation across education, healthcare, infrastructure, and fiscal management across all critical sectors of Ondo State.',
  },
  {
    category: 'Advisory Role',
    organization: 'Government of Ondo State',
    role: 'Deputy Governor',
    startDate: '1992-01',
    endDate: '1993-11',
    description:
      'Began career in public service in 1992 as Deputy Governor. His resourcefulness, geological knowledge and untiring efforts led to Ondo State becoming recognized as an Oil-producing State, expanding its economic base.',
  },
]
