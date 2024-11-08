import safeExtractCharAt from 'helpers/formatters/safeExtractCharAt'
import { ReactNode, useState } from 'react'
import { ClassNameProp } from 'type/Props'

const defaultFallback = (name: string) => (
  <span>{safeExtractCharAt(name, 0)}</span>
)

export default function ({
  name = '0',
  imgUrl,
  fallback = defaultFallback,
  className = 'rounded-full bg-controls-tertiary-focus flex items-center justify-center',
  size = 8,
}: {
  name?: string | undefined
  imgUrl?: string | undefined
  fallback?: (name: string) => ReactNode
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
        draggable={false}
      />
      <div className={`absolute z-0 ${imageStyles}`}>{fallback(name)}</div>
    </div>
  )
}
