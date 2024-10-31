import { useHapticFeedback } from '@telegram-apps/sdk-react'
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
  ...buttonProps
}: ButtonProps) {
  const impact = useHapticFeedback()
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
      if (haptic) impact.impactOccurred(haptic)
    },
    [buttonProps, disabled, haptic, impact, isLoading]
  )

  const buttonStyles = buttonClassNames(disabled)[buttonType]

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      onClick={onClick}
      className={`flex flex-row gap-x-2 items-center justify-center w-full rounded-lg p-4 transition-colors font-semibold outline-none ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader size={24} /> : content}
    </button>
  )
}
