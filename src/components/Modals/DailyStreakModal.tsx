import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import MotionNumber from '@number-flow/react'
import useTimeToDailyStreak from 'helpers/hooks/useTimeToDailyStreak'

function ModalBody() {
  const user = useAtomValue(UserAtom)

  const loginDays = user?.loginDays || 0

  return (
    <>
      <ImageAnimatedOnLoad src="img/utya-burn.png" forModal />

      <div className="flex flex-col items-center justify-center gap-y-5">
        <MotionNumber
          value={loginDays}
          style={{ fontSize: '3.75rem', color: '#FF9341', fontWeight: 800 }}
        />
        <Header3 className="text-alt-dark">
          day{loginDays === 1 ? '' : 's'} streak!
        </Header3>
        <BodyText className="text-balance text-center px-4">
          Open Scalr each day to earn a streak reward.
        </BodyText>
      </div>
    </>
  )
}

function ModalFooter() {
  const { disabled, onClick, loading, formatted } = useTimeToDailyStreak()

  return (
    <Button
      buttonType={ButtonTypes.secondary}
      onClick={onClick}
      isLoading={loading}
      disabled={disabled}
    >
      {disabled ? formatted : 'Continue'}
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} footer={ModalFooter} />
}
