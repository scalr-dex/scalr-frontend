import Logo from 'components/icons/Logo'
import X from 'components/icons/socials/X'
import { AccentText, Header2 } from 'components/icons/Text'
import InviteFriends from 'components/Tasks/InviteFriends'
import TaskBlock from 'components/Tasks/TaskBlock'
import userTasks from 'helpers/api/userTasks'

export default function () {
  const taskList = [{}]

  console.log(void userTasks())

  return (
    <div className="flex flex-col flex-1 gap-y-5 px-4">
      <div className="flex flex-col gap-y-4 w-full items-center text-center">
        <Logo size={68} className="p-1 rounded-lg bg-secondary" />
        <Header2>Tasks available</Header2>
        <AccentText>
          We’ll reward you immediately with points after each task completion
        </AccentText>
      </div>
      {taskList.map(() => (
        <TaskBlock icon={<X />} text="Follow X" rewardAmount={1000} />
      ))}
      <InviteFriends />
    </div>
  )
}
