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

interface TaskModalProps extends DefaultModalProps, UserTask {}

function ModalBody({ IconURL, IconNumber, RewardAmount, Name }: UserTask) {
  const imageSrc = IconURL || iconNumberToSrc[IconNumber]

  return (
    <>
      <div className="flex flex-col items-center gap-y-4 px-4">
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
      <BodyText className="text-balance px-4">Play play play</BodyText>
    </>
  )
}

function ModalFooter({
  onClose,
  Status,
  TaskID,
  URL,
}: { onClose: () => void } & UserTask) {
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
    if (Status === 'Claimed') {
      openTgLink(URL)
      return
    }

    setLoading(true)

    if (Status === 'NotStarted') {
      openTgLink(URL)
      setTimeout(async () => {
        await checkTask(TaskID)
        // await refetch()
        setLoading(false)
      }, 1000)
      return
    }

    if (Status === 'ReadyToClaim') {
      await claimTask(TaskID)
      //   await refetch()
      setUser((prev) =>
        prev ? { ...prev, remainingTasks: prev.remainingTasks - 1 } : null
      )
      setLoading(false)
      track(TrackerEvents.taskDone, TaskID)
    }
  }, [Status, TaskID, URL, openTgLink, setUser])

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        buttonType={ButtonTypes.secondary}
        className="!rounded-full"
        onClick={onClick}
        isLoading={loading}
      >
        Open task
      </Button>
      <Button
        buttonType={ButtonTypes.neutral}
        className="!rounded-full"
        onClick={onClose}
        isLoading={loading}
      >
        Check task
      </Button>
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
