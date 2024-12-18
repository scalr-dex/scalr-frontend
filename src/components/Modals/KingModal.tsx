import Button from 'components/Button'
import { Header3, BodyText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import Input from 'components/Input'
import { useCallback, useState } from 'react'
import handleError from 'helpers/handleError'
import { updateKingMessage } from 'helpers/api/leaderBoard'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { kingMessageAtom } from 'helpers/atoms/UserStates'
import { isIOS } from 'react-device-detect'

function ModalBody() {
  return (
    <div className="text-center">
      <ImageAnimatedOnLoad src="img/utya-king.png" className="h-60 mx-auto" />
      <Header3>Now you’re a king!</Header3>
      <BodyText>Broadcast your message to all.</BodyText>
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const setKingMessage = useSetAtom(kingMessageAtom)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')

  const updateMessage = useCallback(async () => {
    try {
      setLoading(true)
      await updateKingMessage(value)
      setKingMessage(value)
      toast.success('Your message has been updated.')
      onClose()
    } catch (e) {
      handleError({
        e,
        toastMessage: 'Failed to update the message.',
      })
    } finally {
      setLoading(false)
    }
  }, [onClose, setKingMessage, value])

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Say something to your followers"
        minLength={1}
        maxLength={20}
        disabled={loading}
      />
      <Button
        buttonType={ButtonTypes.secondary}
        onClick={updateMessage}
        isLoading={loading}
      >
        Publish
      </Button>
      <Button buttonType={ButtonTypes.neutral} onClick={onClose} haptic={false}>
        Cancel
      </Button>
    </div>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => <ModalFooter onClose={onClose} />}
      repositionInputs={isIOS}
    />
  )
}
