import DotsLoader from 'components/DotsLoader'
import useCountDown from 'helpers/hooks/useCountDown'
import { ClassNameProp } from 'type/Props'

function InnerTimer({ endTime, format }: { endTime: number; format: string }) {
  const { formatted } = useCountDown({ endTime, format })

  return <>{formatted}</>
}

export default function ({
  endTime,
  withHours,
  className,
}: {
  endTime: number
  withHours?: boolean
} & ClassNameProp) {
  const format = withHours ? 'HH:mm:ss' : 'mm:ss'

  return (
    <div
      className={`py-2 px-3 bg-secondary opacity-50 rounded-3xl font-semibold font-accent text-sm ${className}`}
    >
      <span>
        {endTime ? (
          <InnerTimer endTime={endTime} format={format} />
        ) : (
          <DotsLoader />
        )}
      </span>
    </div>
  )
}
