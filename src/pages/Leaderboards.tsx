import GetHelp from 'components/icons/GetHelp'
import { Header3 } from 'components/Text'
import UserList from 'components/LeaderBoards/UserList'
import YourPoints from 'components/LeaderBoards/YourPoints'
import YourPosition from 'components/LeaderBoards/YourPosition'
import UserAtom from 'helpers/atoms/UserAtom'
import useLeaderBoard from 'helpers/hooks/useLeaderBoard'
import { useAtomValue, useSetAtom } from 'jotai'
import FooterSafeArea from 'components/FooterSafeArea'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import KingOfTheHill from 'components/KingOfTheHill'

export default function () {
  const setModalOpen = useSetAtom(modalsAtom)
  const user = useAtomValue(UserAtom)
  const { data, status } = useLeaderBoard()

  const loading = status === 'pending'

  return (
    <div className="flex flex-col mt-2 px-4 gap-y-10">
      <YourPoints points={data?.user?.points} />

      <div className="flex flex-row items-center gap-x-1">
        <Header3>Leaderboard</Header3>
        <GetHelp
          onClick={() => setModalOpen(AvailableModals.leaderBoardInfo)}
          size={20}
        />
      </div>
      <YourPosition
        userName={user?.username}
        userRank={data?.user?.user_rank}
        loading={loading}
      />
      <KingOfTheHill king={data?.king} loading={loading} />
      <UserList users={data?.lb} loading={loading} />
      <FooterSafeArea />
    </div>
  )
}
