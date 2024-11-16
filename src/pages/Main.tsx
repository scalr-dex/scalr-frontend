import Chart from 'components/Main/Chart'
import TokenPrice from 'components/Main/TokenPrice'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import FooterSafeArea from 'components/FooterSafeArea'
import BetBlock from 'components/Main/BetBlock'
import Season2Modal from 'components/Modals/Season2Modal'
import {
  onboardedS2Atom,
  didSeeSpecialOfferAtom,
} from 'helpers/atoms/UserStates'
import SeasonStats from 'components/Modals/SeasonStats'
import { useEffect, useState } from 'react'
import useImagePreloader from 'helpers/hooks/useImagePreload'
import LoaderFullPage from 'components/LoaderFullPage'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import DailyStreakModal from 'components/Modals/DailyStreakModal'
import useTimeToDailyStreak from 'helpers/hooks/useTimeToDailyStreak'

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
  const { disabled: dailyStreakDisabled } = useTimeToDailyStreak(false, true)
  const setModal = useSetAtom(modalsAtom)
  const didSeeSpecialOffer = useAtomValue(didSeeSpecialOfferAtom)
  const [onboardedS2, setOnboardedS2] = useAtom(onboardedS2Atom)
  const [showS2Modal, setShowS2Modal] = useState(!onboardedS2)
  const [showDailyStreak, setShowDailyStreak] = useState(false)
  const [openStatsModal, setOpenStatsModal] = useState(false)
  const { imagesPreloaded } = useImagePreloader(mainPreloadList)

  useEffect(() => {
    if (!onboardedS2 || didSeeSpecialOffer || !dailyStreakDisabled) return

    setModal(AvailableModals.specialOffer)
  }, [dailyStreakDisabled, didSeeSpecialOffer, onboardedS2, setModal])

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
          setTimeout(() => setShowDailyStreak(true), 200)
        }}
      />
      <DailyStreakModal
        showModal={showDailyStreak}
        setShowModal={setShowDailyStreak}
        onCloseCallback={() => {
          setTimeout(() => setOnboardedS2(true), 200)
        }}
      />
    </div>
  )
}
