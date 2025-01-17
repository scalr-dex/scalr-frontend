import SmallHorizontalCard from 'components/Tasks/SmallHorizontalCard'
import useHorizontalScroll from 'helpers/hooks/useHorizontalScroll'
import { useRef } from 'react'

export default function () {
  const container = useRef<HTMLDivElement>(null)
  useHorizontalScroll(container.current)

  return (
    <div
      className="flex flex-row w-screen relative gap-x-2 overflow-x-scroll pr-8"
      ref={container}
    >
      <SmallHorizontalCard />
    </div>
  )
}
