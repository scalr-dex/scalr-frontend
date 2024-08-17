import Gift from 'components/icons/Gift'
import { Header1, SpecialText } from 'components/icons/Text'

export default function () {
  return (
    <div className="max-w-96">
      <Header1 className="text-center">
        Join perp DEX waitlist with
        <SpecialText
          withShadow
          className="bg-special-gradient !py-0 -rotate-1"
          leftIcon={<Gift className="inline-block mr-1" />}
        >
          presents
        </SpecialText>
        for
        <p className="appearance-none text-center">first comers</p>
      </Header1>
    </div>
  )
}
