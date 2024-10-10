import BattleName from 'components/BattleGame/BattleName'
import BattleStartButtons from 'components/BattleGame/BattleStartButtons'
import BetAmount from 'components/BattleGame/BetAmount'
import CurrentOnline from 'components/BattleGame/CurrentOnline'
import CardFilled from 'components/CardFilled'
import ScalrBattleLogo from 'components/icons/ScalrBattleLogo'
import GetHelp from 'components/icons/GetHelp'
import BattleHelpModal from 'components/Modals/BattleHelpModal'
import BattleLoadingJoinModal from 'components/Modals/BattleLoadingJoinModal'
import { BodyText, Header4 } from 'components/Text'
import { joinPrivateLobby } from 'helpers/api/battles'
import handleError from 'helpers/handleError'
import { useCallback, useEffect, useState } from 'preact/hooks'

export default function ({ code }: { code?: string }) {
  const [showHelp, setShowHelp] = useState(false)
  const [betAmount, setBetAmount] = useState(20)
  const [loading, setLoading] = useState(false)

  const onCodeFromLink = useCallback(async (code: string) => {
    try {
      setLoading(true)
      await joinPrivateLobby(code)
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to join private room 😥' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!code) return

    void onCodeFromLink(code)
  }, [code, onCodeFromLink])

  return (
    <div className="flex flex-col h-full px-4 pb-footer-height">
      <ScalrBattleLogo />

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

      <BattleLoadingJoinModal showModal={loading} setShowModal={setLoading} />
      <BattleHelpModal showModal={showHelp} setShowModal={setShowHelp} />
    </div>
  )
}
