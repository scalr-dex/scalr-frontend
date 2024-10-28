import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useUtils } from '@telegram-apps/sdk-react'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import { checkTask, claimTask } from 'helpers/api/userTasks'
import UserAtom from 'helpers/atoms/UserAtom'
import { useSetAtom } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import TrackerEvents from 'type/TrackerEvents'
import UserTask, { iconNumberToComponent, iconNumberToSrc } from 'type/UserTask'
import { track } from 'helpers/api/analytics'
import TaskRewardBlock from 'components/Tasks/TaskRewardBlock'
import { successConfetti } from 'helpers/shootConfetti'
import { invalidateQuery, QueryKeys } from 'helpers/queryClient'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface TaskModalProps extends DefaultModalProps, UserTask {}

function ModalBody({ IconURL, IconNumber, RewardAmount, Name }: UserTask) {
  const imageSrc = IconURL || iconNumberToSrc[IconNumber]

  return (
    <>
      <div className="flex flex-col items-center gap-y-4 px-4 h-44 w-44 rounded-lg object-cover self-center ">
        {imageSrc ? (
          <ImageAnimatedOnLoad
            className="h-44 w-44 rounded-lg object-cover self-center"
            src={imageSrc}
          />
        ) : (
          iconNumberToComponent(IconNumber)
        )}
        <TaskRewardBlock rewardAmount={RewardAmount} />
      </div>
      <Header2 className="px-4">{Name}</Header2>
      <BodyText className="text-balance px-4">Check it out 😎</BodyText>
    </>
  )
}

function ModalFooter({
  onClose,
  Status,
  TaskID,
  URL,
}: { onClose: () => void } & UserTask) {
  const [parent] = useAutoAnimate()
  const [loading, setLoading] = useState(false)
  const utils = useUtils()
  const setUser = useSetAtom(UserAtom)

  const openTgLink = useCallback(
    (url: string) => {
      url.includes('t.me') ? utils.openTelegramLink(url) : utils.openLink(url)
    },
    [utils]
  )
  const onClick = useCallback(async () => {
    setLoading(true)

    if (Status === 'NotStarted') {
      setTimeout(async () => {
        await checkTask(TaskID)
        setLoading(false)
      }, 1000)
      return
    }

    if (Status === 'ReadyToClaim') {
      await claimTask(TaskID)
      setUser((prev) =>
        prev ? { ...prev, remainingTasks: prev.remainingTasks - 1 } : null
      )
      await invalidateQuery(QueryKeys.userTasks)
      setLoading(false)
      onClose()
      await successConfetti()
      track(TrackerEvents.taskDone, TaskID)
    }
  }, [Status, TaskID, onClose, setUser])

  return (
    <div className="flex flex-col gap-y-4" ref={parent}>
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={() => openTgLink(URL)}
      >
        Open task
      </Button>
      {Status === 'Claimed' ? null : (
        <Button
          buttonType={ButtonTypes.neutral}
          className="!rounded-full"
          onClick={onClick}
          isLoading={loading}
        >
          Check task
        </Button>
      )}
    </div>
  )
}

export default function (props: TaskModalProps) {
  return (
    <DefaultModal
      {...props}
      body={() => <ModalBody {...props} />}
      footer={(onClose) => <ModalFooter {...props} onClose={onClose} />}
    />
  )
}
