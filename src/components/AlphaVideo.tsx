import { renderWebm } from 'type/Onboarding'

export default function ({
  srcSafari,
  src,
  width,
  height,
}: {
  srcSafari?: string
  src?: string
  width?: number
  height?: number
}) {
  if (renderWebm)
    return (
      <video
        muted
        crossorigin="true"
        playsInline
        autoplay
        loop
        src={src}
        style={{ width, height }}
      />
    )

  return <img style={{ width, height }} src={srcSafari} />
}
