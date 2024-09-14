import AlphaVideo from 'components/AlphaVideo'
import { stepToSafari, stepToWebm } from 'type/Onboarding'

export default function ({ step }: { step: number }) {
  return (
    <AlphaVideo
      srcSafari={stepToSafari[step]}
      src={stepToWebm[step]}
      width={155}
      height={155}
      key={'onboarding-vid-' + step}
    />
  )
}
