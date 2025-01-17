import { useQuery } from '@tanstack/react-query'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import TaskSkeleton from 'components/Tasks/TaskSkeleton'
import { getTasks } from 'helpers/api/userTasks'
import { QueryKeys } from 'helpers/queryClient'
import { useCallback } from 'react'
import UserTask from 'type/UserTask'
import sortTasks from 'helpers/sortTasks'
import FooterSafeArea from 'components/FooterSafeArea'
import Points from 'components/Main/Points'
import TaskSection from 'components/Tasks/TaskSection'
import DailyTasks from 'components/Tasks/DailyTasks/index'
import HorizontalCards from 'components/Tasks/HorizontalCards'
import DocumentPaper from 'components/icons/DocumentPaper'
import BattleTicketButton from 'components/BattleTicketButton'
import DailyStreakButton from 'components/Tasks/DailyStreakButton'
import { useAtomValue, useSetAtom } from 'jotai'
import { userBalanceAtom } from 'helpers/atoms/UserAtom'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'

export default function () {
  const setModal = useSetAtom(modalsAtom)
  const userBalance = useAtomValue(userBalanceAtom)
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
    <div className="flex flex-col flex-1 gap-y-8 px-4 my-4 overflow-x-clip">
      <div className="flex flex-row justify-between">
        <Points amount={userBalance} />
        <div className="flex flex-row gap-x-2 items-center">
          <DocumentPaper
            onClick={() => setModal(AvailableModals.season1stats)}
          />
          <DailyStreakButton />
          <BattleTicketButton />
        </div>
      </div>

      <HorizontalCards />

      <TaskSection>
        <InviteFriends />
      </TaskSection>

      <DailyTasks />

      <TaskSection headerText="One-time tasks">
        {data
          ? data.sort(sortTasks).map(renderTask)
          : [...Array(5)].map((_, index) => (
              <TaskSkeleton key={`task-skeleton-${index}`} />
            ))}
      </TaskSection>

      <FooterSafeArea />
    </div>
  )
}
