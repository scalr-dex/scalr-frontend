import DotsLoader from 'components/DotsLoader'
import { Header3 } from 'components/icons/Text'
import formatUSA from 'helpers/formatUSA'

export default function ({
  userName,
  userRank,
}: {
  userName: string | undefined
  userRank: number | undefined
}) {
  return (
    <div className="flex flex-row justify-between rounded-2xl px-5 py-3 bg-border-gradient">
      <Header3 className="truncate">{userName}</Header3>
      <Header3>#{userRank ? formatUSA(userRank) : <DotsLoader />}</Header3>
    </div>
  )
}
