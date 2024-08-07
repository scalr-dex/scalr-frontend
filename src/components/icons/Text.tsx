import { JSX } from 'preact/jsx-runtime'
import ChildrenProp from 'type/ChildrenProp'

export function Header2({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 {...props} className={`text-3xl font-bold ${className}`}>
      {children}
    </h2>
  )
}

export function Header4({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 {...props} className={`font-medium text-xl ${className}`}>
      {children}
    </h4>
  )
}

export function AccentText({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={`font-accent font-semibold ${className}`}>
      {children}
    </span>
  )
}

export function BodyText({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={`font-sm leading-4 ${className}`}>
      {children}
    </span>
  )
}
