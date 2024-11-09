import dayjs from 'dayjs'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import { onboardedS2Atom, didOnboardAtom } from 'helpers/atoms/UserStates'
import { useSetAtom, useAtomValue, useAtom } from 'jotai'
import { useState, useEffect, useCallback } from 'react'
import useCountDown from 'helpers/hooks/useCountDown'
import UserAtom from 'helpers/atoms/UserAtom'
import { getDailyStreak } from 'helpers/api/dailyReward'
import handleError from 'helpers/handleError'

export default function (shouldAutoClaim?: boolean) {
  const [user, setUser] = useAtom(UserAtom)
  const setModal = useSetAtom(modalsAtom)
  const didOnboard = useAtomValue(didOnboardAtom)
  const onboardedS2 = useAtomValue(onboardedS2Atom)
  const [time, setTime] = useState(
    dayjs(user?.lastLoginDate).utc().endOf('day').diff(dayjs().utc(), 'seconds')
  )

  useCountDown(setTime)

  const disabled = time > 0

  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    if (!shouldAutoClaim || disabled || !onboardedS2 || !didOnboard) return
    setModal(AvailableModals.dailyStreak)
    setTimeout(onClick, 300)
  }, [disabled, setModal, didOnboard, onboardedS2, onClick, shouldAutoClaim])

  return {
    disabled,
    loading,
    onClick,
    time,
    formatted: dayjs({ seconds: time }).format('HH:mm:ss'),
  }
}
