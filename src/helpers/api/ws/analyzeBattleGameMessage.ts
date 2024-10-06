import { writeAtom } from 'helpers/atoms/atomStore'
import battleGameAtom, { emptyBattleGame } from 'helpers/atoms/battleGameAtom'
import { BattlesWebsocketEvents } from 'type/Battles'
import { navigate } from 'wouter-preact/use-hash-location'

function processBetsConfirmed(data: BattlesWebsocketEvents) {
  if (!('RoundEndTimeUnix' in data)) return

  writeAtom(battleGameAtom, (prev) => ({
    ...prev,
    roundSeparators: [...prev.roundSeparators, data.RoundEndTimeUnix * 1000],
  }))

  return true
}

function processRoundEnded(data: BattlesWebsocketEvents) {
  if (!('PlayersPoints' in data)) return

  writeAtom(battleGameAtom, (prev) => {
    return {
      ...prev,
      playerPoints: data.PlayersPoints,
    }
  })

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
    writeAtom(battleGameAtom, emptyBattleGame)
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
