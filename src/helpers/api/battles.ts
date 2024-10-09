import backendKy from 'helpers/api/backendKy'
import { LobbyData } from 'type/Battles'
import BetDirection from 'type/BetDirection'

const battlesApi = backendKy({ prefixUrlAppend: '/battles' })

export function joinLobby(match_bet: number) {
  return battlesApi.post<LobbyData>('lobby', { json: { match_bet } })
}

export function quitLobby() {
  return battlesApi.get('leave')
}

export function placeBattleBet(json: {
  direction: BetDirection
  lobbyId: string
}) {
  return battlesApi.post('bet', { json })
}

export function createPrivateLobby(match_bet: number) {
  return battlesApi.post<{ code: string; expire_time: number }>(
    'lobby/create',
    { json: { match_bet } }
  )
}

export function joinPrivateLobby(code: string) {
  return battlesApi.post('lobby/join', { json: { code } })
}
