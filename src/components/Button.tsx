import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react'
import Loader from 'components/Loader'
import { useCallback } from 'preact/hooks'
import ButtonTypes, { buttonClassNames, ButtonProps } from 'type/Button'
import { OnClickEvent } from 'type/Props'

export default function ({
  buttonType = ButtonTypes.accent,
  iconLeft,
  iconRight,
  children,
  className,
  isLoading,
  disabled,
  haptic = 'medium',
  rounded = 'rounded-lg',
  ...buttonProps
}: ButtonProps) {
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  )

  const onClick = useCallback(
    (e: OnClickEvent) => {
      if (isLoading || disabled) return

      buttonProps.onClick?.(e)
      if (haptic) hapticFeedbackImpactOccurred(haptic)
    },
    [buttonProps, disabled, haptic, isLoading]
  )

  const buttonStyles = buttonClassNames(disabled)[buttonType]

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      onClick={onClick}
      className={`flex flex-row gap-x-2 items-center justify-center w-full p-4 transition-colors font-accent font-semibold ${rounded} ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
}
