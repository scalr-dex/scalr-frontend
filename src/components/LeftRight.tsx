import { JSX } from 'preact/compat'
import { BodyText } from 'components/Text'
import { ChildrenProp } from 'type/Props'
import formatUSA from 'helpers/formatters/formatUSA'

export function RightWithSkeletonLoader({
  isLoading,
  children,
}: { isLoading: boolean } & ChildrenProp) {
  if (isLoading) return

  return children
}

export default function ({
  left,
  isLoading,
  children,
  shouldFormat,
}: {
  left: JSX.Element | string
  isLoading: boolean
  shouldFormat?: boolean
} & ChildrenProp) {
  return (
    <div className="flex flex-row items-center justify-between">
      <BodyText className="text-sm text-white/50">{left}</BodyText>
      <BodyText className="text-sm font-semibold">
        {isLoading ? (
          <div className="w-20 h-6 rounded-full bg-white-16 animate-pulse" />
        ) : shouldFormat ? (
          formatUSA(Number(children))
        ) : (
          children
        )}
      </BodyText>
    </div>
  )
}
