import backendKy from 'helpers/api/backendKy'
import { LobbyData } from 'type/Battles'
import BetDirection from 'type/BetDirection'

const battlesApi = backendKy({ prefixUrlAppend: '/battles' })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function joinLobby(_amount: number) {
  //   return battlesApi.get<LobbyData>('lobby', { json: { amount } })
  return battlesApi.get<LobbyData>('lobby')
}

export function quitLobby(lobbyId: string) {
  // TODO: not implemented on the backend
  return battlesApi.post('lobby', { json: { lobbyId } })
}

export function placeBattleBet(json: { direction: BetDirection }) {
  return battlesApi.post('bet', { json })
}
