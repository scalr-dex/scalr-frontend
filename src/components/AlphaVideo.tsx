import { FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
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
  srcAv1?: string
  srcHevc: string
  src?: string
  poster?: string
  width?: number
  height?: number
}) {
  const [videoReady, setVideoReady] = useState(false)

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
    <div
      style={{
        width,
        height,
        backgroundImage: videoReady ? '' : `url(${poster})`,
        backgroundSize: 'cover',
      }}
    >
      <StackedAlphaVideo
        style={{
          width,
          height,
          display: videoReady ? 'inline-block' : 'none',
          aspectRatio: '1 / 1',
        }}
      >
        <video
          muted
          playsInline
          autoplay
          loop
          onLoadedData={() => {
            setTimeout(() => setVideoReady(true), 1600)
          }}
          src={srcHevc}
          type="video/mp4; codecs=hvc1.1.6.H120.b0"
        >
          <source
            src={srcAv1}
            type="video/mp4; codecs=av01.0.08M.08.0.110.01.01.01.1"
          />
        </video>
      </StackedAlphaVideo>
    </div>
  )
}
