import TaskUi from 'components/Tasks/TaskUi'
import env from 'helpers/env'
import useAdsgram from 'helpers/hooks/useAdsgram'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { iconNumberToIcon } from 'type/UserTask'
import { ShowPromiseResult } from 'type/adsgram'

export default function () {
  const onReward = useCallback(() => {
    alert('Reward')
  }, [])
  const onError = useCallback((result: ShowPromiseResult) => {
    alert(JSON.stringify(result, null, 4))
  }, [])

  const showAd = useAdsgram({
    blockId: env.VITE_ADSGRAM_BLOCK_ID,
    onReward,
    onError,
  })

  return (
    <TaskUi
      iconLeft={iconNumberToIcon[0]}
      taskText="Watch an ad for rewards"
      rewardAmount={10000}
      buttonType={ButtonTypes.accent}
      onClick={showAd}
    >
      Watch
    </TaskUi>
  )
}
