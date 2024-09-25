import { useCallback, useEffect, useRef } from 'react'
import { ShowPromiseResult, AdController } from 'type/adsgram'

export interface useAdsgramParams {
  blockId: string
  onReward: () => void
  onError?: (result: ShowPromiseResult) => void
}

export default function useAdsgram({
  blockId,
  onReward,
  onError,
}: useAdsgramParams): () => Promise<void> {
  const AdControllerRef = useRef<AdController | undefined>(undefined)

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({
      blockId,
      debug: true,
      debugBannerType: 'FullscreenMedia',
    })
  }, [blockId])

  return useCallback(async () => {
    if (AdControllerRef.current) {
      await AdControllerRef.current
        .show()
        .then(() => {
          // user watch ad till the end
          onReward()
        })
        .catch((result: ShowPromiseResult) => {
          // user get error during playing ad or skip ad
          onError?.(result)
        })
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      })
    }
  }, [onError, onReward])
}
