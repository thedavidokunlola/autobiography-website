import 'server-only'

export interface Trustee {
  name: string
  role?: string
  status?: string
}

export const trusteesIntro = 'The assiduous team that keeps this legacy going includes:'

export const trustees: Trustee[] = [
  { name: 'Dr. Deji Adeleke', role: 'Chairman' },
  { name: 'Chief Pius Akinyelure' },
  { name: 'Mrs. Marie Ekpere' },
  { name: 'Alhaji Kashim Imam' },
  { name: 'Ms. Solape Adefala' },
  { name: 'Dr. Olumuyiwa Aliu' },
  { name: 'Mr. Femi Agagu' },
  { name: 'Mr. Akin Aruwajoye', status: 'appointed 2018' },
  { name: 'Mr. Kayode Falowo', status: 'appointed 2018' },
  { name: 'Mr. Feyi Agagu', role: 'Secretary' },
  { name: 'Professor Dele Fawole', status: 'stepped down 2018' },
  { name: 'Prince Yemi Adefulu MFR', status: 'Late' },
]
