import DotsLoader from 'components/DotsLoader'
import useCountDown from 'helpers/hooks/useCountDown'

export default function ({
  endTime,
  withHours,
}: {
  endTime: number | undefined
  withHours?: boolean
}) {
  const format = withHours ? 'HH:mm:ss' : 'mm:ss'
  const { formatted } = useCountDown({ endTime, format })

  return (
    <div className="py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm">
      <span>{endTime ? formatted : <DotsLoader />}</span>
    </div>
  )
}
