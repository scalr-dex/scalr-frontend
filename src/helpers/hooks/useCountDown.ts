import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function (setTime: Dispatch<SetStateAction<number>>, step = 1) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])
}

export function useCountDownEndTime({
  endTime,
  step = 1,
  format = 'HH:mm:ss',
}: {
  endTime: number
  step?: number
  format?: string
}) {
  const [time, setTime] = useState(endTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])

  return { time, formatted: dayjs({ seconds: time }).format(format) }
}
