import { JSX } from 'preact/jsx-runtime'

export default function ({
  src,
  fallbackSrc = '/img/checked.png',
  ...imgProps
}: JSX.HTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }) {
  return (
    <img
      src={src}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = fallbackSrc
      }}
      {...imgProps}
    />
  )
}
