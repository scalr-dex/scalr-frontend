import { useHapticFeedback } from '@telegram-apps/sdk-react'
import { useEffect } from 'preact/hooks'
import AnimationState from 'type/AnimationState'

export default function ({
  duration,
  state,
  disabled,
}: {
  duration: number
  state: AnimationState
  disabled?: boolean
}) {
  const haptic = useHapticFeedback()

  useEffect(() => {
    if (disabled) return

    let intervalId: number | null = null
    let startTime: number

    const startHapticFeedback = () => {
      startTime = performance.now()

      const hapticFeedbackLoop = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const remainingTime = duration - elapsedTime

        if (state === AnimationState.running && remainingTime > 0) {
          // Closer to 0 -> faster haptic
          const interval = Math.max(50, (remainingTime / duration) * 200)

          let feedbackStrength: 'light' | 'medium' | 'heavy'
          if (remainingTime > duration / 1.5) {
            feedbackStrength = 'light'
          } else if (remainingTime > duration / 2.25) {
            feedbackStrength = 'medium'
          } else {
            feedbackStrength = 'heavy'
          }

          haptic.impactOccurred(feedbackStrength)

          intervalId = window.setTimeout(
            () => requestAnimationFrame(hapticFeedbackLoop),
            interval
          )
        } else {
          if (intervalId) clearTimeout(intervalId)
        }
      }

      requestAnimationFrame(hapticFeedbackLoop)
    }

    if (state === AnimationState.running) {
      startHapticFeedback()
    } else {
      if (intervalId) clearTimeout(intervalId)
      if (state === AnimationState.canceled) {
        haptic.notificationOccurred('error')
      }
      if (state === AnimationState.finished) {
        haptic.notificationOccurred('success')
      }
    }

    return () => {
      if (intervalId) clearTimeout(intervalId)
    }
  }, [state, haptic, duration, disabled])
}
