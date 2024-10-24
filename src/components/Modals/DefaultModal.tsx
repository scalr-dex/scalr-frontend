import Close from 'components/icons/Close'
import { JSX } from 'preact/jsx-runtime'
import { DefaultModalProps } from 'type/Props'
import { Sheet, SheetRef } from 'react-modal-sheet'
import { useRef } from 'preact/hooks'

function DefaultHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full flex flex-row items-center justify-end">
      <Close onClick={onClose} />
    </div>
  )
}

export default function ({
  showModal,
  setShowModal,
  onCloseCallback,
  header = (onClose: () => void) => <DefaultHeader onClose={onClose} />,
  body,
  footer,
}: DefaultModalProps & {
  header?: (onClose: () => void) => JSX.Element
  body: (onClose: () => void) => JSX.Element
  footer?: (onClose: () => void) => JSX.Element | null
}) {
  const ref = useRef<SheetRef>()
  const onClose = () => {
    onCloseCallback?.()
    setShowModal(false)
  }

  return (
    <Sheet isOpen={showModal} onClose={onClose} ref={ref}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
          <Sheet.Scroller>
            <div className="flex flex-col gap-y-4 px-4">{body(onClose)}</div>
            <div className="sticky bottom-4 px-4 pt-4">{footer?.(onClose)}</div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
