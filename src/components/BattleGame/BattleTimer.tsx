import { BodyText, Header4 } from 'components/Text'
import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'
import { Dispatch, useEffect } from 'preact/hooks'
import { BetStatus } from 'type/Battles'

const bettingDuration = 5000

function BettingTimer() {
  const { time } = useCountDown({ endTime: Date.now() + bettingDuration })

  return <>{time}</>
}

export default function BattleTimer({
  setBetStatus,
  betStatus,
  endTime,
}: {
  betStatus: BetStatus
  setBetStatus: Dispatch<BetStatus>
  endTime: number
}) {
  const time = dayjs(endTime).diff(dayjs(), 'seconds')

  const bettingTime = time <= 0

  useEffect(() => {
    if (bettingTime && betStatus !== BetStatus.didBet)
      setBetStatus(BetStatus.canBet)
    if (!bettingTime) setBetStatus(BetStatus.betBlocked)
  }, [bettingTime, betStatus, setBetStatus, time])

  return (
    <div className="flex flew-row items-center gap-x-2 self-center">
      <BodyText className="text-white/50">
        {bettingTime ? 'Betting time left:' : 'Result time left:'}
      </BodyText>
      <Header4>{bettingTime ? <BettingTimer /> : time} sec</Header4>
    </div>
  )
}
