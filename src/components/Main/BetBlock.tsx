import Points from 'components/Main/Points'
import DailyClaim from 'components/Main/DailyClaim'
import SelectBet from 'components/Main/SelectBet'
import Button from 'components/Button'
import StonksArrow from 'components/icons/StonksArrow'
import ButtonTypes from 'type/Button'
import { useState } from 'preact/hooks'
import { toast } from 'react-toastify'
import { useAtomValue } from 'jotai'
import UserAtom from 'helpers/atoms/UserAtom'

export default function () {
  const [betValue, setBetValue] = useState(0)
  const user = useAtomValue(UserAtom)

  const disabled = betValue <= 0

  return (
    <div className="flex flex-col px-4 gap-y-5">
      <div className="flex flex-row justify-between items-center">
        <Points amount={user?.balance} />{' '}
        <DailyClaim timeToReward={user?.timeToReward} />
      </div>

      <SelectBet value={betValue} setValue={setBetValue} max={user?.balance} />
      <div className="flex flex-row gap-x-1">
        <Button
          buttonType={ButtonTypes.success}
          iconRight={<StonksArrow size={16} />}
          disabled={disabled}
          onClick={() => {
            toast('Niiiice')
          }}
        >
          Higher
        </Button>
        <Button
          buttonType={ButtonTypes.error}
          iconRight={<StonksArrow rotate={90} size={16} />}
          disabled={disabled}
          onClick={() => {
            toast('Doooown')
          }}
        >
          Lower
        </Button>
      </div>
    </div>
  )
}
