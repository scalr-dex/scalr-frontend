import safeExtractCharAt from 'helpers/formatters/safeExtractCharAt'
import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { ClassNameProp } from 'type/Props'

const defaultFallback = (name: string) => (
  <span>{safeExtractCharAt(name, 0)}</span>
)

export default function ({
  name,
  imgUrl,
  fallback = defaultFallback,
  className = 'rounded-full bg-controls-tertiary-focus flex items-center justify-center',
  size = 8,
}: {
  name: string
  imgUrl?: string | undefined
  fallback?: (name: string) => JSX.Element
  size?: number
} & ClassNameProp) {
  const [imgLoadError, setImgLoadError] = useState(false)

  const imageStyles = `w-${size} h-${size} ${className}`

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
