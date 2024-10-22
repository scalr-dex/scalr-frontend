import { ChildrenProp, ClassNameProp, OnClickProp, StyleProp } from 'type/Props'

type NoisyCardProps = ChildrenProp &
  ClassNameProp &
  StyleProp &
  OnClickProp<HTMLDivElement>

export default function ({
  children,
  className,
  onClick,
  style,
}: NoisyCardProps) {
  return (
    <div
      className={`w-full bg-secondary rounded-2xl ${className} transition-transform will-change-transform hover:scale-105 active:scale-95 cursor-pointer`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
