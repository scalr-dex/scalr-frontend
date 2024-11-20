export const timeInMs = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

export function separateTime(toCalculate: number) {
  const days = Math.floor(toCalculate / timeInMs.day)
  const hours = Math.floor((toCalculate % timeInMs.day) / timeInMs.hour)
  const minutes = Math.floor((toCalculate % timeInMs.hour) / timeInMs.minute)

  return { days, hours, minutes }
}
