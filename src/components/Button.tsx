import { useHapticFeedback } from '@telegram-apps/sdk-react'
import Loader from 'components/Loader'
import ButtonTypes, { buttonClassNames, ButtonProps } from 'type/Button'

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
  const hapticFeedback = useHapticFeedback()
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  )

  const buttonStyles = buttonClassNames(disabled)[buttonType]

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      onClick={(e) => {
        if (isLoading || disabled) return
        buttonProps.onClick?.(e)
        hapticFeedback.impactOccurred(haptic)
      }}
      className={`flex flex-row gap-x-2 items-center justify-center w-full rounded-lg p-4 transition-colors font-semibold ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
}
