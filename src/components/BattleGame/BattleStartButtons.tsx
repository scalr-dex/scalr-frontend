import Button from 'components/Button'
import BattleResultModal from 'components/Modals/BattleResultModal'
import BattleSearchModal from 'components/Modals/BattleSearchModal'
import PrivateBattleModal from 'components/Modals/PrivateBattleModal'
import PrivateRoomJoinModal from 'components/Modals/PrivateRoomJoinModal'
import PrivateRoomReadyModal from 'components/Modals/PrivateRoomReadyModal'
import { joinLobby } from 'helpers/api/battles'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import handleError from 'helpers/handleError'
import { useSetAtom } from 'jotai'
import { useState, useCallback } from 'preact/hooks'
import { BetAmountProp } from 'type/Battles'
import ButtonTypes from 'type/Button'
import { useHistoryState } from 'wouter-preact/use-browser-location'

export default function ({ betAmount }: BetAmountProp) {
  const setBattleGameState = useSetAtom(battleGameAtom)
  const [publicOpen, setPublicOpen] = useState(false)
  const [privateOpen, setPrivateOpen] = useState(false)
  const [joinRoomOpen, setJoinRoomOpen] = useState(false)
  const [privateReadyOpen, setPrivateReadyOpen] = useState(false)
  const historyState =
    useHistoryState<{
      amount?: number
      id?: number
    }>() || {}
  const [showBattleResult, setShowBattleResult] = useState(!!historyState.id)

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
    requestAnimationFrame(() => setJoinRoomOpen(true))
  }, [])

  const onCreateLobby = useCallback(() => {
    setPrivateOpen(false)
    requestAnimationFrame(() => setPrivateReadyOpen(true))
  }, [])

  const onGoBack = useCallback(() => {
    setJoinRoomOpen(false)
    requestAnimationFrame(() => setPrivateOpen(true))
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
        onCreateLobby={onCreateLobby}
        onJoinRoom={onJoinRoom}
      />
      <PrivateRoomJoinModal
        showModal={joinRoomOpen}
        setShowModal={setJoinRoomOpen}
        onGoBack={onGoBack}
      />
      <PrivateRoomReadyModal
        showModal={privateReadyOpen}
        setShowModal={setPrivateReadyOpen}
      />

      <BattleResultModal
        onPlayAgain={onStartPublic}
        amount={historyState.amount || 0}
        winnerId={historyState.id || 0}
        showModal={showBattleResult}
        setShowModal={setShowBattleResult}
      />

      <BattleSearchModal
        amount={betAmount}
        showModal={publicOpen}
        setShowModal={setPublicOpen}
      />
    </div>
  )
}
