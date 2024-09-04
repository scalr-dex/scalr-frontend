import DotsLoader from 'components/DotsLoader'
import dayjs from 'dayjs'
import {
  previousRoundAtom,
  roundDurationMs,
} from 'helpers/atoms/priceHistoryAtom'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'preact/hooks'

export default function () {
  const previousRound = useAtomValue(previousRoundAtom)
  const [time, setTime] = useState('')

  useEffect(() => {
    if (!previousRound) return

    const interval = setInterval(() => {
      const seconds = dayjs(previousRound.date * 1000 + roundDurationMs).diff(
        dayjs(),
        'seconds'
      )

      const formatted = seconds ? dayjs({ seconds }).format('mm:ss') : '00:00'
      setTime(formatted)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [previousRound, time])

  return (
    <div className="py-2 px-3 bg-secondary opacity-50 rounded-3xl self-start font-semibold font-accent text-sm">
      {time ? time : <DotsLoader />}
    </div>
  )
}
