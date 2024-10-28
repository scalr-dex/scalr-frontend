import AdBlock from 'components/Tasks/DailyTasks/AdBlock'
import TaskSection from 'components/Tasks/TaskSection'
import ScalrInName from 'components/Tasks/DailyTasks/ScalrInName'
import PointsDailyClaim from 'components/Tasks/DailyTasks/PointsDailyClaim'

export default function () {
  return (
    <TaskSection headerText="Daily tasks">
      <AdBlock />
      <PointsDailyClaim />
      <ScalrInName />
    </TaskSection>
  )
}
