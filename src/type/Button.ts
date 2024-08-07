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
  iconRight?: JSX.Element
  isLoading?: boolean
}

export const buttonClassNames = {
  [ButtonTypes.accent]:
    'bg-accent hover:bg-accent-hover focus:bg-accent-focus disabled:bg-accent-disabled',
  [ButtonTypes.secondary]:
    'bg-white hover:bg-opacity-90 focus:bg-opacity-70 disabled:bg-opacity-60 text-primary',
  [ButtonTypes.error]:
    'bg-error hover:bg-opacity-90 focus:bg-opacity-70 disabled:bg-opacity-60 text-primary',
  [ButtonTypes.success]:
    'bg-success hover:bg-opacity-90 focus:bg-opacity-70 disabled:bg-opacity-60 text-primary',
  [ButtonTypes.ghost]:
    'bg-transparent hover:text-opacity-90 focus:text-opacity-70 disabled:text-opacity-60',
  [ButtonTypes.neutral]: 'bg-neutral active:bg-neutral-active',
  [ButtonTypes.outline]: 'bg-transparent border border-white-16',
  [ButtonTypes.special]:
    'bg-gradient-to-r from-[#3AF3FF] via-[#4986FB] to-[#8160E1] hover:opacity-90 font-medium',
}

export default ButtonTypes
