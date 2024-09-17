import ButtonSmall from 'components/ButtonSmall'
import { AccentText } from 'components/Text'
import { PropsWithChildren } from 'preact/compat'
import { JSX } from 'preact/jsx-runtime'
import ButtonTypes from 'type/Button'
import { ClassNameProp, OnClickProp } from 'type/Props'

export default function ({
  className,
  icon,
  onClick,
  buttonType,
  loading,
  children,
  disabled,
  taskText = 'Start',
  rewardAmount,
}: ClassNameProp &
  OnClickProp &
  PropsWithChildren & {
    rewardAmount: number
    icon: JSX.Element
    taskText?: string | undefined
    buttonType?: ButtonTypes | undefined
    loading?: boolean | undefined
    disabled?: boolean | undefined
  }) {
  return (
    <div className={`flex flex-row items-center justify-between ${className}`}>
      <div className="flex flex-row items-center gap-x-3">
        <div className="w-6 h-6">{icon}</div>
        <div className="flex flex-col gap-y-1">
          <AccentText className="font-bold">{taskText} </AccentText>
          <AccentText>+{rewardAmount} pts</AccentText>
        </div>
      </div>
      <ButtonSmall
        buttonType={buttonType}
        className="text-sm font-accent px-2.5 py-1.5"
        onClick={onClick}
        isLoading={loading}
        disabled={disabled}
        allowDisabledClick
      >
        {children}
      </ButtonSmall>
    </div>
  )
}
