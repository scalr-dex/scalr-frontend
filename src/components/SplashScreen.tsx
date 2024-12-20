import Logo from 'components/icons/Logo'
import { Header3 } from 'components/Text'
import Gift from 'components/icons/Gift'

export default function () {
  return (
    <div className="h-screen w-screen bg-primary flex flex-col gap-y-4 items-center justify-center text-white">
      <Logo size={90} />

      <Header3 className="text-center">
        <p>
          Play, invite friends,{' '}
          <span className="text-accent-alt">earn points</span>
        </p>
        <p>and discover the next</p>
        <p className="inline-block">
          memecoin <Gift className="inline mr-2" /> gems
        </p>
      </Header3>
    </div>
  )
}
