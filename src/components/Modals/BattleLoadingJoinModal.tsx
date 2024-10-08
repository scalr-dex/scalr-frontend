import { Header3 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import { DefaultModalProps } from 'type/Props'
import Loader from 'components/Loader'

function ModalBody() {
  return (
    <>
      <Loader size={64} className="self-center" />
      <Header3 className="text-center">Joining room</Header3>
    </>
  )
}

export default function (props: DefaultModalProps) {
  return <DefaultModal {...props} body={ModalBody} />
}
