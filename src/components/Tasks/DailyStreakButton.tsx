import ButtonSmall from 'components/ButtonSmall'
import Fire from 'components/icons/Fire'
import { getDailyStreak } from 'helpers/api/dailyReward'
import handleError from 'helpers/handleError'
import { useCallback } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function ({ streak = 0 }: { streak?: number | undefined }) {
  const onClick = useCallback(() => {
    try {
      void getDailyStreak()
    } catch (e) {
      handleError({ e })
    }
  }, [])

  return (
    <ButtonSmall
      iconLeft={<Fire />}
      buttonType={ButtonTypes.outline}
      className="py-2 px-4"
      onClick={onClick}
    >
      {streak}
    </ButtonSmall>
  )
}
