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
  header = (onClose: () => void) => <DefaultHeader onClose={onClose} />,
  body,
  footer,
}: DefaultModalProps & {
  header?: (onClose: () => void) => JSX.Element
  body: () => JSX.Element
  footer?: (onClose: () => void) => JSX.Element
}) {
  const onClose = () => setShowModal(false)

  return (
    <dialog
      className="modal modal-bottom text-white"
      open={showModal}
      onClose={onClose}
    >
      <div className="modal-box bg-transparent max-h-[90dvh] !px-2 !pb-4">
        <div className="w-full p-4 flex flex-col gap-y-5 bg-secondary rounded-4xl">
          {header(onClose)}
          <div className="flex flex-col gap-y-4">{body()}</div>
          {footer ? <div className="mb-4">{footer(onClose)}</div> : null}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop bg-black bg-opacity-75">
        <button>X</button>
      </form>
    </dialog>
  )
}
