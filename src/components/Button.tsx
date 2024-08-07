import Loader from 'components/Loader'
import ButtonTypes, { buttonClassNames, ButtonProps } from 'type/Button'

export default function ({
  buttonType = ButtonTypes.accent,
  iconLeft,
  iconRight,
  children,
  className,
  isLoading,
  ...buttonProps
}: ButtonProps) {
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  )

  const buttonStyles = buttonClassNames[buttonType]

  return (
    <button
      {...buttonProps}
      className={`flex flex-row gap-x-2 items-center justify-center w-full rounded-lg p-4 transition-colors font-semibold ${buttonStyles} ${className}`}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
}
