import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

export const successConfetti = () =>
  jsConfetti.addConfetti({ confettiColors: ['#4374EC'] })

export const sadConfetti = () =>
  jsConfetti.addConfetti({ emojis: ['😓', '😿'] })
