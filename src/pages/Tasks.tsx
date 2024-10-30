import { useQuery } from '@tanstack/react-query'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import TaskSkeleton from 'components/Tasks/TaskSkeleton'
import { getTasks } from 'helpers/api/userTasks'
import { QueryKeys } from 'helpers/queryClient'
import { useCallback, useState } from 'preact/hooks'
import UserTask from 'type/UserTask'
import sortTasks from 'helpers/sortTasks'
import FooterSafeArea from 'components/FooterSafeArea'
import Points from 'components/Main/Points'
import { useAtomValue } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'
import DailyStreakButton from 'components/Tasks/DailyStreakButton'
import TaskSection from 'components/Tasks/TaskSection'
import DailyTasks from 'components/Tasks/DailyTasks/index'
import HorizontalCards from 'components/Tasks/HorizontalCards'
import DocumentPaper from 'components/icons/DocumentPaper'
import SeasonStats from 'components/Modals/SeasonStats'
import BattleTicketButton from 'components/BattleTicketButton'

export default function () {
  const [openStatsModal, setOpenStatsModal] = useState(false)
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
    <div className="flex flex-col flex-1 gap-y-8 px-4 my-4 overflow-x-clip">
      <div className="flex flex-row justify-between">
        <Points amount={user?.balance} />
        <div className="flex flex-row gap-x-2 items-center">
          <DocumentPaper onClick={() => setOpenStatsModal(true)} />
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
          : [...Array(5)].map(() => <TaskSkeleton />)}
      </TaskSection>

      <FooterSafeArea />

      <SeasonStats
        showModal={openStatsModal}
        setShowModal={setOpenStatsModal}
      />
    </div>
  )
}
