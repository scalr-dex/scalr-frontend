import DotsLoader from 'components/DotsLoader'
import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'
import { useState, useEffect } from 'react'
import { ClassNameProp } from 'type/Props'

export default function ({
  endTime,
  withHours,
  className,
}: {
  endTime: number | undefined
  withHours?: boolean
} & ClassNameProp) {
  const [time, setTime] = useState(0)
  useCountDown(setTime)

  useEffect(() => {
    if (time !== 0) return

    setTime(dayjs(endTime).diff(dayjs(), 'seconds'))
  }, [time, endTime])

  const format = withHours ? 'HH:mm:ss' : 'mm:ss'

  return (
    <div
      className={`py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm ${className}`}
    >
      <span>
        {endTime ? dayjs({ seconds: time }).format(format) : <DotsLoader />}
      </span>
    </div>
  )
}
