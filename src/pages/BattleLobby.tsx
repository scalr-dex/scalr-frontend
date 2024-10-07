import BattleName from 'components/BattleGame/BattleName'
import BattleStartButtons from 'components/BattleGame/BattleStartButtons'
import BetAmount from 'components/BattleGame/BetAmount'
import CrystalsBalanceCard from 'components/BattleGame/CrystalsBalanceCard'
import CurrentOnline from 'components/BattleGame/CurrentOnline'
import CardFilled from 'components/CardFilled'
import BattlesLogo from 'components/icons/BattlesLogo'
import GetHelp from 'components/icons/GetHelp'
import BattleHelpModal from 'components/Modals/BattleHelpModal'
import BattleResultModal from 'components/Modals/BattleResultModal'
import { BodyText, Header4 } from 'components/Text'
import { useState } from 'preact/hooks'
import { useHistoryState } from 'wouter-preact/use-browser-location'

export default function () {
  const historyState =
    useHistoryState<{
      amount?: number
      id?: number
    }>() || {}
  const [showBattleResult, setShowBattleResult] = useState(!!historyState.id)

  const [showHelp, setShowHelp] = useState(false)
  const [betAmount, setBetAmount] = useState(20)

  return (
    <div className="flex flex-col h-full px-4 pb-footer-height">
      <BattlesLogo />

      <CrystalsBalanceCard />

      <div className="flex flex-row justify-between items-center mb-4">
        <Header4>Battle amount</Header4>
        <BodyText className="font-semibold text-controls-secondary-disabled">
          See rules
          <GetHelp onClick={() => setShowHelp(true)} />
        </BodyText>
      </div>

      <CardFilled className="flex-col gap-y-6 items-center mb-6">
        <CurrentOnline />
        <BetAmount betAmount={betAmount} setBetAmount={setBetAmount} />
        <BattleName />
      </CardFilled>

      <BattleStartButtons betAmount={betAmount} />

      <BattleResultModal
        amount={historyState.amount || 0}
        winnerId={historyState.id || 0}
        showModal={showBattleResult}
        setShowModal={setShowBattleResult}
      />
      <BattleHelpModal showModal={showHelp} setShowModal={setShowHelp} />
    </div>
  )
}
