import { AccentText } from 'components/icons/Text'
import ImageWithFallback from 'components/ImageWithFallback'
import formatUSA from 'helpers/formatUSA'
import { LeaderBoardUser } from 'type/LeaderBoardResponse'
import UserListSkeleton from 'components/LeaderBoards/UserListSkeleton'

export default function ({ users }: { users: LeaderBoardUser[] | undefined }) {
  const renderItem = ({
    item,
    index,
  }: {
    item: LeaderBoardUser
    index: number
  }) => {
    const isTopThree = index < 3
    const bg = isTopThree
      ? 'bg-success-alt px-2 py-0.5 rounded-full text-primary'
      : ''

    return (
      <div className="flex flex-row justify-between items-center px-4 py-3 bg-tertiary border-b border-white border-opacity-5 h-14 first:rounded-t-xl last:rounded-b-xl">
        <div className="flex flex-row gap-x-3 items-center">
          <ImageWithFallback
            src={item.telegram_id.toString()}
            className="rounded-full w-8 h-8"
          />
          <AccentText className="font-semibold">{item.telegram_id}</AccentText>
        </div>

        <div className="flex flex-row gap-x-4 text-sm">
          <AccentText>{formatUSA(item.points)}</AccentText>
          <AccentText className={`font-semibold ${bg}`}>
            {isTopThree ? '' : '#'}
            {index + 1}
          </AccentText>
        </div>
      </div>
    )
  }

  return (
    <div>
      {users ? (
        users.map((item, index) => renderItem({ item, index }))
      ) : (
        <UserListSkeleton />
      )}
    </div>
  )
}
