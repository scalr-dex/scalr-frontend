import { AccentText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import { ClassNameProp, OnClickProp } from 'type/Props'
import TaskRewardBlock from 'components/Tasks/TaskRewardBlock'

type IconProp = { icon: JSX.Element }

interface TaskUiProps
  extends OnClickProp<HTMLDivElement>,
    ClassNameProp,
    IconProp {
  rewardAmount: number
  taskText: string
  disabled?: boolean
  extraData?: string
  loading?: boolean
}

function IconBlock({ icon }: IconProp) {
  return (
    <div className="flex w-8 h-8 items-center justify-center rounded-lg border border-white border-opacity-5 overflow-clip">
      {icon}
    </div>
  )
}

export default function ({
  className,
  icon,
  rewardAmount,
  onClick,
  disabled,
  taskText,
  extraData,
  loading,
}: TaskUiProps) {
  const opacity = disabled
    ? 'opacity-50 cursor-not-allowed'
    : loading
      ? 'animate-pulse'
      : 'active:opacity-60 hover:animate-pulse cursor-pointer'

  return (
    <div
      className={`flex flex-row items-center justify-between transition-opacity ${opacity} ${className}`}
      onClick={(e) => {
        if (loading || disabled) return
        onClick?.(e)
      }}
      disabled={disabled}
    >
      <div className="flex flex-row items-start gap-x-3">
        <IconBlock icon={icon} />
        <div className="flex flex-col gap-y-1">
          <AccentText className="font-bold">{taskText}</AccentText>
          <TaskRewardBlock rewardAmount={rewardAmount} extraData={extraData} />
        </div>
      </div>
    </div>
  )
}
