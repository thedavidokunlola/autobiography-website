import 'server-only'

export interface PressEntry {
  publication: string
  date: string
  title: string
  summary: string
  url: string
  videoEmbedUrl?: string
}

export const pressEntries: PressEntry[] = [
  {
    publication: 'The Guardian Nigeria',
    date: '2023-09-14',
    title: 'A Decade of Legacy: Olusegun Agagu Memorial Lectures Compendium Launched in Lagos',
    summary:
      'The Olusegun Agagu Foundation marks ten years of public policy stewardship with the launch of "A DECADE OF LEGACY: A Compendium of Policy Papers from the Olusegun Agagu Memorial Lectures", alongside a vibrant Highlife music concert supporting young Nigerian musicians.',
    url: 'https://guardian.ng/news/a-decade-of-legacy-olusegun-agagu-memorial-lectures-compendium-launched/',
  },
  {
    publication: 'ThisDay',
    date: '2022-09-15',
    title: 'Ex-Sierra Leone President Koroma Delivers 9th Agagu Memorial Lecture on Continental Transformation',
    summary:
      'His Excellency Dr. Ernest Bai Koroma delivers the keynote address alongside Afreximbank Chairman Dr. Benedict Okey Oramah and agricultural social innovators at the 9th edition of the annual Olusegun Agagu Memorial Lecture in Lagos.',
    url: 'https://thisdaylive.com/index.php/2022/09/15/ex-sierra-leone-president-koroma-delivers-9th-agagu-memorial-lecture/',
  },
  {
    publication: 'Vanguard',
    date: '2019-09-14',
    title: 'Mauritius Ex-President Fakim-Gurib, Anyaoku, Sanwo-Olu Address Climate Change at 6th Agagu Lecture',
    summary:
      'Former President Dr. Ameenah Fakim-Gurib speaks on climate change and population migration in Africa at the 6th Memorial Lecture, chaired by Chief Emeka Anyaoku with goodwill message by UN Deputy Secretary-General Amina Mohammed.',
    url: 'https://vanguardngr.com/2019/09/climate-change-mauritius-ex-president-fakim-gurib-anyaoku-sanwo-olu-address-6th-agagu-lecture/',
  },
  {
    publication: 'Premium Times',
    date: '2018-09-14',
    title: 'Joyce Banda, Sanusi II Advocate for Women in Politics at 5th Agagu Memorial Lecture',
    summary:
      'Former President Dr. Joyce Banda of Malawi calls women a needed force in politics and the polity at the 5th Memorial Lecture, chaired by His Royal Highness Muhammadu Sanusi II, the Emir of Kano, with Grand Patron Chief Olusegun Obasanjo in attendance.',
    url: 'https://premiumtimesng.com/news/more-news/283620-joyce-banda-sanusi-ii-advocate-women-politics-agagu-memorial.html',
  },
  {
    publication: 'The Punch',
    date: '2016-09-15',
    title: 'Former Tanzanian President Benjamin Mkapa, Tinubu Advocate Regional Integration at Agagu Memorial',
    summary:
      'His Excellency Benjamin Mkapa delivers keynote on imperatives of regional cooperation and integration in Africa at the 3rd Agagu Memorial Lecture, chaired by Asiwaju Bola Ahmed Tinubu with Ambassador Baba Gana Kingibe.',
    url: 'https://punchng.com/former-tanzanian-president-benjamin-mkapa-tinubu-agagu-memorial-lecture/',
  },
  {
    publication: 'Daily Trust',
    date: '2014-09-14',
    title: 'Inaugural Agagu Memorial Lecture: Festus Mogae of Botswana, Obasanjo Emphasize Good Governance',
    summary:
      'Former President Festus Mogae of Botswana delivers the inaugural keynote on good governance and national ethics, chaired by Chief Olusegun Obasanjo GCON, inaugurating the Foundation mission to leave things better than they were met.',
    url: 'https://dailytrust.com/inaugural-agagu-memorial-lecture-festus-mogae-obasanjo-good-governance/',
  },
]
