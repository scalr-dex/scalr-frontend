import ButtonSmall from 'components/ButtonSmall'
import ChevronRight from 'components/icons/ChevronRight'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { track } from '@amplitude/analytics-browser'
import { useAtom } from 'jotai'
import { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import TrackerEvents from 'type/TrackerEvents'
import { useLongPress } from 'use-long-press'
import useProgressiveHaptic from 'helpers/hooks/useProgressiveHaptic'
import AnimationState from 'type/AnimationState'

dayjs.extend(objectSupport)

const animationDuration = 1500

export default function () {
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)
  const [loading, setLoading] = useState(false)
  const [animation, setAnimation] = useState(AnimationState.init)

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0
  const disabled = !canClaim
  useProgressiveHaptic({
    duration: animationDuration,
    state: animation,
    disabled,
  })

  const onClick = useCallback(async () => {
    setLoading(true)
    const newTime = await claimDailyReward()
    if (newTime) setTimeToReward(newTime)

    track(TrackerEvents.claimDailyReward)

    setLoading(false)
  }, [setTimeToReward])

  const bind = useLongPress(onClick, {
    onStart: () => {
      if (disabled) return
      setAnimation(AnimationState.running)
    },
    onFinish: () => {
      setAnimation(AnimationState.finished)
    },
    onCancel: () => setAnimation(AnimationState.canceled),
    threshold: animationDuration,
  })

  const isRunning = animation === AnimationState.running
  const buttonText = canClaim
    ? 'Hold to Claim'
    : dayjs({ seconds }).format('HH[h] mm[m]')

  const scale = isRunning ? 'scale-110' : 'scale-100'

  return (
    <ButtonSmall
      {...bind()}
      buttonType={ButtonTypes.special}
      iconRight={canClaim ? <ChevronRight /> : null}
      disabled={disabled}
      isLoading={loading}
      className={`px-4 py-1.5 select-none !w-40 h-9 ${scale}`}
      style={{
        transitionDuration: animationDuration + 'ms',
        transition: `transform ${animationDuration}ms ease-in-out`,
      }}
    >
      <span className="pb-0.5">{buttonText}</span>
    </ButtonSmall>
  )
}
