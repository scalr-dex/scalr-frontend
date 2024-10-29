import Button from 'components/Button'
import { BodyText, Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import { getDailyStreak } from 'helpers/api/dailyReward'
import handleError from 'helpers/handleError'
import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'

function ModalBody() {
  const user = useAtomValue(UserAtom)

  const loginDays = user?.loginDays || 1

  return (
    <>
      <ImageAnimatedOnLoad
        src="img/utya-burn.png"
        className="h-44 self-center"
      />
      <div className="flex flex-col items-center justify-center gap-y-5">
        <BodyText className="text-alt-dark text-6xl font-bold">
          {loginDays}
        </BodyText>
        <Header3 className="text-alt-dark">
          day{loginDays > 1 ? 's' : ''} streak!
        </Header3>
        <BodyText className="text-balance px-4">
          Open Scalr each day to earn a streak reward.
        </BodyText>
      </div>
    </>
  )
}

function ModalFooter() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useAtom(UserAtom)
  const [time, setTime] = useState(
    dayjs(user?.lastLoginDate).endOf('day').diff(dayjs(), 'seconds')
  )
  useCountDown(setTime)

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      const { last_login_date, login_days } = await getDailyStreak()
      setUser((prev) =>
        prev
          ? {
              ...prev,
              lastLoginDate: new Date(last_login_date),
              loginDays: login_days,
            }
          : null
      )
    } catch (e) {
      handleError({ e })
    } finally {
      setLoading(false)
    }
  }, [setUser])

  return (
    <Button
      buttonType={ButtonTypes.secondary}
      className="!rounded-full"
      onClick={onClick}
      isLoading={loading}
      disabled={!!time}
    >
      {time ? dayjs({ seconds: time }).format('HH:mm:ss') : 'Continue'}
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} footer={ModalFooter} />
}
