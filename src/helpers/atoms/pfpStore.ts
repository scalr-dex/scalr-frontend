import { atomWithStorage } from 'jotai/utils'

export type PfpStoreValue = { color: string; emoji: string; svg: string }

type PfpStore = { [address: string]: PfpStoreValue }

export default atomWithStorage<PfpStore>('pfp-store', {})
