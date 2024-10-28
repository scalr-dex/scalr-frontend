import { useQuery } from '@tanstack/react-query'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import TaskSkeleton from 'components/Tasks/TaskSkeleton'
import { getTasks } from 'helpers/api/userTasks'
import { QueryKeys } from 'helpers/queryClient'
import { useCallback } from 'preact/hooks'
import UserTask from 'type/UserTask'
import sortTasks from 'helpers/sortTasks'
import FooterSafeArea from 'components/FooterSafeArea'
import Points from 'components/Main/Points'
import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import { useAtomValue } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'
import DailyStreakButton from 'components/Tasks/DailyStreakButton'
import TaskSection from 'components/Tasks/TaskSection'
import DailyTasks from 'components/Tasks/DailyTasks/index'

export default function () {
  const user = useAtomValue(UserAtom)
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
    <div className="flex flex-col flex-1 gap-y-8 px-4 my-4">
      <div className="flex flex-row w-full items-center justify-between">
        <Points amount={user?.balance} />
        <div className="flex flex-row gap-x-2 items-center">
          <ImgWithComponentFallback name={user?.username} />
          <DailyStreakButton streak={user?.loginDays} />
        </div>
      </div>

      <TaskSection>
        <InviteFriends />
      </TaskSection>

      <DailyTasks />

      <TaskSection headerText="One-time tasks">
        {data
          ? data.sort(sortTasks).map(renderTask)
          : [...Array(5)].map(() => <TaskSkeleton />)}
      </TaskSection>

      <FooterSafeArea />
    </div>
  )
}
