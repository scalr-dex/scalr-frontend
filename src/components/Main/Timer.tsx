import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'
import { useState, useEffect } from 'preact/hooks'

export default function ({ endTime }: { endTime: number | undefined }) {
  const [time, setTime] = useState(0)
  useCountDown(setTime)

  useEffect(() => {
    if (time !== 0) return

    setTime(dayjs(endTime).diff(dayjs(), 'seconds'))
  }, [time, endTime])

  return (
    <div className="w-16 py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm">
      <span>{dayjs({ seconds: time }).format('mm:ss')}</span>
    </div>
  )
}
