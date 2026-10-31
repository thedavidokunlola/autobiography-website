import 'server-only'

export interface ActivityEntry {
  index: number
  total: number
  title: string
  year?: string
  intro?: string
  bulletPoints: string[]
}

export const activityEntries: ActivityEntry[] = [
  {
    index: 1,
    total: 12,
    title: 'Memorial Lectures, Bursaries & Scholarships',
    intro: 'Over the years, the Foundation has carried out the following activities:',
    bulletPoints: [
      '9 Memorial Lectures event organized\n– Memorial lectures have been held every year on the anniversary of the passing of Dr. Olusegun Agagu.',
      'Existing bursary and cash prize programmes for students into secondary schools\n– More than 400 awards and prizes have been given so far.',
      'Cash awards and prizes in four tertiary Institutions.\n– Over 50 beneficiaries Awarded so far.',
      'Scholarships\n– Full scholarships at Adeleke University each year - 35 awarded so far\n– 40 full scholarships into Premier College (Ijebu Ode), and Adeleke High School (Ede)',
    ],
  },
  {
    index: 2,
    total: 12,
    title: 'E-Library & University Endowment Fund',
    intro: 'Over the years, the Foundation has carried out the following activities:',
    bulletPoints: [
      'E-Library\n– N25 million was donated by the foundation to the Olusegun Agagu University of Science and Technology to establish an E-Library.',
      'Endowment Fund\n– Endowments with the University of Ibadan, Adekunle Ajasin University, Federal University of Technology, Akure, and The Olusegun Agagu University of Science and Technology, where cash awards of N50,000 are given to the best students in Geology for 100 to 300 Level and N100,000 for 400 Level',
    ],
  },
  {
    index: 3,
    total: 12,
    title: '2014 Memorial Lecture',
    year: '2014',
    bulletPoints: [
      'Keynote Address on Good Governance given by His Excellency, Festus Gontebanye Mogae, Former President of Botswana (represented by the Ambassador of Botswana to Nigeria)',
      'Chaired by His Excellency, Chief Olusegun Obasanjo (GCON), Former President of the Federal Republic of Nigeria',
      'Guest Speakers:\n– Mrs. Omobola Johnson, Honourable Minister of Communication Technology\n– Mr. A. Oba Otudeko (CFR), Chairman, Honeywell Group\n– Chief Olusola Oke',
    ],
  },
  {
    index: 4,
    total: 12,
    title: '2015 Memorial Lecture',
    year: '2015',
    bulletPoints: [
      'Keynote Address on Resources, Policy and the Economics by His Excellency, Edem Kodjo, Former Prime Minister of Togo\n– Represented by Cornelius Aidam, former Minister for Communication (Togo)',
      'Chaired by His Excellency, Chief Olusegun Obasanjo (GCON), Former President of the Federal Republic of Nigeria',
      'Special Guest Speaker:\n– Professor Ibrahim Agboola Gambari, Former Foreign Minister of Nigeria and United Nations Under-Secretary General',
    ],
  },
  {
    index: 5,
    total: 12,
    title: '2016 Memorial Lecture',
    year: '2016',
    bulletPoints: [
      'Keynote Address on The Imperatives of Regional Cooperation and Integration in Africa by His Excellency, Benjamin Mkapa, Former President of Tanzania\n– Chaired by His Excellency, Asiwaju Bola Ahmed Tinubu',
      'Special Guest Speaker:\n– His Excellency, Ambassador Baba Gana Kingibe',
      'Goodwill Message by the Grand Patron:\n– His Excellency, Chief Olusegun Obasanjo, GCFR',
    ],
  },
  {
    index: 6,
    total: 12,
    title: '2017 Memorial Lecture',
    year: '2017',
    bulletPoints: [
      'Keynote Address on Wealth Creation through Entrepreneurship in Changing Economic Cycles by His Excellency, Former President Joaquim Alberto Chissano of Mozambique',
      'Other Dignitaries:\n– Chairman: His Majesty, Igwe Nnaemeka Alfred Achebe, CFR\n– Guest Speaker: His Excellency, Dr. Kayode Fayemi, CON\n– Special Guest of Honour: His Excellency, Chief (Dr.) E. A. O. Shonekan, GCFR, CBE',
      'Grand Patron: His Excellency, Chief Olusegun Obasanjo, GCFR',
    ],
  },
  {
    index: 7,
    total: 12,
    title: '2018 Memorial Lecture',
    year: '2018',
    bulletPoints: [
      'Keynote Address on Women: a Needed Force in Politics and the Polity by Her Excellency, Former President Dr. Joyce Banda of Malawi',
      'Other Dignitaries:\n– Chairman: His Royal Highness, Muhammadu Sanusi II (The Emir of Kano)\n– Guest Speaker: Chief Folake Solanke SAN, CON\n– Guest Speaker: Prof. Sheila Tlou (United Nations)',
      'Grand Patron: His Excellency, Chief Olusegun Obasanjo, GCFR',
    ],
  },
  {
    index: 8,
    total: 12,
    title: '2019 Memorial Lecture',
    year: '2019',
    bulletPoints: [
      'Keynote Address on Climate Change and the Problem of Population Migration in Africa by Her Excellency, Former President Dr. Ameenah Fakim-Gurib of the Republic of Mauritius',
      'Other Dignitaries:\n– Chairman: Chief Emeka Anyaoku (Former Commonwealth Secretary General)\n– Chief Host: His Excellency, Babajide Sanwoolu (Executive Governor of Lagos State)\n– Goodwill Message: Ms. Amina Mohammed, OFR (UN Deputy Secretary-General)\n– Guest Speaker: Professor Oye Ibidapo-Obe (Former Vice-Chancellor, UNILAG)',
    ],
  },
  {
    index: 9,
    total: 12,
    title: '2020 Virtual Memorial Lecture',
    year: '2020',
    bulletPoints: [
      'Keynote Address on Embracing Culture as a Driver of Progress by Her Excellency, Former President of Ecuador, Her Excellency Rosalia Arteaga Serrano',
      'Other Speakers:\n– Special Guest Speaker: Hon. Ben Murray Bruce, Founder of Silverbird Group\n– Guest Speaker: Polly Alakija, Chairman, Lagos State Council for Arts and Culture\n– Guest Speaker: Bimbo Esho, MD Evergreen Musical Company',
    ],
  },
  {
    index: 10,
    total: 12,
    title: '2021 Virtual Memorial Lecture',
    year: '2021',
    bulletPoints: [
      'Panel Discussion on Entrepreneurship: Intergenerational Approaches to Building Wealth.',
      'Panel Speakers:\n– Almaz Negash: Founder and Executive Director, African Diaspora Network\n– Odunayo Eweniyi: Co-Founder and COO PiggyVest\n– Iyinoluwa ‘E’ Aboyeji: General Partner and Co-Founder of Future Africa',
    ],
  },
  {
    index: 11,
    total: 12,
    title: '2022 Memorial Lecture',
    year: '2022',
    bulletPoints: [
      'Keynote Speaker : His Excellency, Dr. Ernest Bai Koroma, President of Sierra Leone',
      'Panel Speakers:\n– Dr. Benedict Okey Oramah: Chairman of the Board of Directors African Export-Import Bank (Afreximbank)\n– Ndidi Nwuneli: Expert on Social Innovation, Agriculture and Youth Development\n– Akindele Phillips: Co-founder and CEO of Farmcrowdy and Philandmove\n– Lateef Sanni: A researcher and Post-Harvest Expert',
    ],
  },
  {
    index: 12,
    total: 12,
    title: 'Compendium Launch and Highlife Talent Show (2023)',
    year: '2023',
    bulletPoints: [
      'Book Launch: A DECADE OF LEGACY: A Compendium of Policy Papers from the Olusegun Agagu Memorial Lectures was curated and launched with the aim of having it be a reference book and critical resource on good governance.',
      'Highlife Music Concert : The concert aimed to feature and support young Nigerian Highlife musicians. It showcased the richness of African heritage through electrifying performances, live instrumentation, energetic dance, and soulful melodies that united generations of music enthusiasts.',
    ],
  },
]
