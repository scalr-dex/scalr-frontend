import Button from 'components/Button'
import CardFilled from 'components/CardFilled'
import BattlesLogo from 'components/icons/BattlesLogo'
import BattleSearchModal from 'components/Modals/BattleSearchModal'
import { BodyText, Header3 } from 'components/Text'
import formatUSA from 'helpers/formatters/formatUSA'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-full px-4">
      <BattlesLogo />
      <CardFilled className="gap-y-5">
        <div>
          <BodyText className="font-semibold text-white/50">
            My crystals balance
          </BodyText>
          <Header3>{formatUSA(10000)}</Header3>
        </div>
        <div className="flex flex-row gap-x-2">
          <Button buttonType={ButtonTypes.outline}>100,000</Button>
          <Button
            buttonType={ButtonTypes.accent}
            onClick={() => setModalOpen(true)}
          >
            500,000
          </Button>
          <Button buttonType={ButtonTypes.outline}>1,000,000</Button>
        </div>
        <BodyText className="font-semibold">Topup crystals 🔗</BodyText>
      </CardFilled>
      <BattleSearchModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
