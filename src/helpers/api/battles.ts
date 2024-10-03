import backendKy from 'helpers/api/backendKy'
import { LobbyData } from 'type/Battles'
import BetDirection from 'type/BetDirection'

const battlesApi = backendKy({ prefixUrlAppend: '/battles' })

export function joinLobby() {
  return battlesApi.get<LobbyData>('lobby')
}

export function quitLobby(lobbyId: string) {
  // TODO: not implemented on the backend
  return battlesApi.post('lobby', { json: { lobbyId } })
}

export function placeBattleBet(json: { direction: BetDirection }) {
  return battlesApi.post('bet', { json })
}
