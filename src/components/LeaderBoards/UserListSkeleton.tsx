import TaskSkeleton from 'components/Tasks/TaskSkeleton'

export default function () {
  return (
    <div className="flex flex-col gap-y-6 justify-between items-center px-4 py-3 bg-tertiary border-b border-white border-opacity-5 rounded-xl">
      {[...Array(21)].map(() => (
        <TaskSkeleton />
      ))}
    </div>
  )
}
