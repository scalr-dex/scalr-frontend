import ButtonSmall from 'components/ButtonSmall'
import Fire from 'components/icons/Fire'
import ButtonTypes from 'type/Button'

export default function ({ streak = 0 }: { streak?: number | undefined }) {
  return (
    <ButtonSmall
      iconLeft={<Fire />}
      buttonType={ButtonTypes.outline}
      className="py-2 px-4"
    >
      {streak}
    </ButtonSmall>
  )
}
