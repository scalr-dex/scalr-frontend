import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import PlayerNameCapsule from 'components/BattleGame/PlayerNameCapsule'

export default function ({ player }: { player: string }) {
  return (
    <div className="relative">
      <ImgWithComponentFallback size={28} name={player} className="z-0" />
      <PlayerNameCapsule name={player} />
    </div>
  )
}
