import Button from 'components/Button'
import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useCallback, useState } from 'preact/hooks'
import handleError from 'helpers/handleError'
import { BetAmountProp } from 'type/Battles'
import { createPrivateLobby } from 'helpers/api/battles'
import { useSetAtom } from 'jotai/react'
import { battlePrivateLobbyAtom } from 'helpers/atoms/battleGameAtom'

type PrivateBattleModalProps = BetAmountProp & {
  onJoinRoom: () => void
  onCreateLobby: () => void
}

function ModalBody() {
  return (
    <>
      <img src="img/utya-burn.png" className="w-36 mx-auto" />
      <Header3>Create or Join private room</Header3>
      <p>Rewards in private room will be more countable in airdrop</p>
      <p className="text-white/50">
        Claimed amounts count toward the $SCR airdrop distribution 👀
      </p>
    </>
  )
}

function ModalFooter({
  onJoinRoom,
  onCreateLobby,
  betAmount,
}: {
  onClose: () => void
} & PrivateBattleModalProps) {
  const setPrivateLobbyData = useSetAtom(battlePrivateLobbyAtom)
  const [loading, setLoading] = useState(false)

  const onCreate = useCallback(async () => {
    try {
      setLoading(true)
      const data = await createPrivateLobby(betAmount).json()

      setPrivateLobbyData({ ...data, betAmount })
      onCreateLobby()
    } catch (e) {
      handleError({
        e,
        toastMessage: 'Failed to create a lobby, please try again 😥',
      })
    } finally {
      setLoading(false)
    }
  }, [betAmount, onCreateLobby, setPrivateLobbyData])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={onCreate}
        haptic={false}
        isLoading={loading}
      >
        Create room
      </Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!rounded-full"
        onClick={onJoinRoom}
        haptic={false}
        disabled={loading}
      >
        Join room
      </Button>
    </div>
  )
}

export default function (props: DefaultModalProps & PrivateBattleModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => (
        <ModalFooter
          onClose={onClose}
          onCreateLobby={props.onCreateLobby}
          onJoinRoom={props.onJoinRoom}
          betAmount={props.betAmount}
        />
      )}
    />
  )
}
