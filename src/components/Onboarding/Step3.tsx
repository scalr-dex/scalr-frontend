import Gift from 'components/icons/Gift'
import { Header1 } from 'components/Text'

export default function () {
  return (
    <div className="max-w-96 mt-8">
      <Header1 className="text-center">
        Join perp DEX waitlist with
        <p>
          <span className="inline-block mr-2 text-accent">
            <Gift className="inline mr-2" />
            presents
          </span>
          for
        </p>
        <p className="appearance-none text-center">first comers</p>
      </Header1>
    </div>
  )
}
