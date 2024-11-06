import TaskUi from 'components/Tasks/TaskUi'
import { iconNumberToComponent } from 'type/UserTask'

declare global {
  interface Window {
    showAd: () => void
  }
}

window.showAd = window.showAd || {}

export default function () {
  return (
    <TaskUi
      icon={iconNumberToComponent(0)}
      taskText="Watch short video 2"
      rewardAmount={500}
      onClick={() => window.showAd?.()}
    />
  )
}
