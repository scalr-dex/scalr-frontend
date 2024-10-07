import { writeAtom } from 'helpers/atoms/atomStore'
import battleGameAtom, { emptyBattleGame } from 'helpers/atoms/battleGameAtom'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import { BattlesWebsocketEvents } from 'type/Battles'
import { navigate } from 'wouter-preact/use-hash-location'
import getBetPoint from 'helpers/chart/getBetPoint'
import clearPreviousBets from 'helpers/chart/clearPreviousBets'

function processBetsConfirmed(data: BattlesWebsocketEvents) {
  if (!('RoundEndTimeUnix' in data)) return

  writeAtom(battleGameAtom, (prev) => ({
    ...prev,
    roundSeparators: [...prev.roundSeparators, data.RoundEndTimeUnix * 1000],
  }))

  for (const { Bets } of data.Bets) {
    const latest = Bets[Bets.length]
    // include bet in chart data to keep it smooth
    writeAtom(priceHistoryAtom, (prev) => getBetPoint(prev, latest))
  }

  return true
}

function processRoundEnded(data: BattlesWebsocketEvents) {
  if (!('PlayersPoints' in data)) return

  writeAtom(battleGameAtom, (prev) => ({
    ...prev,
    playerScore: data.PlayersPoints,
  }))

  return true
}

function processBattleEnd(data: BattlesWebsocketEvents) {
  if (!('WinnerTelegramID' in data)) return

  writeAtom(battleGameAtom, emptyBattleGame)

  clearPreviousBets()

  navigate('/battle/lobby', {
    state: { amount: data.Winnings, id: data.WinnerTelegramID },
  })

  return true
}

function processBattleStart(data: BattlesWebsocketEvents) {
  if (!('GameStartTimeUnix' in data)) return

  clearPreviousBets()
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
