import Button from 'components/Button'
import BattleSearchModal from 'components/Modals/BattleSearchModal'
import PrivateBattleModal from 'components/Modals/PrivateBattleModal'
import { joinLobby } from 'helpers/api/battles'
import handleError from 'helpers/handleError'
import { useState, useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { navigate } from 'wouter-preact/use-hash-location'

export default function ({ betAmount }: { betAmount: number }) {
  const [lobbyId, setLobbyId] = useState('')
  const [publicOpen, setPublicOpen] = useState(false)
  const [privateOpen, setPrivateOpen] = useState(false)

  const openModal = useCallback(() => setPublicOpen(true), [])
  const onStartPublic = useCallback(async () => {
    try {
      const { LobbyID, Status } = await joinLobby(betAmount).json()

      setLobbyId(LobbyID)
      if (Status === 'waiting') openModal()
      if (Status === 'complete') navigate('/battle/chart')
    } catch (e) {
      handleError({
        e,
        toastMessage: 'Failed to start the game 😥 Please try again ',
      })
    }
  }, [betAmount, openModal])

  return (
    <div className="flex flex-row gap-x-3">
      <Button rounded="rounded-full" onClick={onStartPublic}>
        Start public battle
      </Button>
      <Button
        rounded="rounded-full"
        onClick={() => setPrivateOpen(true)}
        buttonType={ButtonTypes.secondary}
      >
        Start private battle
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
