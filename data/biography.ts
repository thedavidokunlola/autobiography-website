import 'server-only'

export interface BiographySection {
  id: string
  heading: string
  content: string
}

export interface FocalArea {
  name: string
}

export const biography = {
  name: 'The Olusegun Agagu Foundation',
  personName: 'Dr. Olusegun Kokumo Agagu CON',
  tagline: 'To leave things better than he met them',
  missionIntro: 'In 2014 the Foundation was established to:',
  missionPoints: [
    'immortalise the name and legacy of the late Dr. Olusegun Agagu',
    "live up to and seek to actualise his personal credo which was 'to leave things better than he met them'",
    'further the ideals he lived by and worked passionately towards, particularly intellectual excellence, good governance and national development',
  ],
  focalAreas: [
    'Academia',
    'Geology',
    'Petroleum Engineering',
    'Energy',
    'Politics/Good Governance',
    'Culture and Arts (Highlife Music)',
    'Service',
    'Aviation Trauma',
  ],
  sections: [
    {
      id: 'about-dr-agagu',
      heading: 'About Dr. Olusegun Kokumo Agagu CON',
      content:
        "Born on the 16th of February 1948, Dr. Olusegun Kokumo Agagu began his career in public service in 1992 when he began serving as Deputy Governor of Ondo state.\n\nAs Deputy Governor, his resourcefulness, knowledge and untiring efforts led to the State becoming an Oil-producing State, leading to the expansion of its economic base. His exceptional performance as Deputy Governor endeared him to the people and paved the way for a future as Governor a decade later.\n\nOlusegun Agagu was appointed to the Federal Cabinet of Ministers by President Olusegun Obasanjo when civilian rule was re-established in 1999. He served as the Minister for Aviation (1999-2000) and Minister for Power and Steel (2000-2002). His 1-year stint at the Ministry of Aviation resulted in a dramatic turnaround of the sector. As Minister for Power and Steel, power generation increased from 1425 megawatts in 2000 to 4000+ megawatts and with a complementary reinforcement of the transmission and distribution systems by the time he left in 2002.\n\nOlusegun Agagu resigned as a Federal Minister in November 2002 to contest the election as Governor of Ondo State on the platform of the People's Democratic Party (PDP) in Nigeria. He won and served Ondo State as Governor from May 2003 to February 2009. As Governor, he ran a transparent, focused, prudent, visionary and efficient administration that led to visible transformation across all the critical sectors of the State.\n\nAs a leader with a passion for education, Olusegun Agagu obtained a Master\u2019s degree in Geology from the University of Texas, USA in 1974 and then worked with the University of Texas as a Research Scientist for the United States Atomic Energy Commission on Geothermal Energy. He then returned to Nigeria and continued to lecture at the Geology Department of the University of Ibadan from where he obtained a PhD degree in Petroleum Geology in 1978.\n\nDr. Olusegun Agagu was a geological consultant to numerous companies and governments, including the Governments of Oyo, Ogun, Osun and Ondo States; Shell Petroleum Development Company; Mobil Producing Nigeria; Texaco; Nigeria Agip Oil Company; Lexington Exploration U.S.A and Nitex Exploration U.S.A. He also established many successful private businesses including a water borehole drilling company, a kaolin mining and processing company and several other mining companies including marble, feldspar and granite in different parts of the country.\n\nDr. Olusegun Agagu passed away on 13 September 2013. His death came as a massive shock to the nation. Until he passed on, Dr. Olusegun Agagu was a loving family man married to his school sweetheart and dance partner, Mrs. Olufunke Agagu, for more than 39 years. Their union was blessed with three children. He is also survived by seven grandchildren...and counting.",
    },
    {
      id: 'about-the-foundation',
      heading: 'About the Foundation',
      content:
        "In 2014 the Foundation was established to immortalise the name and legacy of the late Dr. Olusegun Agagu, live up to and seek to actualise his personal credo which was 'to leave things better than he met them', and further the ideals he lived by and worked passionately towards, particularly intellectual excellence, good governance and national development.",
    },
    {
      id: 'board-of-trustees',
      heading: 'Board of Trustees',
      content:
        'The assiduous team that keeps this legacy going includes Dr. Deji Adeleke (Chairman), Chief Pius Akinyelure, Mrs. Marie Ekpere, Alhaji Kashim Imam, Ms. Solape Adefala, Dr. Olumuyiwa Aliu, Mr. Femi Agagu, Mr. Akin Aruwajoye (appointed 2018), Mr. Kayode Falowo (appointed 2018), Mr. Feyi Agagu (Secretary), Professor Dele Fawole (stepped down 2018), and Prince Yemi Adefulu MFR (Late).',
    },
    {
      id: 'our-activities',
      heading: 'Our Activities',
      content:
        'Over the years, the Foundation has carried out numerous initiatives spanning annual Memorial Lectures, bursary and scholarship programmes, cash awards across tertiary institutions, establishment of an E-Library, and university endowment funds.',
    },
    {
      id: 'future-initiatives',
      heading: 'Future Initiatives',
      content:
        'Future initiatives include expanding scholarships and university endowments, publishing an autobiography in memory of Dr. Olusegun Agagu, essay and research competitions, volunteer teaching and mentoring, and interventions in aviation safety.',
    },
  ],
  futureInitiatives: {
    scholarshipsAndAwards: [
      'Add a university every 5 years to the scheme giving an endowment for 3 students per university (Geology or Petroleum Engineering)',
      'Or increase the value endowments at existing universities',
      'Or increase the number of scholarship awards',
    ],
    autobiography: [
      'Autobiography in memory of Dr. Olusegun Agagu to educate the public on his lifetime as well as promote his ideals',
    ],
    otherInitiatives: [
      'Essay/Research Paper competitions',
      'Volunteer teaching and mentoring',
      'An intervention in Aviation safety',
    ],
  },
  ourThanks: [
    'We thank all those who have supported the initiative and enabled these good works to continue',
    "Together, we hope we can continue to do more 'to leave things better than we met them'",
  ],
}
