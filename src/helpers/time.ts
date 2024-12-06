export const timeInMs = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

export function formatDuration(totalSeconds: number, format = 'HH mm') {
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const daysString = String(days).padStart(2, '0')

  const hoursString =
    hours < 100 ? String(hours).padStart(2, '0') : String(hours)

  return format
    .replace('DD', daysString)
    .replace('D', String(days))
    .replace('HH', hoursString)
    .replace('H', String(hours))
    .replace('mm', String(minutes).padStart(2, '0'))
    .replace('ss', String(seconds).padStart(2, '0'))
}

export function separateTime(toCalculate: number) {
  const days = Math.floor(toCalculate / timeInMs.day)
  const hours = Math.floor((toCalculate % timeInMs.day) / timeInMs.hour)
  const minutes = Math.floor((toCalculate % timeInMs.hour) / timeInMs.minute)
  const seconds = Math.floor((toCalculate % timeInMs.minute) / timeInMs.second)

  return { days, hours, minutes, seconds }
}
