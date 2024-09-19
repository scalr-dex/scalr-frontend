import { ImpactHapticFeedbackStyle } from '@telegram-apps/sdk-react'
import { ComponentChildren } from 'preact'
import { JSX } from 'preact/jsx-runtime'

enum ButtonTypes {
  success,
  error,
  accent,
  secondary,
  outline,
  ghost,
  neutral,
  special,
}

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonTypes
  children: ComponentChildren
  iconLeft?: JSX.Element
  iconRight?: JSX.Element | null
  isLoading?: boolean
  disabled?: boolean | undefined
  allowDisabledClick?: boolean | undefined
  haptic?: ImpactHapticFeedbackStyle | false
}

export const buttonClassNames = (disabled?: boolean) => ({
  [ButtonTypes.accent]:
    'bg-accent hover:bg-accent-hover focus:bg-accent-focus disabled:bg-accent-disabled',
  [ButtonTypes.secondary]:
    'text-primary bg-white hover:bg-opacity-90 active:bg-opacity-70 disabled:bg-opacity-60',
  [ButtonTypes.error]:
    'text-primary bg-error hover:bg-opacity-90 focus:bg-opacity-70 disabled:bg-opacity-60',
  [ButtonTypes.success]:
    'text-primary bg-success hover:bg-opacity-90 focus:bg-opacity-70 disabled:bg-opacity-60',
  [ButtonTypes.ghost]:
    'text-white bg-transparent hover:text-opacity-90 focus:text-opacity-70 disabled:text-opacity-60',
  [ButtonTypes.neutral]:
    'bg-controls-tertiary hover:bg-controls-tertiary-hover active:bg-controls-tertiary-active disabled:bg-controls-tertiary-disabled',
  [ButtonTypes.outline]: 'bg-transparent border border-white-16',
  [ButtonTypes.special]: `text-white ${disabled ? 'bg-border-gradient' : 'bg-special-gradient'} hover:opacity-90 active:opacity-90 font-medium disabled:bg-primary disabled:text-opacity-50`,
})

export default ButtonTypes
