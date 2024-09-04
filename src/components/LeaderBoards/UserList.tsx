import { Header3 } from 'components/Text'
import { LeaderBoardUser } from 'type/LeaderBoardResponse'
import UserListSkeleton from 'components/LeaderBoards/UserListSkeleton'
import UserListItem from 'components/LeaderBoards/UserListItem'

export default function ({
  users,
  loading,
}: {
  users: LeaderBoardUser[] | undefined
  loading: boolean
}) {
  if (loading) return <UserListSkeleton />
  if (!users?.length)
    return (
      <Header3 className="text-center">
        <p>Leaderboard is being formed</p>
        <p>stay tuned 😎</p>
      </Header3>
    )

  return (
    <div>
      {users.map((item, index) => (
        <UserListItem item={item} index={index} key={item.telegram_id} />
      ))}
    </div>
  )
}
