import TaskUi from 'components/Tasks/TaskUi'
import env from 'helpers/env'
import handleError from 'helpers/handleError'
import useAdsgram from 'helpers/hooks/useAdsgram'
import { useCallback } from 'preact/hooks'
import { toast } from 'react-toastify'
import ButtonTypes from 'type/Button'
import { iconNumberToIcon } from 'type/UserTask'
import { ShowPromiseResult } from 'type/adsgram'

export default function () {
  const onReward = useCallback(() => {
    toast.success('Nice, you got +10,000 pts 😎')
  }, [])
  const onError = useCallback((result: ShowPromiseResult) => {
    toast.error('Oh no, failed to load the Ad 😥')
    handleError({ e: result.description })
  }, [])

  const showAd = useAdsgram({
    blockId: env.VITE_ADSGRAM_BLOCK_ID,
    onReward,
    onError,
  })

  return (
    <TaskUi
      iconLeft={iconNumberToIcon[0]}
      taskText="Watch Ad"
      rewardAmount={10000}
      buttonType={ButtonTypes.accent}
      onClick={showAd}
    >
      Watch
    </TaskUi>
  )
}
