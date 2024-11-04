import modalsAtom, { modalToComponent } from 'helpers/atoms/modalsAtom'
import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'

export default function () {
  const [activeModal, setActiveModal] = useAtom(modalsAtom)
  const [open, setOpen] = useState(true)

  if (activeModal === null) return null

  return modalToComponent[activeModal]({
    showModal: open,
    setShowModal: () => {
      setOpen(false)
      setTimeout(() => {
        setActiveModal(null)
        setOpen(true)
      }, 200)
    },
  })
}
