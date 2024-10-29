import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtom } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import { getDailyStreak } from 'helpers/api/dailyReward'
import handleError from 'helpers/handleError'
import Fire from 'components/icons/Fire'
import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/useCountDown'

function ModalBody() {
  return (
    <>
      <div className="px-4 h-44 w-44 self-center drop-shadow-bulb-glow">
        <Fire />
      </div>
      <Header2 className="px-4">Keep your daily streak</Header2>
      <BodyText className="text-balance px-4">And get rewarded 🎁</BodyText>
    </>
  )
}

function ModalFooter() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useAtom(UserAtom)
  const [time, setTime] = useState(
    dayjs(user?.lastLoginDate).add(1, 'day').diff(dayjs(), 'seconds')
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
      {time ? dayjs({ seconds: time }).format('HH:mm:ss') : 'Check in 🔥'}
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} footer={ModalFooter} />
}
