export default function (str: string, at: number) {
  const first = str.codePointAt(at)
  return first ? String.fromCodePoint(first) : '?'
}
