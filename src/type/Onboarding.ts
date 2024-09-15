type StepToString = { [step: number]: string }

export const stepToGif: StepToString = {
  0: 'vid/utya.gif',
  1: 'vid/utya-pair.gif',
  2: 'vid/utya-money.gif',
}

const vid = Object.values(stepToGif)
export const preloadList = ['img/onboardingStep3Background.png', ...vid]
