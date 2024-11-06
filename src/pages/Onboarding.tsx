import Button from 'components/Button'
import Step1 from 'components/Onboarding/Step1'
import { useCallback, useState } from 'react'
import { useSetAtom } from 'jotai'
import didOnboardAtom from 'helpers/atoms/UserStates'
import Step2 from 'components/Onboarding/Step2'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Step3 from 'components/Onboarding/Step3'
import Step1Background from 'components/Onboarding/Step1Background'
import Step2Background from 'components/Onboarding/Step2Background'
import Step3Background from 'components/Onboarding/Step3Background'
import useImagePreloader from 'helpers/hooks/useImagePreload'
import { preloadList, stepToGif } from 'type/Onboarding'
import LoaderFullPage from 'components/LoaderFullPage'

type StepToElement = { [step: number]: JSX.Element | string }
type StepToString = { [step: number]: string }

const stepToComponent: StepToElement = {
  0: <Step3 />,
  1: <Step1 />,
  2: <Step2 />,
}

const stepToText: StepToString = {
  0: 'Wooow 🔥 I’m in  🚀',
  1: 'Cool 😎',
  2: 'Ok. All clear  🫡',
}

const stepToBg: StepToElement = {
  0: <Step3Background />,
  1: <Step1Background />,
  2: <Step2Background />,
}

export default function () {
  const { imagesPreloaded } = useImagePreloader(preloadList)
  const setDidOnboard = useSetAtom(didOnboardAtom)
  const [parent] = useAutoAnimate()
  const [step, setStep] = useState(0)

  const onClick = useCallback(() => {
    if (step === 2) {
      setDidOnboard(true)
      return
    }

    setStep((prev) => prev + 1)
  }, [setDidOnboard, step])

  if (!imagesPreloaded) return <LoaderFullPage />

  return (
    <div className="flex flex-col items-center justify-between pb-safe-bottom h-full shadow-onboarding bg-blue-vignette">
      <>
        <div
          className="relative flex flex-col gap-y-2 items-center justify-center flex-1 w-full"
          ref={parent}
        >
          {stepToBg[step]}
          <img
            style={{ width: 155, height: 155 }}
            src={stepToGif[step]}
            key={'step-img-' + step}
          />
          {stepToComponent[step]}
        </div>
        <Button className="!w-56 !rounded-full mb-2" onClick={onClick}>
          {stepToText[step]}
        </Button>
      </>
    </div>
  )
}
