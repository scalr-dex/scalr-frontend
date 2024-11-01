import env from 'helpers/env'
import handleError from 'helpers/handleError'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { ShowPromiseResult, AdController } from 'type/adsgram'

export interface AdsgramHookParams {
  rewardAmount: number
  blockId?: number
  onReward?: () => void
  onError?: (result: ShowPromiseResult) => void
}

export default function useAdsgram({
  blockId = env.VITE_ADSGRAM_BLOCK_ID,
  onReward,
  onError,
  rewardAmount,
}: AdsgramHookParams) {
  const AdControllerRef = useRef<AdController | undefined>(undefined)

  const reward = useCallback(() => {
    onReward?.()
    toast.success(`Nice, you got ${rewardAmount} pts 😎`)
  }, [onReward, rewardAmount])
  const catchError = useCallback(
    (result: ShowPromiseResult) => {
      onError?.(result)
      toast.error('Oh no, failed to load the video 😥')
      handleError({ e: result.description })
    },
    [onError]
  )

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId: String(blockId) })
  }, [blockId])

  return useCallback(async () => {
    if (AdControllerRef.current) {
      await AdControllerRef.current.show().then(reward).catch(catchError)
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      })
    }
  }, [catchError, onError, reward])
}
