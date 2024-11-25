import DotsLoader from 'components/DotsLoader'
import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'
import { formatDuration } from 'helpers/time'
import { useState, useEffect } from 'react'
import { ClassNameProp } from 'type/Props'

export default function ({
  diffTime,
  step,
  format = 'mm:ss',
  className,
}: {
  diffTime: number | undefined
  step?: number
  format?: string
} & ClassNameProp) {
  const [time, setTime] = useState(0)
  useCountDown(setTime, step)

  useEffect(() => {
    if (diffTime === undefined || time !== 0) return

    const now = dayjs().valueOf()
    const difference = Math.abs(diffTime - now) / 1000
    setTime(Math.ceil(difference))
  }, [time, diffTime])

  return (
    <div
      className={`py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm ${className}`}
    >
      <span>{diffTime ? formatDuration(time, format) : <DotsLoader />}</span>
    </div>
  )
}
