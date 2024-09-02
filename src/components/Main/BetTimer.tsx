import dayjs from 'dayjs'
import { userBetAtom } from 'helpers/atoms/UserAtom'
import useCountDown from 'helpers/hooks/useCountDown'
import { useAtomValue } from 'jotai'
import { useState, useEffect } from 'preact/hooks'

export default function () {
  const userBet = useAtomValue(userBetAtom)
  const [time, setTime] = useState(0)
  useCountDown(setTime)

  useEffect(() => {
    if (time !== 0) return

    setTime(dayjs(userBet?.endTime).diff(dayjs(), 'seconds'))
  }, [time, userBet?.endTime])

  return (
    <div className="py-2 px-3 bg-secondary opacity-50 rounded-3xl self-start font-semibold font-accent text-sm">
      {dayjs({ seconds: time }).format('mm:ss')}
    </div>
  )
}
