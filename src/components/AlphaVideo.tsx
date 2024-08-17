import { FunctionComponent } from 'preact'
import { JSX } from 'preact/jsx-runtime'
import {
  isAndroid,
  isBrowser,
  isMacOs,
  isMobileSafari,
  isSafari,
} from 'react-device-detect'
import 'stacked-alpha-video'

type StackedAlphaVideoProps = JSX.HTMLAttributes<HTMLElement>

const StackedAlphaVideo =
  'stacked-alpha-video' as unknown as FunctionComponent<StackedAlphaVideoProps>

export default function ({
  srcAv1,
  srcHevc,
  poster,
  src,
  width,
  height,
}: {
  srcAv1: string
  srcHevc: string
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

  return (
    <StackedAlphaVideo style={{ width, height, display: 'inline-block' }}>
      <video muted playsInline autoplay loop poster={poster} className="hidden">
        <source
          src={srcAv1}
          type="video/mp4; codecs=av01.0.08M.08.0.110.01.01.01.1"
        />
        <source src={srcHevc} type="video/mp4; codecs=hvc1.1.6.H120.b0" />
        <source src={src} type="video/webm" />
      </video>
    </StackedAlphaVideo>
  )
}
