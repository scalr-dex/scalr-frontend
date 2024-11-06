import { ClassNameProp } from 'type/Props'

export default function ({
  src,
  forModal,
  className,
}: { src?: string; forModal?: boolean } & ClassNameProp) {
  const modalStyle = forModal ? 'self-center min-h-44 h-44 rounded-lg' : ''

  return (
    <img
      src={src}
      className={`animate-fadeIn opacity-0 transition-opacity ${modalStyle} ${className}`}
      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
    />
  )
}
