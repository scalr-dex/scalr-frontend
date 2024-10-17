import { getDefaultStore } from 'jotai/vanilla'

export const storeVersion = '0.0.1'

const store = getDefaultStore()

const writeAtom = store.set
const readAtom = store.get
const subscribeAtom = store.sub

export { readAtom, subscribeAtom, writeAtom }
