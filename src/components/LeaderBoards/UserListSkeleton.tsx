function ItemSkeleton() {
  return (
    <div className="flex flex-row justify-between items-center w-full animate-pulse">
      <div className="flex flex-row gap-x-2 items-center">
        <div className="w-8 h-8 rounded-full bg-white/50" />
        <div className="w-32 h-4 rounded-full bg-white/50" />
      </div>
      <div className="w-16 h-4 rounded-full bg-white/50" />
    </div>
  )
}

export default function () {
  return (
    <div className="flex flex-col gap-y-6 justify-between items-center px-4 py-3 bg-tertiary border-b border-white border-opacity-5 rounded-xl">
      {[...Array(21)].map((_, index) => (
        <ItemSkeleton key={`user-list-skeleton-${index}`} />
      ))}
    </div>
  )
}
