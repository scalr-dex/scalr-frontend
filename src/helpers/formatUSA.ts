const intl = new Intl.NumberFormat('en-US')

export default function (num: number) {
  return intl.format(num)
}
