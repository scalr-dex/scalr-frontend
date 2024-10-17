import Gift from 'components/icons/Gift'
import { Header1 } from 'components/Text'

export default function () {
  return (
    <div className="max-w-96 mt-8">
      <Header1 className="text-center">
        <p>Earn points and</p>
        <p>participate in a massive</p>
        <p>
          <span className="inline-block mr-2 text-accent">
            <Gift className="inline mr-2" />
            airdrop
          </span>
          for
        </p>
        <p className="appearance-none text-center">Scalr DEX users</p>
      </Header1>
    </div>
  )
}
