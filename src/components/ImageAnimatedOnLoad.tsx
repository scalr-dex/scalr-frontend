import { ImgProps } from 'type/Props'

export default function (props: ImgProps & { forModal?: boolean }) {
  const modalStyle = props.forModal
    ? 'self-center min-h-44 h-44 rounded-lg'
    : ''

  return (
    <img
      {...props}
      className={`animate-fadeIn opacity-0 transition-opacity ${modalStyle} ${props.className}`}
      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
    />
  )
}
