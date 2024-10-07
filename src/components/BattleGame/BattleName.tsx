import DotsLoader from 'components/DotsLoader'
import Dices from 'components/icons/Dices'
import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import { BodyText, GlowText } from 'components/Text'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import { useCallback } from 'preact/hooks'

export default function () {
  const user = useAtomValue(UserAtom)

  const onShuffleName = useCallback(() => {
    console.log('shuffle')
  }, [])

  return (
    <div className="flex flex-col gap-y-1 items-center">
      <ImgWithComponentFallback
        imgUrl={''}
        name={user?.username || '?'}
        size={14}
      />
      <BodyText className="text-xs text-white/50">My battle name</BodyText>
      <div className="flex flex-row items-center gap-x-2">
        <GlowText className="max-w-64 truncate">
          {user?.username || <DotsLoader />}
        </GlowText>
        <Dices
          className="transition-all hover:cursor-pointer hover:scale-105 active:text-accent-dark h-6 w-6"
          onClick={onShuffleName}
        />
      </div>
    </div>
  )
}
