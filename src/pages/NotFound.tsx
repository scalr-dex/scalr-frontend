import { Header1, Header2 } from 'components/Text'
import { useLocation } from 'wouter-preact'

export default function () {
  const [, setLocation] = useLocation()

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Header1 className="text-transparent outlined-text-accent drop-shadow-glow-accent">
        404
      </Header1>
      <Header2>
        <button onClick={() => setLocation('/')} className="underline">
          Go back
        </button>
      </Header2>
    </div>
  )
}
