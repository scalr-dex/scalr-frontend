import DotsLoader from 'components/DotsLoader'
import { Header3 } from 'components/icons/Text'
import formatUSA from 'helpers/formatUSA'

export default function ({
  userName,
  userRank = 0,
  loading,
}: {
  userName: string | undefined
  userRank: number | undefined
  loading: boolean
}) {
  return (
    <div className="flex flex-row justify-between rounded-2xl px-5 py-3 bg-border-gradient">
      <Header3 className="truncate">{userName}</Header3>
      <Header3>#{loading ? <DotsLoader /> : formatUSA(userRank)}</Header3>
    </div>
  )
}
