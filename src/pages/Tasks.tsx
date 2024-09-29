import { useQuery } from '@tanstack/react-query'
import Logo from 'components/icons/Logo'
import { AccentText, Header2 } from 'components/Text'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import TaskSkeleton from 'components/Tasks/TaskSkeleton'
import { getTasks } from 'helpers/api/userTasks'
import { QueryKeys } from 'helpers/queryClient'
import { useCallback } from 'preact/hooks'
import UserTask from 'type/UserTask'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import sortTasks from 'helpers/sortTasks'
import AdBlock from 'components/Tasks/AdBlock'
import FooterSafeArea from 'components/FooterSafeArea'

export default function () {
  const [parent] = useAutoAnimate()
  const { data, refetch } = useQuery({
    queryKey: [QueryKeys.userTasks],
    queryFn: getTasks,
  })

  const renderTask = useCallback(
    (taskData: UserTask) => (
      <TaskBlock {...taskData} refetch={refetch} key={taskData.TaskID} />
    ),
    [refetch]
  )

  return (
    <div className="flex flex-col flex-1 gap-y-8 px-4">
      <div className="flex flex-col gap-y-4 w-full items-center text-center">
        <Logo size={68} />
        <Header2>Tasks available</Header2>
        <AccentText>
          We’ll reward you immediately with points after each task completion
        </AccentText>
      </div>
      <InviteFriends />
      <div className="flex flex-col gap-y-6" ref={parent}>
        <AdBlock />
        {data
          ? data.sort(sortTasks).map(renderTask)
          : [...Array(5)].map(() => <TaskSkeleton />)}
      </div>
      <FooterSafeArea />
    </div>
  )
}
