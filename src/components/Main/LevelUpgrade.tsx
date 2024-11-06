import ButtonSmall from 'components/ButtonSmall'
import ArrowTopCircle from 'components/icons/ArrowTopCircle'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import UserAtom from 'helpers/atoms/UserAtom'
import { useAtomValue, useSetAtom } from 'jotai'
import ButtonTypes from 'type/Button'

export default function () {
  const setModal = useSetAtom(modalsAtom)
  const user = useAtomValue(UserAtom)

  if (!user) return null

  return (
    <ButtonSmall
      onClick={() => setModal(AvailableModals.levelUpgrade)}
      className="min-w-fit px-2 border border-white-16"
      buttonType={ButtonTypes.neutral}
      iconRight={<ArrowTopCircle />}
    >
      {user.level.current}
    </ButtonSmall>
  )
}
