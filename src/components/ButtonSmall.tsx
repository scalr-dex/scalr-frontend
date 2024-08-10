import Loader from 'components/Loader'
import ButtonTypes, { buttonClassNames, ButtonProps } from 'type/Button'

export default function ({
  buttonType = ButtonTypes.accent,
  iconLeft,
  iconRight,
  children,
  className,
  loading,
  disabled,
  ...buttonProps
}: ButtonProps) {
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
      className={`flex flex-row gap-x-1 items-center justify-center w-fit min-w-16 rounded-3xl transition-all font-semibold ${buttonStyles} ${className}`}
    >
      {loading ? <Loader /> : content}
    </button>
  )
}
