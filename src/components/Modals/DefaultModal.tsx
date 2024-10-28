import Close from 'components/icons/Close'
import { JSX } from 'preact/jsx-runtime'
import { ClassName, DefaultModalProps } from 'type/Props'
import { Drawer } from 'vaul'

export default function ({
  showModal,
  setShowModal,
  onCloseCallback,
  header = () => <Close />,
  body,
  footer,
  dismissible = true,
  contentClassName,
  bodyWrapperClassName,
  footerWrapperClassName,
}: DefaultModalProps & {
  header?: (onClose: () => void) => JSX.Element
  body: (onClose: () => void) => JSX.Element
  footer?: ((onClose: () => void) => JSX.Element) | null
  dismissible?: boolean
  contentClassName?: ClassName
  bodyWrapperClassName?: ClassName
  footerWrapperClassName?: ClassName
}) {
  const onClose = () => {
    onCloseCallback?.()
    setShowModal(false)
  }

  return (
    <Drawer.Root
      open={showModal}
      onOpenChange={(open) => (open ? null : onClose())}
      dismissible={dismissible}
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all will-change-auto" />
        <Drawer.Content
          className={`flex flex-col rounded-t-3xl bg-secondary max-h-[98vh] fixed bottom-0 left-0 right-0 outline-none ${contentClassName}`}
        >
          <Drawer.Title className="hidden">Dialog window</Drawer.Title>
          <Drawer.Handle className="w-12 h-1 mb-1 mt-4" />
          <Drawer.Close className="w-full flex flex-row items-center justify-end pb-6 pr-4">
            {header(onClose)}
          </Drawer.Close>

          <div
            className={`relative flex flex-col gap-y-4 max-h-[80vh] overflow-y-auto ${bodyWrapperClassName}`}
          >
            {body(onClose)}
          </div>

          {footer ? (
            <div
              className={`px-4 pt-4 pb-safe-bottom ${footerWrapperClassName}`}
            >
              {footer(onClose)}
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
