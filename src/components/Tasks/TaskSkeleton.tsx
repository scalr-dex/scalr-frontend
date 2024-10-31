export default function () {
  return (
    <div className="flex flex-row justify-between w-full gap-x-2 h-14 animate-pulse">
      <div className="w-9 h-8 rounded-lg bg-white/50 mt-[1px]" />
      <div className="flex flex-col gap-y-1 w-full">
        <div className="w-full h-1/2 rounded-xl bg-white-16" />
        <div className="w-1/2 h-1/2 rounded-xl bg-white-16" />
      </div>
    </div>
  )
}
