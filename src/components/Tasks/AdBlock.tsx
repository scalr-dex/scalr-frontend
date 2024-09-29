import TaskUi from 'components/Tasks/TaskUi'
import useAdsgram from 'helpers/hooks/useAdsgram'
import ButtonTypes from 'type/Button'
import { iconNumberToIcon } from 'type/UserTask'

export default function () {
  const showAd = useAdsgram({})

  return (
    <TaskUi
      iconLeft={iconNumberToIcon[0]}
      taskText="Watch short video"
      rewardAmount={10000}
      buttonType={ButtonTypes.accent}
      onClick={showAd}
    >
      Play
    </TaskUi>
  )
}
