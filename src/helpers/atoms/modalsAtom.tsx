import DailyStreakModal from 'components/Modals/DailyStreakModal'
import EnergyInfoModal from 'components/Modals/EnergyInfoModal'
import { atom } from 'jotai'
import { JSX } from 'preact/jsx-runtime'
import { DefaultModalProps } from 'type/Props'

export enum AvailableModals {
  betEnergyModal,
  dailyStreakModal,
}

export const modalToComponent: Record<
  AvailableModals,
  (props: DefaultModalProps) => JSX.Element
> = {
  [AvailableModals.betEnergyModal]: EnergyInfoModal,
  [AvailableModals.dailyStreakModal]: DailyStreakModal,
}

export default atom<AvailableModals | null>(null)
