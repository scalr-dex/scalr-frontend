import { getDefaultStore } from 'jotai/vanilla'

const store = getDefaultStore()

const writeAtom = store.set
const readAtom = store.get
const subscribeAtom = store.sub

export { readAtom, subscribeAtom, writeAtom }
