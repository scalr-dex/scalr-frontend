import Button from 'components/Button'
import Step1 from 'components/Onboarding/Step1'
import { useCallback, useState } from 'preact/hooks'
import { useSetAtom } from 'jotai'
import didOnboardAtom from 'helpers/atoms/UserStates'
import { JSX } from 'preact/jsx-runtime'
import Step2 from 'components/Onboarding/Step2'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Step1Background from 'components/Onboarding/Step1Background'
import Step3 from 'components/Onboarding/Step3'
import Step2Background from 'components/Onboarding/Step2Background'
import Step3Background from 'components/Onboarding/Step3Background'

type StepToElement = { [step: number]: JSX.Element }

const stepToComponent: StepToElement = {
  0: <Step1 />,
  1: <Step2 />,
  2: <Step3 />,
}

const stepToBg: StepToElement = {
  0: <Step1Background />,
  1: <Step2Background />,
  2: <Step3Background />,
}

export default function () {
  const setDidOnboard = useSetAtom(didOnboardAtom)
  const [parent] = useAutoAnimate()
  const [step, setStep] = useState(0)

  const buttonText = step ? 'Wooow. I’m in  🔥🚀' : 'Ok. All clear  🫡'

  const onClick = useCallback(() => {
    if (step === 2) {
      setDidOnboard(true)
      return
    }

    setStep((prev) => prev + 1)
  }, [setDidOnboard, step])

  return (
    <div
      className="flex flex-col items-center justify-between h-screen shadow-onboarding"
      style={{
        background:
          'radial-gradient(ellipse at left, #133D8D60, transparent 50%), radial-gradient(circle at right, #133D8D70, transparent 60%)',
      }}
    >
      <div
        className="relative flex flex-col gap-y-2 items-center justify-center flex-1 w-full"
        ref={parent}
      >
        {stepToBg[step]}
        <img src="img/onboarding-utya.png" width={155} height={155} />
        {stepToComponent[step]}
      </div>
      <Button className="!w-56 !rounded-full mb-2" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}
