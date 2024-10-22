import { ChildrenProp, ClassNameProp, StyleProp } from 'type/Props'

export default function ({
  children,
  className,
  style,
}: ChildrenProp & ClassNameProp & StyleProp) {
  return (
    <div
      className={`w-full bg-secondary rounded-2xl ${className} transition-transform will-change-transform hover:scale-105 active:scale-95 cursor-pointer`}
      style={style}
    >
      {children}
    </div>
  )
}
