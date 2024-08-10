import ButtonSmall from 'components/ButtonSmall'
import ChevronRight from 'components/icons/ChevronRight'
import ButtonTypes from 'type/Button'

export default function () {
  return (
    <ButtonSmall
      buttonType={ButtonTypes.special}
      iconRight={<ChevronRight />}
      className="px-4 py-1.5"
    >
      Daily Claim
    </ButtonSmall>
  )
}
