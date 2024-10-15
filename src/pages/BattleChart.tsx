import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import BattleBetBlock from 'components/BattleGame/BattleBetBlock'
import RoundCounter from 'components/BattleGame/RoundCounter'
import BattleTimer from 'components/BattleGame/BattleTimer'
import { BodyText, Header4 } from 'components/Text'
import { useState } from 'preact/hooks'
import { BetStatus } from 'type/Battles'
import env from 'helpers/env'

export default function () {
  const data = useAtomValue(priceHistoryAtom)
  const gameStatus = useAtomValue(battleGameAtom)
  const [betStatus, setBetStatus] = useState(BetStatus.betBlocked)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const loading = !data.length

  const currentRoundIndex = gameStatus.roundSeparators.length - 1

  return (
    <div className="flex flex-col h-full">
      <TokenPrice price={lastValue?.[1]} betSize={gameStatus.betSize} />
      <Chart
        data={data}
        roundSeparators={gameStatus.roundSeparators}
        loading={loading}
        lineColor="#FFE792"
      />
      <div className="flex flex-col gap-y-4 px-4">
        <RoundCounter currentRound={currentRoundIndex} />
        <BattleTimer
          betStatus={betStatus}
          setBetStatus={setBetStatus}
          endTime={gameStatus.roundSeparators[currentRoundIndex]}
        />

        <div className="flex flew-row items-center gap-x-2 self-center">
          <BodyText className="text-white/50">Score:</BodyText>
          <Header4>
            {gameStatus.playerScore.length
              ? gameStatus.playerScore
                  .map(({ Points }) => Points || 0)
                  .join('-')
              : '0-0'}
          </Header4>
        </div>

        <BattleBetBlock
          onBetSuccess={() => setBetStatus(BetStatus.didBet)}
          lobbyId={gameStatus.lobbyId}
          loading={loading || betStatus !== BetStatus.canBet}
        />
        {env.DEV ? <span>{gameStatus.lobbyId}</span> : null}
      </div>
    </div>
  )
}
