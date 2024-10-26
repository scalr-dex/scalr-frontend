import { ImgProps } from 'type/Props'

export default function (props: ImgProps) {
  return (
    <img
      {...props}
      className={`opacity-0 transition-opacity ${props.className}`}
      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
    />
  )
}
