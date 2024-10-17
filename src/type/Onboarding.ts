type StepToString = { [step: number]: string }

export const stepToGif: StepToString = {
  0: 'vid/utya-money.gif',
  1: 'vid/utya.gif',
  2: 'vid/utya-pair.gif',
}

const vid = Object.values(stepToGif)
export const preloadList = ['img/onboarding-step3-bg.png', ...vid]
