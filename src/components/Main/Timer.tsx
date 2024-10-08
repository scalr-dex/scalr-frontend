import DotsLoader from 'components/DotsLoader'
import useCountDown from 'helpers/hooks/useCountDown'
import { ClassNameProp } from 'type/Props'

export default function ({
  endTime,
  withHours,
  className,
}: {
  endTime: number | undefined
  withHours?: boolean
} & ClassNameProp) {
  const format = withHours ? 'HH:mm:ss' : 'mm:ss'
  const { formatted } = useCountDown({ endTime, format })

  return (
    <div
      className={`py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm ${className}`}
    >
      <span>{endTime ? formatted : <DotsLoader />}</span>
    </div>
  )
}
