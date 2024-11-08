import { Header1, Header2 } from 'components/Text'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Header1 className="text-transparent outlined-text-accent drop-shadow-glow-accent">
        404
      </Header1>
      <Header2>
        <button onClick={() => navigate('/')} className="underline">
          Go to main
        </button>
      </Header2>
    </div>
  )
}
