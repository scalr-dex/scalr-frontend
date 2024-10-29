import KeywordInNameModal from 'components/Modals/KeywordInNameModal'
import TaskUi from 'components/Tasks/TaskUi'
import { nameKeyword } from 'helpers/atoms/UserStates'
import { useState } from 'preact/hooks'
import { iconNumberToComponent } from 'type/UserTask'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <TaskUi
        icon={iconNumberToComponent(-2)}
        taskText={`${nameKeyword} in name`}
        rewardAmount={500}
        onClick={() => setModalOpen(true)}
      />
      <KeywordInNameModal showModal={modalOpen} setShowModal={setModalOpen} />
    </>
  )
}