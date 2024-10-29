import AdBlock from 'components/Tasks/DailyTasks/AdBlock'
import TaskSection from 'components/Tasks/TaskSection'
import ScalrInName from 'components/Tasks/DailyTasks/ScalrInName'

export default function () {
  return (
    <TaskSection headerText="Daily tasks">
      <AdBlock />
      <ScalrInName />
    </TaskSection>
  )
}
