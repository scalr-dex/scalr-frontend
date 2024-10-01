import { useHapticFeedback } from '@telegram-apps/sdk-react'
import { JSX } from 'preact/jsx-runtime'
import { ChildrenProp } from 'type/Props'

export function AccentHeader({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={`text-7xl font-bold leading-extra-tight ${className}`}
    >
      {children}
    </h1>
  )
}

export function Header1({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props} className={`text-4.5xl font-bold ${className}`}>
      {children}
    </h1>
  )
}

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

export function Header3({
  children,
  className,
  ...props
}: ChildrenProp & JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 {...props} className={`text-2xl leading-7 font-bold ${className}`}>
      {children}
    </h3>
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
    <span {...props} className={`font-accent ${className}`}>
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
    <span {...props} className={className}>
      {children}
    </span>
  )
}

export function SpecialText({
  children,
  className,
  leftIcon,
  withShadow,
  ...props
}: ChildrenProp &
  JSX.HTMLAttributes<HTMLSpanElement> & {
    leftIcon?: JSX.Element
    withShadow?: boolean
  }) {
  const haptic = useHapticFeedback()
  const shadow = withShadow ? 'shadow-special' : ''

  return (
    <span
      {...props}
      className={`inline-block mx-2 py-2 px-4 rounded-full font-bold hover:scale-105 active:scale-105 transition-all ${className} ${shadow}`}
      onClick={() => haptic.impactOccurred('heavy')}
    >
      <span className="inline-block mr-1.5 align-middle">{leftIcon}</span>
      {children}
    </span>
  )
}
