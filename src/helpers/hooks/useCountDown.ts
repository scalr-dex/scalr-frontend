import dayjs from 'dayjs'
import { useEffect, useState } from 'preact/hooks'

export default function ({
  endTime,
  step = 1,
  format = 'mm:ss',
}: {
  endTime: number | undefined
  step?: number
  format?: string
}) {
  const [time, setTime] = useState(0)

  const shouldExit = !endTime || time !== 0

  useEffect(() => {
    if (shouldExit) return

    setTime(dayjs(endTime).diff(dayjs(), 'seconds'))
  }, [endTime, shouldExit])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, step * 1000)

    if (time === 0)
      return () => {
        clearInterval(interval)
      }

    return () => {
      clearInterval(interval)
    }
  }, [setTime, shouldExit, step, time])

  return { time, formatted: dayjs({ seconds: time }).format(format) }
}
