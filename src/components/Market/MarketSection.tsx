import { Header4, BodyText } from 'components/Text'
import { ChildrenProp } from 'type/Props'

export default function ({
  children,
  header,
  subHeader,
}: ChildrenProp & { header: string; subHeader: string }) {
  return (
    <div className="flex flex-col gap-y-9">
      <div className="flex flex-col gap-y-2">
        <Header4>{header}</Header4>
        <BodyText className="text-white/50">{subHeader}</BodyText>
      </div>

      <div className="flex flex-row gap-x-2 w-full">{children}</div>
    </div>
  )
}
