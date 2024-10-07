import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Star from 'components/icons/Star'
import PinField from 'react-pin-field'
import ButtonSmall from 'components/ButtonSmall'
import { readTextFromClipboard } from '@telegram-apps/sdk-react'
import { useCallback, useRef, useState } from 'preact/hooks'
import handleError from 'helpers/handleError'
import { joinPrivateLobby } from 'helpers/api/battles'
import regex from 'helpers/formatters/regex'

type PrivateRoomJoinModalProps = {
  onGoBack: () => void
}

const codeLength = 4

function ModalBody({ onGoBack }: PrivateRoomJoinModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const ref = useRef<HTMLInputElement[]>([])

  const onCodeSubmit = useCallback(async (code: string) => {
    try {
      setLoading(true)
      const data = await joinPrivateLobby(code).json()
      console.log(data)
    } catch (e) {
      handleError({ e })
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const onPaste = useCallback(async () => {
    const text = await readTextFromClipboard()
    if (!text || !ref.current) return

    ref.current.forEach((inputEl, index) =>
      regex.test(text[index]) ? (inputEl.value = text[index]) : null
    )
    const chars = ref.current.map((el) => el.value).join('')
    if (chars.length === codeLength) void onCodeSubmit(chars)
  }, [onCodeSubmit])

  return (
    <>
      <Star className="self-center" />

      <Header3 className="text-center">Join a Private Room</Header3>
      <BodyText className="text-white/50 font-semibold text-center">
        Enter the room code to connect
      </BodyText>
      <div className="flex flex-row gap-x-2 self-center">
        <div className="flex flex-row gap-x-1">
          <PinField
            disabled={loading}
            onChange={() => setError(false)}
            autoFocus
            length={codeLength}
            className="bg-tertiary border border-transparent focus:border-white-16 aria-busy:border-error disabled:opacity-50 uppercase transition-colors rounded-lg w-8 h-10 text-center text-2xl leading-7 font-bold aria-busy:text-error"
            aria-busy={error}
            autoCapitalize="on"
            validate={regex}
            onComplete={onCodeSubmit}
          />
        </div>
        <ButtonSmall
          onClick={onPaste}
          buttonType={ButtonTypes.neutral}
          className="px-5 py-2"
          disabled={loading}
        >
          Paste
        </ButtonSmall>
      </div>
      {error ? (
        <span className="text-error text-center">
          Wrong code or room already filled
        </span>
      ) : null}
      <ButtonSmall
        buttonType={ButtonTypes.secondary}
        className="w-30 px-10 py-4 self-center"
        rounded="rounded-full"
        onClick={onGoBack}
        haptic={false}
        disabled={loading}
      >
        Back
      </ButtonSmall>
    </>
  )
}

export default function (props: DefaultModalProps & PrivateRoomJoinModalProps) {
  return (
    <DefaultModal
      {...props}
      body={() => <ModalBody onGoBack={props.onGoBack} />}
    />
  )
}
