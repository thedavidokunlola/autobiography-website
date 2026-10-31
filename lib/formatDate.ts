const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function formatDate(date: string): string {
  const [year, month] = date.split('-')
  const monthIndex = parseInt(month, 10) - 1
  return `${MONTHS[monthIndex]} ${year}`
}

export function formatPressDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  const monthIndex = parseInt(month, 10) - 1
  return `${parseInt(day, 10)} ${MONTHS[monthIndex]} ${year}`
}
