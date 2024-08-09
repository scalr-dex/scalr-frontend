import Logo from 'components/icons/Logo'
import X from 'components/icons/socials/X'
import { BodyText, Header2 } from 'components/icons/Text'
import TaskBlock from 'components/Tasks/TaskBlock'

export default function () {
  const taskList = [{}]

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <Logo size={68} />
        <Header2>Tasks available</Header2>
        <BodyText>
          We’ll reward you immediately with points after each task completion
        </BodyText>
      </div>
      {taskList.map(() => (
        <TaskBlock icon={<X />} text="Follow X" rewardAmount={1000} />
      ))}
    </>
  )
}
