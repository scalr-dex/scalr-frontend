import {
  isAndroid,
  isBrowser,
  isMacOs,
  isMobileSafari,
  isSafari,
} from 'react-device-detect'

type StepToString = { [step: number]: string }

export const renderWebm =
  (isBrowser && !isSafari && !isMobileSafari && !isMacOs) || isAndroid

export const stepToSafari: StepToString = {
  0: 'vid/utya.gif',
  1: 'vid/utya-pair.gif',
  2: 'vid/utya-money.gif',
}
export const stepToWebm: StepToString = {
  0: 'vid/utya.webm',
  1: 'vid/utya-pair.webm',
  2: 'vid/utya-money.webm',
}

const vid = renderWebm ? Object.values(stepToWebm) : Object.values(stepToSafari)
export const preloadList = ['img/onboardingStep3Background.png', ...vid]
