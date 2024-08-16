import DotsLoader from 'components/DotsLoader'
import dayjs from 'dayjs'
import {
  previousRoundAtom,
  roundDurationMs,
} from 'helpers/atoms/priceHistoryAtom'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'preact/hooks'

export default function ({ extra = 0 }: { extra?: number }) {
  const previousRound = useAtomValue(previousRoundAtom)
  const [time, setTime] = useState('')
  const [locked, setLocked] = useState(0)

  useEffect(() => {
    if (!previousRound) return

    // TODO: create separate component for Timer after bet, this is too messy
    const interval = setInterval(() => {
      const dateMs = previousRound.date * 1000
      if (extra) setLocked((prev) => prev || dateMs)

      const time = locked || dateMs

      const seconds = dayjs(time + roundDurationMs + extra).diff(
        dayjs(),
        'seconds'
      )

      const formatted = dayjs({ seconds }).format('mm:ss')
      setTime(seconds ? formatted : '')
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [extra, locked, previousRound, time])

  return (
    <div className="py-2 px-3 bg-secondary opacity-50 rounded-3xl self-start font-semibold font-accent text-sm">
      {time ? time : <DotsLoader />}
    </div>
  )
}
