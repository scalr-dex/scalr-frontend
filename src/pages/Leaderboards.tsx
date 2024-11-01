import GetHelp from 'components/icons/GetHelp'
import { Header3 } from 'components/Text'
import UserList from 'components/LeaderBoards/UserList'
import YourPoints from 'components/LeaderBoards/YourPoints'
import YourPosition from 'components/LeaderBoards/YourPosition'
import LeaderBoardsFaqModal from 'components/Modals/LeaderBoardsFaqModal'
import UserAtom from 'helpers/atoms/UserAtom'
import useLeaderBoard from 'helpers/hooks/useLeaderBoard'
import { useAtomValue } from 'jotai'
import { useState } from 'preact/hooks'
import FooterSafeArea from 'components/FooterSafeArea'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)
  const user = useAtomValue(UserAtom)
  const { data, status } = useLeaderBoard()

  const loading = status === 'pending'

  return (
    <div className="flex flex-col mt-2 px-4 gap-y-10">
      <YourPoints points={data?.user?.points} />

      <div className="flex flex-row items-center gap-x-1">
        <Header3>Leaderboard</Header3>
        <GetHelp onClick={() => setModalOpen(true)} size={20} />
      </div>
      <YourPosition
        userName={user?.username}
        userRank={data?.user?.user_rank}
        loading={loading}
      />
      <UserList users={data?.lb} loading={loading} />
      <LeaderBoardsFaqModal showModal={modalOpen} setShowModal={setModalOpen} />
      <FooterSafeArea />
    </div>
  )
}
