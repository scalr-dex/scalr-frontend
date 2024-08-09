import Logo from 'components/icons/Logo'
import { AccentText, Header1, SpecialText } from 'components/icons/Text'
import { SparklesLeft, SparklesRight } from 'components/Onboarding/Sparkles'

export default function () {
  return (
    <div className="max-w-96">
      <Header1 className="text-center">
        <SpecialText
          withShadow
          className="bg-white text-primary !py-0 !rounded-2xl -rotate-6"
        >
          Bet
        </SpecialText>
        for a price movement and earn
        <SpecialText
          withShadow
          className="bg-success-light text-primary mt-2 rotate-3 relative"
          leftIcon={<Logo size={32} className="inline-block mr-1" />}
        >
          <SparklesLeft />
          points
          <SparklesRight />
        </SpecialText>
      </Header1>

      <AccentText className="flex w-full justify-center text-center mt-5">
        Guess correctly to win x2 or lose the half
      </AccentText>
    </div>
  )
}
