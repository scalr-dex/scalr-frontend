import SmallHorizontalCard from 'components/Tasks/SmallHorizontalCard'

export default function () {
  return (
    <div className="flex flex-row w-screen relative gap-x-2 overflow-x-scroll pr-8">
      <SmallHorizontalCard />
      <SmallHorizontalCard />
      <SmallHorizontalCard />
    </div>
  )
}
