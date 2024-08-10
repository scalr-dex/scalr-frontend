import { Header1 } from 'components/icons/Text'

export default function () {
  return (
    <div
      style={{
        background:
          'radial-gradient(ellipse at left, #133D8D60, transparent 50%), radial-gradient(circle at right, #133D8D70, transparent 60%)',
      }}
      className="min-h-screen flex flex-col items-center text-center justify-center text-white"
    >
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
