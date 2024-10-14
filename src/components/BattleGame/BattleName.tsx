import DotsLoader from 'components/DotsLoader'
import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import { BodyText, GlowText } from 'components/Text'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'

export default function () {
  const user = useAtomValue(UserAtom)

  return (
    <div className="flex flex-col gap-y-1 items-center">
      <ImgWithComponentFallback
        name={String(user?.telegramId || '?')}
        size={14}
      />
      <BodyText className="text-xs text-white/50">My battle name</BodyText>
      <div className="flex flex-row items-center gap-x-2">
        <GlowText className="max-w-64 truncate">
          {user?.username || <DotsLoader />}
        </GlowText>
      </div>
    </div>
  )
}
