import jsConfettiAtom from 'helpers/atoms/jsConfettiAtom'
import { readAtom } from 'helpers/atoms/atomStore'

export const successConfetti = () =>
  readAtom(jsConfettiAtom).addConfetti({ confettiColors: ['#4374EC'] })

export const sadConfetti = () =>
  readAtom(jsConfettiAtom).addConfetti({ emojis: ['😓', '📉', '🥀'] })
