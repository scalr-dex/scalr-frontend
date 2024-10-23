import { BodyText, Header3 } from 'components/Text'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { JSX } from 'preact/jsx-runtime'

export default function ({
  header,
  subHeader,
}: {
  header: string
  subHeader: JSX.Element | string
}) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-y-2">
        <Header3>{header}</Header3>
        <BodyText className="font-semibold text-white/50 text-sm whitespace-pre leading-4">
          {subHeader}
        </BodyText>
      </div>

      <ScalrCoin size={44} />
    </div>
  )
}
