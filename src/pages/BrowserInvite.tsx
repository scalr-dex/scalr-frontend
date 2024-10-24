import { Header1 } from 'components/Text'

export default function () {
  return (
    <div className="min-h-screen bg-blue-vignette flex flex-col items-center text-center justify-center text-white">
      <Header1>
        Open{' '}
        <a href="https://t.me/ScalrBot" className="underline">
          ScalrBot in telegram
        </a>{' '}
        to use Scalr DEX bot
      </Header1>
    </div>
  )
}
