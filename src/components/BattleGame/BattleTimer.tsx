import { BodyText, Header4 } from 'components/Text'
import useCountDown from 'helpers/hooks/useCountDown'

export default function ({ endTime }: { endTime: number }) {
  const { formatted } = useCountDown({ endTime })

  return (
    <div className="flex flew-row items-center gap-x-2 self-center">
      <BodyText className="text-white/50">Result time left:</BodyText>
      <Header4>{formatted}</Header4>
    </div>
  )
}
