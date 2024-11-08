import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react'
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
  const onClick = useCallback(
    (e: OnClickEvent<HTMLButtonElement>) => {
      if (!allowDisabledClick && (isLoading || disabled)) return

      buttonProps.onClick?.(e)
      if (haptic) hapticFeedbackImpactOccurred(haptic)
    },
    [allowDisabledClick, buttonProps, disabled, haptic, isLoading]
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
      className={`flex flex-row gap-x-1 items-center justify-center w-fit min-w-16 rounded-full transition-all font-semibold outline-none ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
}
