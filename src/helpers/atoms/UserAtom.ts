import { atom } from 'jotai'
import { ClientUser } from 'type/User'

export default atom<ClientUser | null>(null)
