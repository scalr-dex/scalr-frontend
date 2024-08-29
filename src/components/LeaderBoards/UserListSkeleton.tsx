import TaskSkeleton from 'components/Tasks/TaskSkeleton'

export default function () {
  return (
    <div className="flex flex-col gap-y-6">
      {[...Array(5)].map(() => (
        <TaskSkeleton />
      ))}
    </div>
  )
}
