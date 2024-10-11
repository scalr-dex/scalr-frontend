import Button from 'components/Button'
import Close from 'components/icons/Close'
import Logo from 'components/icons/Logo'
import Share from 'components/icons/Share'
import { AccentText, BodyText, Header3, SpecialText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import { useAtomValue } from 'jotai'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { shareURL } from '@telegram-apps/sdk-react'
import CopyButton from 'components/CopyButton'

function ModalBody() {
  return (
    <AccentText className="mb-2">
      <p>
        Earn{' '}
        <SpecialText
          leftIcon={<Logo size={18} />}
          className="bg-tertiary !py-1 !px-1.5 !mx-1 -rotate-3"
        >
          1,500
        </SpecialText>{' '}
        for each friend
      </p>
      <br />
      <p>
        or{' '}
        <SpecialText
          leftIcon={<Logo size={18} />}
          className="bg-special-gradient !py-0.5 !px-1.5 !mx-1 rotate-2"
        >
          3,000
        </SpecialText>{' '}
        for each friend with Premium.
      </p>
    </AccentText>
  )
}

function ModalHeader({
  onClose,
  inviteLimit,
  invitedUsers,
}: {
  onClose: () => void
  inviteLimit: number
  invitedUsers: number
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-x-2 items-center">
        <div className="rounded-full bg-tertiary h-14 w-14 text-center leading-tight flex justify-center items-center">
          <Header3>🥳</Header3>
        </div>
        <BodyText className="text-controls-tertiary-focus font-semibold">
          {invitedUsers}/{inviteLimit} invited
        </BodyText>
      </div>
      <Close onClick={onClose} />
    </div>
  )
}

function ModalFooter({ telegramId }: { telegramId: number }) {
  const onShare = useCallback(() => {
    shareURL(
      `${env.VITE_APP_BASE_LINK}?startapp=${telegramId}`,
      '\nPlay with me, predict price movement, and get a token Airdrop!\n😋 +1k Points as a Daily claim gift\n🔥 +1k Points for a friend\n⭐️ +25k Points if a friend has Telegram Premium'
    )
  }, [telegramId])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={onShare}
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        iconRight={<Share />}
        isLoading={!telegramId}
      >
        Send link
      </Button>

      <CopyButton
        textToCopy={`${env.VITE_APP_BASE_LINK}?startapp=${telegramId}`}
      />
    </div>
  )
}

export default function (props: DefaultModalProps) {
  const user = useAtomValue(UserAtom)

  if (!user) return null

  const { inviteLimit, invitedUsers, telegramId } = user

  return (
    <DefaultModal
      {...props}
      header={(onClose) => (
        <ModalHeader
          onClose={onClose}
          inviteLimit={inviteLimit}
          invitedUsers={invitedUsers}
        />
      )}
      body={ModalBody}
      footer={() => <ModalFooter telegramId={telegramId} />}
    />
  )
}
