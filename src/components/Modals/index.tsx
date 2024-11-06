import modalsAtom, {
  modalDismissibleAtom,
  modalToComponent,
} from 'helpers/atoms/modalsAtom'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'

export default function () {
  const dismissible = useAtomValue(modalDismissibleAtom)
  const [activeModal, setActiveModal] = useAtom(modalsAtom)
  const [open, setOpen] = useState(true)

  if (activeModal === null) return null

  return modalToComponent[activeModal].component({
    dismissible,
    showModal: open,
    setShowModal: () => {
      setOpen(false)
      // required for smooth open-close transitions
      setTimeout(() => {
        setActiveModal(null)
        setOpen(true)
      }, 100)
    },
  })
}
