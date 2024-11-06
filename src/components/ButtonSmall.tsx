import { useHapticFeedback } from '@telegram-apps/sdk-react'
import Loader from 'components/Loader'
import { useCallback } from 'react'
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
  allowDisabledClick,
  haptic = 'soft',
  contentClassName,
  ...buttonProps
}: ButtonProps) {
  const impact = useHapticFeedback()

  const onClick = useCallback(
    (e: OnClickEvent<HTMLButtonElement>) => {
      if (!allowDisabledClick && (isLoading || disabled)) return

      buttonProps.onClick?.(e)
      if (haptic) impact.impactOccurred(haptic)
    },
    [allowDisabledClick, buttonProps, disabled, haptic, impact, isLoading]
  )

  const content = (
    <div
      className={`flex flex-row w-full items-center justify-center gap-x-1 ${contentClassName}`}
    >
      {iconLeft}
      {children}
      {iconRight}
    </div>
  )

  const buttonStyles = buttonClassNames(disabled)[buttonType]

  return (
    <button
      {...buttonProps}
      onClick={onClick}
      disabled={!allowDisabledClick && disabled}
      className={`flex flex-row gap-x-1 items-center justify-center w-fit min-w-16 rounded-3xl transition-all font-semibold outline-none ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
}
