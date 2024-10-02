import { ChildrenProp, ClassNameProp } from 'type/Props'

export default function ({
  children,
  className,
}: ChildrenProp & ClassNameProp) {
  return (
    <div
      className={`flex flex-col px-3 py-4 rounded-2xl bg-secondary ${className}`}
    >
      {children}
    </div>
  )
}
