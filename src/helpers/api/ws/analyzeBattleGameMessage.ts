import { writeAtom } from 'helpers/atoms/atomStore'
import battleGameAtom from 'helpers/atoms/battleGameAtom'
import { BattleGameState, BattlesWebsocketEvents } from 'type/Battles'
import { navigate } from 'wouter-preact/use-hash-location'

function processBetsConfirmed(data: BattlesWebsocketEvents) {
  if (!('RoundEndTimeUnix' in data)) return

  //   writeAtom(battleGameAtom, (prev) => ({}))

  return true
}

function processRoundEnded(data: BattlesWebsocketEvents) {
  if (!('PlayersPoints' in data)) return

  //   writeAtom(battleGameAtom, (prev) => {
  //     const currentScore =
  //       data.PlayersPoints.find(
  //         ({ TelegramID }) => prev.currentUser?.telegram_id === TelegramID
  //       )?.Points ||
  //       prev.currentUser?.score ||
  //       0
  //     const player2score =
  //       data.PlayersPoints.find(
  //         ({ TelegramID }) => prev.player2?.telegram_id === TelegramID
  //       )?.Points ||
  //       prev.player2?.score ||
  //       0

  //     return {
  //       ...prev,
  //       roundSeparators: [...prev.roundSeparators, Date.now()],
  //       currentUser: {
  //         ...prev.currentUser,
  //         score: currentScore,
  //       },
  //       player2: { ...prev.player2, score: player2score },
  //     }
  //   })

  return true
}

function processBattleEnd(data: BattlesWebsocketEvents) {
  if (!('WinnerTelegramID' in data)) return

  writeAtom(battleGameAtom, (prev) => ({
    ...prev,
    winner: { amount: data.Winnings, id: data.WinnerTelegramID },
  }))

  setTimeout(() => {
    navigate('/battle/lobby')
    writeAtom(battleGameAtom, {} as BattleGameState)
  }, 2000)

  return true
}

function processBattleStart(data: BattlesWebsocketEvents) {
  if (!('GameStartTimeUnix' in data)) return

  writeAtom(battleGameAtom, (prev) => ({
    ...prev,
    gameStartTime: data.GameStartTimeUnix,
    betSize: data.BetSize,
  }))
  navigate('/battle/chart')

  return true
}

export default function (parsed: BattlesWebsocketEvents) {
  if (Array.isArray(parsed)) return

  if (processRoundEnded(parsed)) return true
  if (processBetsConfirmed(parsed)) return true
  if (processBattleStart(parsed)) return true
  if (processBattleEnd(parsed)) return true
}
