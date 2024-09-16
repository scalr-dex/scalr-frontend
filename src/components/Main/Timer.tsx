import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'
import { useState, useEffect } from 'preact/hooks'

export default function ({
  endTime,
  withHours,
}: {
  endTime: number | undefined
  withHours?: boolean
}) {
  const [time, setTime] = useState(0)
  useCountDown(setTime)

  useEffect(() => {
    if (time !== 0) return

    setTime(dayjs(endTime).diff(dayjs(), 'seconds'))
  }, [time, endTime])

  const format = withHours ? 'hh:mm:ss' : 'mm:ss'

  return (
    <div className="py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm">
      <span>{dayjs({ seconds: time }).format(format)}</span>
    </div>
  )
}
