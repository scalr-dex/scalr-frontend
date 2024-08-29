import AlphaVideo from 'components/AlphaVideo'

type StepToString = { [step: number]: string }

const stepToHevc: StepToString = {
  0: 'vid/utya-hevc.mp4',
  1: 'vid/utya-pair-hevc.mp4',
  2: 'vid/utya-money-hevc.mp4',
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
      srcHevc={stepToHevc[step]}
      src={stepToWebm[step]}
      poster={stepToPoster[step]}
      width={155}
      height={155}
    />
  )
}
