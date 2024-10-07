import Button from 'components/Button'
import BattleSearchModal from 'components/Modals/BattleSearchModal'
import PrivateBattleModal from 'components/Modals/PrivateBattleModal'
import PrivateRoomJoinModal from 'components/Modals/PrivateRoomJoinModal'
import { joinLobby } from 'helpers/api/battles'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import handleError from 'helpers/handleError'
import { useSetAtom } from 'jotai'
import { useState, useCallback } from 'preact/hooks'
import { BetAmountProp } from 'type/Battles'
import ButtonTypes from 'type/Button'

export default function ({ betAmount }: BetAmountProp) {
  const setBattleGameState = useSetAtom(battleGameAtom)
  const [publicOpen, setPublicOpen] = useState(false)
  const [privateOpen, setPrivateOpen] = useState(false)
  const [joinRoomOpen, setJoinRoomOpen] = useState(false)

  const openPublicModal = useCallback(() => setPublicOpen(true), [])
  const onStartPublic = useCallback(async () => {
    try {
      const { LobbyID, Status } = await joinLobby(betAmount).json()

      setBattleGameState((prev) => ({ ...prev, lobbyId: LobbyID }))
      if (Status === 'waiting') openPublicModal()
    } catch (e) {
      handleError({
        e,
        toastMessage: 'Failed to start the game 😥 Please try again ',
      })
    }
  }, [betAmount, openPublicModal, setBattleGameState])

  const onJoinRoom = useCallback(() => {
    setPrivateOpen(false)
    setTimeout(() => setJoinRoomOpen(true), 150)
  }, [])

  const onGoBack = useCallback(() => {
    setJoinRoomOpen(false)
    setTimeout(() => setPrivateOpen(true), 150)
  }, [])

  return (
    <div className="flex flex-row gap-x-3">
      <Button rounded="rounded-full" onClick={onStartPublic}>
        Public battle
      </Button>
      <Button
        rounded="rounded-full"
        onClick={() => setPrivateOpen(true)}
        buttonType={ButtonTypes.secondary}
      >
        Private battle
      </Button>

      <PrivateBattleModal
        showModal={privateOpen}
        setShowModal={setPrivateOpen}
        betAmount={betAmount}
        onJoinRoom={onJoinRoom}
      />
      <PrivateRoomJoinModal
        showModal={joinRoomOpen}
        setShowModal={setJoinRoomOpen}
        onGoBack={onGoBack}
      />

      <BattleSearchModal showModal={publicOpen} setShowModal={setPublicOpen} />
    </div>
  )
}
