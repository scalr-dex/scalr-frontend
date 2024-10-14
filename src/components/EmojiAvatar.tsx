import emojiAvatarForAddress from 'helpers/emojiAvatarForString'
import { ClassNameProp } from 'type/Props'

export default function ({
  str,
  className = 'rounded-full',
}: { str: string | undefined } & ClassNameProp) {
  const { color, emoji } = emojiAvatarForAddress(str)

  return (
    <div
      style={{ backgroundColor: color }}
      className={`flex items-center justify-center h-full w-full container ${className}`}
    >
      <span className="drop-shadow-sm">{emoji}</span>
    </div>
  )
}
