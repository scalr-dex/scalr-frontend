import ButtonSmall from 'components/ButtonSmall'
import { AccentText } from 'components/Text'
import { ButtonProps } from 'type/Button'

interface TaskUiProps extends ButtonProps {
  rewardAmount: number
  taskText: string
}

export default function ({
  className,
  iconLeft,
  rewardAmount,
  onClick,
  isLoading,
  disabled,
  buttonType,
  taskText,
  children,
}: TaskUiProps) {
  return (
    <div className={`flex flex-row items-center justify-between ${className}`}>
      <div className="flex flex-row items-center gap-x-3">
        <div className="w-6 h-6">{iconLeft}</div>
        <div className="flex flex-col gap-y-1">
          <AccentText className="font-bold">{taskText}</AccentText>
          <AccentText>+{rewardAmount} pts</AccentText>
        </div>
      </div>
      <ButtonSmall
        buttonType={buttonType}
        className="text-sm font-accent px-2.5 py-1.5 transition-all !min-w-24"
        onClick={onClick}
        isLoading={isLoading}
        disabled={disabled}
        allowDisabledClick
      >
        {children}
      </ButtonSmall>
    </div>
  )
}
