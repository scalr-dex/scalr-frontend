import TaskUi from 'components/Tasks/TaskUi'
import env from 'helpers/env'
import { iconNumberToComponent } from 'type/UserTask'

declare global {
  interface Window {
    showAd: (apiKey: string, onSuccess: () => void, onError: () => void) => void
  }
}

window.showAd = window.showAd || {}

export default function () {
  return (
    <TaskUi
      icon={iconNumberToComponent(0)}
      taskText="Watch short video 2"
      rewardAmount={500}
      onClick={() => {
        window.showAd(
          env.VITE_SPOT_AD_KEY,
          () => alert('Success'),
          () => alert('Err')
        )
      }}
    />
  )
}
