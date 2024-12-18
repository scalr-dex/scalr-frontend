import StarOnboarding from 'components/icons/StarOnboarding'
import { Header1 } from 'components/Text'

export default function () {
  return (
    <div className="max-w-96 mt-8">
      <Header1 className="text-center">
        <p>Discover the next</p>
        <p>
          <span className="inline-block mr-2 text-accent">
            <StarOnboarding className="inline mr-2" />
            gem
          </span>
          memecoins
        </p>
        <p className="appearance-none text-center">with Scalr</p>
      </Header1>
    </div>
  )
}
