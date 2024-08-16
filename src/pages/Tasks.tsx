import { useQuery } from '@tanstack/react-query'
import Logo from 'components/icons/Logo'
import { AccentText, Header2 } from 'components/icons/Text'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import TaskSkeleton from 'components/Tasks/TaskSkeleton'
import { getTasks } from 'helpers/api/userTasks'
import { QueryKeys } from 'helpers/queryClient'

export default function () {
  const { data, refetch } = useQuery({
    queryKey: [QueryKeys.userTasks],
    queryFn: getTasks,
  })

  return (
    <div className="flex flex-col flex-1 gap-y-8 px-4">
      <div className="flex flex-col gap-y-4 w-full items-center text-center">
        <Logo size={68} />
        <Header2>Tasks available</Header2>
        <AccentText>
          We’ll reward you immediately with points after each task completion
        </AccentText>
      </div>
      <div className="flex flex-col gap-y-6">
        {data
          ? data.map((taskData) => (
              <TaskBlock {...taskData} refetch={refetch} />
            ))
          : [...Array(5)].map(() => <TaskSkeleton />)}
      </div>
      <InviteFriends />
    </div>
  )
}
