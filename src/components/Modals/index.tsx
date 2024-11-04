import modalsAtom, { modalToComponent } from 'helpers/atoms/modalsAtom'
import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'

export default function () {
  const [activeModal, setActiveModal] = useAtom(modalsAtom)
  const [open, setOpen] = useState(true)

  if (activeModal === null) return null

  return modalToComponent[activeModal].component({
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
