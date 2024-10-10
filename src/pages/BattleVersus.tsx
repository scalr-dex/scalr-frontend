import ButtonSmall from 'components/ButtonSmall'
import BattleLogo from 'components/icons/BattleLogo'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import Lightning from 'components/icons/Lightning'
import { Header3 } from 'components/Text'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import formatUSA from 'helpers/formatters/formatUSA'
import useCountDown from 'helpers/hooks/useCountDown'
import { useAtomValue } from 'jotai'
import { useEffect } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { navigate } from 'wouter-preact/use-hash-location'

const screenTime = 3000

export default function () {
  const gameStatus = useAtomValue(battleGameAtom)
  const { formatted } = useCountDown({
    endTime: Date.now() + screenTime,
    format: 's',
  })

  useEffect(() => {
    setTimeout(() => navigate('/battle/chart'), screenTime)
  }, [])

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-screen">
      <div className="relative">
        <Lightning className="absolute -left-6 -top-4 animate-hovering" />
        <BattleLogo />
        <div className="-scale-x-100 absolute -right-7 -top-4">
          <Lightning className="animate-hovering" />
        </div>
      </div>
      <Header3>The battle will start in:</Header3>
      <Header3 className="text-accent-bright">{formatted}</Header3>
      <ButtonSmall
        buttonType={ButtonTypes.neutral}
        rounded="rounded-full"
        className="text-accent-hover px-3 py-1"
        iconLeft={<ScalrCoin size={17} />}
      >
        Points: {formatUSA(gameStatus.betSize)}
      </ButtonSmall>
    </div>
  )
}
