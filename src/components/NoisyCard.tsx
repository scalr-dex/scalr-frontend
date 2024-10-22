import { ChildrenProp, ClassNameProp } from 'type/Props'

export default function ({
  children,
  className,
}: ChildrenProp & ClassNameProp) {
  return (
    <div
      className={`w-full bg-secondary p-4 bg-noise rounded-2xl ${className}`}
    >
      {children}
    </div>
  )
}
