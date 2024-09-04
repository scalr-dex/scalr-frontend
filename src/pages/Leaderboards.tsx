import GetHelp from 'components/icons/GetHelp'
import { Header3 } from 'components/Text'
import UserList from 'components/LeaderBoards/UserList'
import YourEpochVolume from 'components/LeaderBoards/YourEpochVolume'
import YourPosition from 'components/LeaderBoards/YourPosition'
import LeaderBoardsFaqModal from 'components/Modals/LeaderBoardsFaqModal'
import UserAtom from 'helpers/atoms/UserAtom'
import useLeaderBoard from 'helpers/hooks/useLeaderBoard'
import { useAtomValue } from 'jotai'
import { useState } from 'preact/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function () {
  const [parent] = useAutoAnimate()
  const [modalOpen, setModalOpen] = useState(false)
  const user = useAtomValue(UserAtom)
  const { data, status } = useLeaderBoard()

  const loading = status === 'pending'

  const tgUser = user?.launchParams?.initData?.user

  return (
    <div className="flex flex-col px-4 gap-y-10" ref={parent}>
      <YourEpochVolume points={data?.user?.points} />
      <div className="flex flex-row items-center gap-x-1">
        <Header3>Leaderboard</Header3>
        <GetHelp onClick={() => setModalOpen(true)} size={20} />
      </div>
      <YourPosition
        userName={tgUser?.username || tgUser?.firstName}
        userRank={data?.user?.user_rank}
        loading={loading}
      />
      <UserList users={data?.lb} loading={loading} />
      <LeaderBoardsFaqModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
