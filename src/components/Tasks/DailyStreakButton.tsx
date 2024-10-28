import ButtonSmall from 'components/ButtonSmall'
import Fire from 'components/icons/Fire'
import dayjs from 'dayjs'
import { getDailyStreak } from 'helpers/api/dailyReward'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function () {
  const [user, setUser] = useAtom(UserAtom)

  const canClaim = dayjs(user?.lastLoginDate).diff(dayjs(), 'days')

  const onClick = useCallback(async () => {
    try {
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
    }
  }, [setUser])

  return (
    <ButtonSmall
      iconLeft={<Fire />}
      buttonType={ButtonTypes.outline}
      className="py-2 px-4"
      onClick={onClick}
      disabled={!canClaim}
    >
      {user?.loginDays}
    </ButtonSmall>
  )
}
