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
  allowDisabledClick,
  onClick,
  ...buttonProps
}: ButtonProps) {
  const haptic = useHapticFeedback()
  const content = (
    <div className="flex flex-row w-full items-center justify-center gap-x-1">
      {iconLeft}
      {children}
      {iconRight}
    </div>
  )

  const buttonStyles = buttonClassNames(disabled)[buttonType]

  return (
    <button
      {...buttonProps}
      onClick={(e) => {
        if (!allowDisabledClick && (isLoading || disabled)) return

        onClick?.(e)
        haptic.impactOccurred('soft')
      }}
      disabled={!allowDisabledClick && disabled}
      className={`flex flex-row gap-x-1 items-center justify-center w-fit min-w-16 rounded-3xl transition-all font-semibold ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
}
