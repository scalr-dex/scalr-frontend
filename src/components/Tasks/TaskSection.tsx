import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Header4 } from 'components/Text'
import { ChildrenProp } from 'type/Props'

export default function ({
  headerText,
  children,
}: { headerText?: string } & ChildrenProp) {
  const [parent] = useAutoAnimate()

  return (
    <div className="flex flex-col gap-y-4">
      <Header4>{headerText}</Header4>
      <div
        className="flex flex-col gap-y-6 bg-secondary rounded-2xl p-4"
        ref={parent}
      >
        {children}
      </div>
    </div>
  )
}
