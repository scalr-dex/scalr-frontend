import { useUtils } from '@telegram-apps/sdk-react'
import Button from 'components/Button'
import Close from 'components/icons/Close'
import Copy from 'components/icons/Copy'
import Logo from 'components/icons/Logo'
import Share from 'components/icons/Share'
import { AccentText, Header3, SpecialText } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'

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
          10,500
        </SpecialText>{' '}
        for each friend with Premium.
      </p>
    </AccentText>
  )
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="rounded-full bg-tertiary h-14 w-14 text-center leading-tight flex justify-center items-center">
        <Header3>🥳</Header3>
      </div>
      <Close onClick={onClose} />
    </div>
  )
}

function ModalFooter() {
  const user = useAtomValue(UserAtom)
  const utils = useUtils()
  const [copied, setCopied] = useState(false)

  const userId = user?.launchParams.initData?.user?.id

  const onShare = useCallback(() => {
    if (!userId) return

    utils.shareURL(
      `${env.VITE_APP_BASE_LINK}?startapp=${userId}`,
      '\nPlay with me, predict price movement, and get a token Airdrop!\n😋 +1k Points as a Daily claim gift\n🔥 +1k Points for a friend\n⭐️ +25k Points if a friend has Telegram Premium'
    )
  }, [userId, utils])

  const onCopy = useCallback(async () => {
    if (!userId) return

    await navigator.clipboard.writeText(
      `${env.VITE_APP_BASE_LINK}?startapp=${userId}`
    )

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [userId])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={onShare}
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        iconRight={<Share />}
        isLoading={!userId}
      >
        Send link
      </Button>
      <Button
        onClick={onCopy}
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        iconRight={copied ? <span>🎉</span> : <Copy />}
      >
        {copied ? 'Copied' : 'Copy link'}
      </Button>
    </div>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      header={(onClose) => <ModalHeader onClose={onClose} />}
      body={ModalBody}
      footer={ModalFooter}
    />
  )
}
