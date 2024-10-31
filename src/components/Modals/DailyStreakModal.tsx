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
import { AnimatedCounter } from 'react-animated-counter'

function ModalBody() {
  const user = useAtomValue(UserAtom)

  const loginDays = user?.loginDays || 0

  return (
    <>
      <ImageAnimatedOnLoad src="img/utya-burn.png" forModal />

      <div className="flex flex-col items-center justify-center gap-y-5">
        <AnimatedCounter
          value={loginDays}
          includeDecimals={false}
          fontSize="3.75rem"
          digitStyles={{
            color: '#FF9341',
            fontWeight: 800,
          }}
          incrementColor="#FFE792"
        />
        <Header3 className="text-alt-dark">
          day{loginDays === 1 ? '' : 's'} streak!
        </Header3>
        <BodyText className="text-balance text-center px-4">
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
    dayjs(user?.lastLoginDate).utc().endOf('day').diff(dayjs().utc(), 'seconds')
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

      setTime(
        dayjs(last_login_date).utc().endOf('day').diff(dayjs().utc(), 'seconds')
      )
    } catch (e) {
      handleError({ e })
    } finally {
      setLoading(false)
    }
  }, [setUser])

  const disabled = time > 0

  return (
    <Button
      buttonType={ButtonTypes.secondary}
      className="!rounded-full"
      onClick={onClick}
      isLoading={loading}
      disabled={disabled}
    >
      {disabled ? dayjs({ seconds: time }).format('HH:mm:ss') : 'Continue'}
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} footer={ModalFooter} />
}
