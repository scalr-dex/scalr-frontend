import ButtonSmall from 'components/ButtonSmall'
import { AccentText } from 'components/icons/Text'
import UserTask, {
  iconNumberToIcon,
  taskStatusToButtonText,
  taskStatusToButtonType,
  taskStatusToCallback,
} from 'type/UserTask'
import { useCallback, useState } from 'preact/hooks'
import { useUtils } from '@telegram-apps/sdk-react'
import { successConfetti } from 'helpers/shootConfetti'

export default function ({
  IconNumber,
  Name,
  RewardAmount,
  Status,
  TaskID,
  URL,
  refetch,
}: UserTask & { refetch: () => void }) {
  const utils = useUtils()
  const [loading, setLoading] = useState(false)
  const buttonType = taskStatusToButtonType[Status]

  const onClick = useCallback(() => {
    setLoading(true)

    if (Status === 'NotStarted') {
      utils.openLink(URL)
    }
    void taskStatusToCallback[Status](TaskID).finally(() => {
      setLoading(false)
      refetch()
      void successConfetti()
    })
  }, [Status, TaskID, URL, refetch, utils])

  const opacity = Status === 'Claimed' ? 'opacity-50' : 'opacity-100'

  return (
    <div className={`flex flex-row items-center justify-between ${opacity}`}>
      <div className="flex flex-row items-center gap-x-3">
        <div className="w-6 h-6">{iconNumberToIcon[IconNumber]}</div>
        <div className="flex flex-col gap-y-1">
          <AccentText className="font-bold">{Name} </AccentText>
          <AccentText>+{RewardAmount} pts</AccentText>
        </div>
      </div>
      <ButtonSmall
        buttonType={buttonType}
        className="text-sm font-accent px-2.5 py-1.5"
        onClick={onClick}
        isLoading={loading}
        disabled={Status === 'Claimed'}
      >
        {taskStatusToButtonText[Status]}
      </ButtonSmall>
    </div>
  )
}
