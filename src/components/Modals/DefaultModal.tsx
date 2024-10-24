import Close from 'components/icons/Close'
import { JSX } from 'preact/jsx-runtime'
import { DefaultModalProps } from 'type/Props'

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
  const onClose = () => {
    onCloseCallback?.()
    setShowModal(false)
  }

  return (
    <dialog
      className="modal modal-bottom text-white"
      open={showModal}
      onClose={onClose}
    >
      <div className="modal-box bg-transparent max-h-[95vh] p-0">
        <div className="w-full pt-4 px-4 flex flex-col gap-y-5 bg-secondary rounded-t-4xl rounded-b-xl overflow-x-clip">
          {header(onClose)}
          <div className="flex flex-col gap-y-4">{body(onClose)}</div>
          {footer ? (
            <div className="sticky bottom-4">{footer(onClose)}</div>
          ) : null}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop bg-black bg-opacity-75">
        <button>X</button>
      </form>
    </dialog>
  )
}
