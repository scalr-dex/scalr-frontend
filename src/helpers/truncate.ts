export default function ({
  fullString,
  strLen = 15,
  separator = '...',
  frontChars = 9,
  backChars = 3,
}: {
  fullString?: string | undefined
  strLen?: number
  separator?: string
  frontChars?: number
  backChars?: number
}) {
  if (!fullString) return
  if (fullString.length <= strLen) return fullString

  return (
    fullString.substring(0, backChars) +
    separator +
    fullString.substring(fullString.length - frontChars)
  )
}
