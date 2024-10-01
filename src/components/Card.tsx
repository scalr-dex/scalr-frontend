import { ChildrenProp, ClassNameProp } from 'type/Props'

export default function ({
  children,
  className,
}: ChildrenProp & ClassNameProp) {
  return (
    <div
      className={`flex items-center border border-white-16 rounded-2xl ${className}`}
    >
      {children}
    </div>
  )
}
