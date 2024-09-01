import AlphaVideo from 'components/AlphaVideo'

type StepToString = { [step: number]: string }

const stepToSafari: StepToString = {
  0: 'vid/utya.gif',
  1: 'vid/utya-pair.gif',
  2: 'vid/utya-money.gif',
}
const stepToWebm: StepToString = {
  0: 'vid/utya.webm',
  1: 'vid/utya-pair.webm',
  2: 'vid/utya-money.webm',
}
const stepToPoster: StepToString = {
  0: 'img/utya.png',
  1: 'img/utya-pair.png',
  2: 'img/utya-money.png',
}

export default function ({ step }: { step: number }) {
  return (
    <AlphaVideo
      srcSafari={stepToSafari[step]}
      src={stepToWebm[step]}
      poster={stepToPoster[step]}
      width={155}
      height={155}
      key={'onboarding-vid-' + step}
    />
  )
}
