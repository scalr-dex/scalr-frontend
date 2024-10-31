import ButtonSmall from 'components/ButtonSmall'
import Fire from 'components/icons/Fire'
import DailyStreakModal from 'components/Modals/DailyStreakModal'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function ({ small }: { small?: boolean }) {
  const [openModal, setOpenModal] = useState(false)
  const user = useAtomValue(UserAtom)

  return (
    <>
      <ButtonSmall
        iconLeft={<Fire size={24} />}
        buttonType={ButtonTypes.outline}
        className={small ? 'py-2 !min-w-14' : 'py-2 px-4'}
        contentClassName={small ? '!gap-x-0' : ''}
        onClick={() => setOpenModal(true)}
      >
        {user?.loginDays}
      </ButtonSmall>
      <DailyStreakModal showModal={openModal} setShowModal={setOpenModal} />
    </>
  )
}
