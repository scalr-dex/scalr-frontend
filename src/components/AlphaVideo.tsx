import {
  isAndroid,
  isBrowser,
  isMacOs,
  isMobileSafari,
  isSafari,
} from 'react-device-detect'

export default function ({
  srcSafari,
  poster,
  src,
  width,
  height,
}: {
  srcSafari?: string
  src?: string
  poster?: string
  width?: number
  height?: number
}) {
  if ((isBrowser && !isSafari && !isMobileSafari && !isMacOs) || isAndroid)
    return (
      <video
        muted
        crossorigin="true"
        playsInline
        autoplay
        loop
        poster={poster}
        src={src}
        style={{ width, height }}
      />
    )

  return <img style={{ width, height }} src={srcSafari} />
}
