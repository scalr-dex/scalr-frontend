import AdBlock from 'components/Tasks/DailyTasks/AdBlock'
import TaskSection from 'components/Tasks/TaskSection'
import ScalrInName from 'components/Tasks/DailyTasks/ScalrInName'
import AdBlock2 from 'components/Tasks/DailyTasks/AdBlock2'

export default function () {
  return (
    <TaskSection headerText="Daily tasks">
      <AdBlock />
      <AdBlock2 />
      <ScalrInName />
    </TaskSection>
  )
}
