import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import FooterSafeArea from 'components/FooterSafeArea'
import BetBlock from 'components/Main/BetBlock'
import Season2Modal from 'components/Modals/Season2Modal'
import { onboardSeason2, showDailyStreakModal } from 'helpers/atoms/UserStates'
import SeasonStats from 'components/Modals/SeasonStats'
import { useState } from 'preact/hooks'
import useImagePreloader from 'helpers/hooks/useImagePreload'
import LoaderFullPage from 'components/LoaderFullPage'

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

const mainPreloadList = ['img/season2.png', 'img/utya-win.png']

export default function () {
  const setDailyStreakModal = useSetAtom(showDailyStreakModal)
  const [onboardedS2, setOnboardedS2] = useAtom(onboardSeason2)
  const [showS2Modal, setShowS2Modal] = useState(onboardedS2)
  const [openStatsModal, setOpenStatsModal] = useState(false)
  const { imagesPreloaded } = useImagePreloader(mainPreloadList)

  if (!imagesPreloaded) return <LoaderFullPage />

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
        onCloseCallback={() => {
          setOnboardedS2(true)
          setTimeout(() => setDailyStreakModal(true), 200)
        }}
      />
    </div>
  )
}
