import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import { AccentText } from 'components/Text'
import formatUSA from 'helpers/formatters/formatUSA'
import { LeaderBoardUser } from 'type/LeaderBoardResponse'

export default function ({
  item,
  index,
}: {
  item: LeaderBoardUser
  index: number
}) {
  const isTopThree = index < 3
  const bg = isTopThree
    ? 'bg-success-alt px-2 py-0.5 rounded-full text-primary'
    : ''

  const name = item.name || item.telegram_id

  return (
    <div className="flex flex-row justify-between items-center px-4 py-3 bg-tertiary border-b border-white border-opacity-5 h-14 first:rounded-t-xl last:rounded-b-xl">
      <div className="flex flex-row gap-x-3 items-center">
        <ImgWithComponentFallback imgUrl={item.userPfp} name={String(name)} />
        <AccentText className="font-semibold truncate max-w-28">
          {name}
        </AccentText>
      </div>

      <div className="flex flex-row items-center gap-x-4 text-sm">
        <AccentText>{formatUSA(item.points)}</AccentText>
        <AccentText className={`font-semibold text-center w-6 ${bg}`}>
          {isTopThree ? '' : '#'}
          {index + 1}
        </AccentText>
      </div>
    </div>
  )
}
