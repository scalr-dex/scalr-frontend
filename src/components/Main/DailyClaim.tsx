import ButtonSmall from 'components/ButtonSmall'
import ChevronRight from 'components/icons/ChevronRight'
import dayjs from 'dayjs'
import claimDailyReward from 'helpers/api/dailyReward'
import { useCallback, useEffect, useState } from 'preact/hooks'
import objectSupport from 'dayjs/plugin/objectSupport'
import ButtonTypes from 'type/Button'
import { track } from '@amplitude/analytics-browser'
import { useAtom } from 'jotai'
import { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import TrackerEvents from 'type/TrackerEvents'
import { useLongPress } from 'use-long-press'
import { useHapticFeedback } from '@telegram-apps/sdk-react'

dayjs.extend(objectSupport)

const animationDuration = 5000

enum AnimationState {
  init,
  playing,
  canceled,
  finished,
}

export default function () {
  const [timeToReward, setTimeToReward] = useAtom(timeToRewardAtom)
  const [loading, setLoading] = useState(false)
  const [animation, setAnimation] = useState(AnimationState.init)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null) // Store the interval ID
  const haptic = useHapticFeedback()

  const seconds = dayjs(timeToReward).diff(dayjs(), 'seconds')
  const canClaim = seconds < 0

  const onClick = useCallback(async () => {
    setLoading(true)
    const newTime = await claimDailyReward()
    if (newTime) setTimeToReward(newTime)

    track(TrackerEvents.claimDailyReward)

    setLoading(false)
  }, [setTimeToReward])

  useEffect(() => {
    if (animation === AnimationState.canceled) {
      haptic.notificationOccurred('error')
      if (intervalId) clearInterval(intervalId) // Stop haptic feedback on cancel
      setIntervalId(null)
    }

    if (animation === AnimationState.finished) {
      haptic.notificationOccurred('success')
      if (intervalId) clearInterval(intervalId) // Stop haptic feedback on finish
      setIntervalId(null)
    }

    if (animation === AnimationState.playing) {
      const interval = animationDuration / 20 // Start with an interval 1/20th of the duration
      let timeElapsed = 0

      const id = setInterval(() => {
        timeElapsed += interval
        const remaining = animationDuration - timeElapsed

        // Play haptic feedback
        haptic.impactOccurred('medium')

        // Reduce the interval as time progresses, up to a minimum frequency
        if (remaining > 0) {
          const newInterval = Math.max(50, remaining / 10) // Adjust interval, min 50ms
          clearInterval(id)
          setIntervalId(
            setInterval(() => {
              haptic.impactOccurred('medium')
            }, newInterval)
          )
        } else {
          clearInterval(id)
          setIntervalId(null)
          setAnimation(AnimationState.finished) // Automatically finish when time's up
        }
      }, interval)

      setIntervalId(id)
    }

    return () => {
      if (intervalId) clearInterval(intervalId) // Cleanup interval on unmount or state change
    }
  }, [animation, haptic, intervalId])

  const bind = useLongPress(onClick, {
    onStart: () => {
      setAnimation(AnimationState.playing)
    },
    onFinish: () => {
      setAnimation(AnimationState.finished)
    },
    onCancel: () => {
      console.log('cancel')
      setAnimation(AnimationState.canceled)
    },
    threshold: animationDuration,
  })

  return (
    <ButtonSmall
      {...bind()}
      buttonType={ButtonTypes.special}
      iconRight={canClaim ? <ChevronRight /> : null}
      disabled={!canClaim}
      isLoading={loading}
      className="px-4 py-1.5 select-none"
    >
      {canClaim ? 'Daily Claim' : dayjs({ seconds }).format('HH[h] mm[m]')}
    </ButtonSmall>
  )
}
