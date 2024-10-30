import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtom, useAtomValue } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import FooterSafeArea from 'components/FooterSafeArea'
import BetBlock from 'components/Main/BetBlock'
import Season2Modal from 'components/Modals/Season2Modal'
import { onboardSeason2 } from 'helpers/atoms/UserStates'
import SeasonStats from 'components/Modals/SeasonStats'
import { useState } from 'preact/hooks'

function InnerMain() {
  const data = useAtomValue(priceHistoryAtom)

  const lastIndex = data.length - 1
  const lastValue = data[lastIndex]?.value

  const loading = !data.length

  return (
    <>
      <TokenPrice price={lastValue?.[1]} />
      <Chart data={data} loading={loading} />
      <BetBlock loading={loading} roundStart={lastValue} />
      <FooterSafeArea />
    </>
  )
}

export default function () {
  const [showS2Modal, setShowS2Modal] = useAtom(onboardSeason2)
  const [openStatsModal, setOpenStatsModal] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <InnerMain />

      <Season2Modal
        showModal={showS2Modal}
        setShowModal={setShowS2Modal}
        onCloseCallback={() => setTimeout(() => setOpenStatsModal(true), 200)}
      />
      <SeasonStats
        showModal={openStatsModal}
        setShowModal={setOpenStatsModal}
      />
    </div>
  )
}
