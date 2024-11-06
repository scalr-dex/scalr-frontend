import KeywordInNameModal from 'components/Modals/KeywordInNameModal'
import TaskUi from 'components/Tasks/TaskUi'
import { nameKeyword } from 'helpers/atoms/UserStates'
import { useState } from 'react'
import { iconNumberToComponent } from 'type/UserTask'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <TaskUi
        icon={iconNumberToComponent(-2)}
        taskText={`${nameKeyword} in name`}
        rewardAmount={2000}
        onClick={() => setModalOpen(true)}
      />
      <KeywordInNameModal showModal={modalOpen} setShowModal={setModalOpen} />
    </>
  )
}
