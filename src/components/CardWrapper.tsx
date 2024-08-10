import { ClassNameProp, ChildrenProp } from 'type/Props'

export default function ({
  children,
  className,
}: ChildrenProp & ClassNameProp) {
  return (
    <div className={`flex flex-col bg-secondary rounded-xl p-5 ${className}`}>
      {children}
    </div>
  )
}
