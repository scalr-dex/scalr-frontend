import Logo from 'components/icons/Logo'
import X from 'components/icons/socials/X'
import { BodyText, Header2 } from 'components/icons/Text'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import userTasks from 'helpers/api/userTasks'

export default function () {
  const taskList = [{}]

  void userTasks()

  return (
    <div className="flex flex-col justify-between flex-1 px-4">
      <div className="flex flex-col items-center text-center">
        <Logo size={68} className="p-1 rounded-lg bg-secondary" />
        <Header2>Tasks available</Header2>
        <BodyText>
          We’ll reward you immediately with points after each task completion
        </BodyText>
      </div>
      {taskList.map(() => (
        <TaskBlock icon={<X />} text="Follow X" rewardAmount={1000} />
      ))}
      <InviteFriends />
    </div>
  )
}
