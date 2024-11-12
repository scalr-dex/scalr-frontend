import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import battleGameAtom, { emptyBattleGame } from 'helpers/atoms/battleGameAtom'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import { BattlesWebsocketEvents } from 'type/Battles'
import { navigate } from 'wouter-preact/use-hash-location'
import clearPreviousBets from 'helpers/chart/clearPreviousBets'
import { GraphTokenData } from 'type/TokenState'
import UserAtom from 'helpers/atoms/UserAtom'

function processBetsConfirmed(data: BattlesWebsocketEvents) {
  if (!('RoundEndsInSeconds' in data)) return

  const nextRoundTime = Date.now() + data.RoundEndsInSeconds * 1000
  writeAtom(battleGameAtom, (prev) => ({
    ...prev,
    roundSeparators: [...prev.roundSeparators, nextRoundTime],
  }))

  // make sure to write into the atom only once
  // include bet in chart data to keep it smooth, we push only latest bet
  writeAtom(priceHistoryAtom, (prev) => {
    const priceHistoryWithBets: GraphTokenData[] = prev
    const last = prev[prev.length - 1]

    for (const [userIndex, { Bets, TelegramID }] of data.Bets.entries()) {
      const direction = Bets[Bets.length - 1]

      priceHistoryWithBets.push({
        name: last.name + '-' + TelegramID,
        value: last.value,
        battleBet: {
          userId: TelegramID,
          direction: Number(direction),
          userIndex,
        },
      })
    }

    return priceHistoryWithBets
  })

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

  const betSize = readAtom(battleGameAtom).betSize
  writeAtom(battleGameAtom, emptyBattleGame)
  clearPreviousBets()

  navigate('/battle/lobby', {
    state: { amount: data.Winnings, id: data.WinnerTelegramID, betSize },
  })

  return true
}

function processBattleStart(data: BattlesWebsocketEvents) {
  if (!('GameStartsInSeconds' in data)) return

  clearPreviousBets()
  const user = readAtom(UserAtom)

  // lobbyId is written before
  writeAtom(battleGameAtom, (prev) => ({
    lobbyId: prev.lobbyId,
    playerScore: [],
    roundSeparators: [],
    users: [
      { battleName: String(user?.telegramId || 'none') },
      { battleName: data.BattleName },
    ],
    gameStartTime: data.GameStartsInSeconds,
    betSize: data.BetSize,
  }))
  navigate('/battle/versus')

  return true
}

export default function (parsed: BattlesWebsocketEvents) {
  if (Array.isArray(parsed)) return

  if (processRoundEnded(parsed)) return true
  if (processBetsConfirmed(parsed)) return true
  if (processBattleStart(parsed)) return true
  if (processBattleEnd(parsed)) return true
}
