import Button from 'components/Button'
import BattleSearchModal from 'components/Modals/BattleSearchModal'
import PrivateBattleModal from 'components/Modals/PrivateBattleModal'
import { joinLobby } from 'helpers/api/battles'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import handleError from 'helpers/handleError'
import { useSetAtom } from 'jotai'
import { useState, useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function ({ betAmount }: { betAmount: number }) {
  const setBattleGameState = useSetAtom(battleGameAtom)
  const [lobbyId, setLobbyId] = useState('')
  const [publicOpen, setPublicOpen] = useState(false)
  const [privateOpen, setPrivateOpen] = useState(false)

  const openModal = useCallback(() => setPublicOpen(true), [])
  const onStartPublic = useCallback(async () => {
    try {
      const { LobbyID, Status } = await joinLobby(betAmount).json()

      setLobbyId(LobbyID)
      setBattleGameState((prev) => ({ ...prev, lobbyId: LobbyID }))
      if (Status === 'waiting') openModal()
    } catch (e) {
      handleError({
        e,
        toastMessage: 'Failed to start the game 😥 Please try again ',
      })
    }
  }, [betAmount, openModal, setBattleGameState])

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
      />

      <BattleSearchModal
        showModal={publicOpen}
        setShowModal={setPublicOpen}
        lobbyId={lobbyId}
      />
    </div>
  )
}
