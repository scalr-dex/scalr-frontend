import env from 'helpers/env'
import { useCallback, useEffect, useRef } from 'react'
import type { AdController, ShowPromiseResult } from 'type/adsgram'

export interface useAdsgramParams {
  blockId: string
  onReward: () => void
  onError?: (result: ShowPromiseResult) => void
}

export function useAdsgram({ blockId, onReward, onError }: useAdsgramParams) {
  const AdControllerRef = useRef<AdController | undefined>(undefined)

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({
      blockId,
      debug: env.DEV,
      debugBannerType: 'FullscreenMedia',
    })
  }, [blockId])

  return useCallback(async () => {
    if (AdControllerRef.current) {
      await AdControllerRef.current.show().then(onReward).catch(onError)
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
