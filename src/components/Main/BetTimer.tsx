import DotsLoader from 'components/DotsLoader'
import dayjs from 'dayjs'
import { userBetAtom } from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import { useState, useEffect } from 'preact/hooks'

export default function () {
  const userBet = useAtomValue(userBetAtom)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (time !== 0) return

    setTime(dayjs(userBet?.endTime).diff(dayjs(), 'millisecond') || 0)
  }, [time, userBet?.endTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - 1000 : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [time])

  return (
    <div className="py-2 px-3 bg-secondary opacity-50 rounded-3xl self-start font-semibold font-accent text-sm">
      {time ? dayjs({ milliseconds: time }).format('mm:ss') : <DotsLoader />}
    </div>
  )
}
