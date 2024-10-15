import { writeAtom } from 'helpers/atoms/atomStore'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'

export default function () {
  writeAtom(priceHistoryAtom, (prev) =>
    prev.map((val) => {
      delete val.userBet
      return val
    })
  )
}
