import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { ClassNameProp } from 'type/Props'
import EmojiAvatar from 'components/EmojiAvatar'

const defaultFallback = (name: string) => <EmojiAvatar str={name} />

export default function ({
  name,
  imgUrl,
  fallback = defaultFallback,
  className = '',
  size = 8,
}: {
  name: string
  imgUrl?: string | undefined
  fallback?: (name: string) => JSX.Element
  size?: number
} & ClassNameProp) {
  const [imgLoadError, setImgLoadError] = useState(false)

  const imageStyles = `w-${size} h-${size} rounded-full bg-controls-tertiary-focus flex items-center justify-center ${className}`

  if (!imgUrl || imgLoadError)
    return <div className={imageStyles}>{fallback(name)}</div>

  return (
    <div className={`relative ${imageStyles} `}>
      <img
        src={imgUrl}
        className={`absolute z-10 my-0 ${imageStyles}`}
        onError={() => {
          setImgLoadError(true)
        }}
        loading="lazy"
      />
      <div className={`absolute z-0 ${imageStyles}`}>{fallback(name)}</div>
    </div>
  )
}
