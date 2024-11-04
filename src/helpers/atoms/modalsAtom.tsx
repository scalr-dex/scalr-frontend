import BattleTicketsModal from 'components/Modals/BattleTicketsModal'
import DailyStreakModal from 'components/Modals/DailyStreakModal'
import EnergyInfoModal from 'components/Modals/EnergyInfoModal'
import EnergyZeroModal from 'components/Modals/EnergyZeroModal'
import InviteFriendsModal from 'components/Modals/InviteFriendsModal'
import LeaderBoardsFaqModal from 'components/Modals/LeaderBoardsFaqModal'
import PartnershipModal from 'components/Modals/PerpDex/PartnershipModal'
import PerpDexInfoModal from 'components/Modals/PerpDex/PerpDexInfoModal'
import ScalrAirdropModal from 'components/Modals/PerpDex/ScalrAirdropModal'
import TriangleAccelerated from 'components/Modals/PerpDex/TriangleAccelerated'
import { atom } from 'jotai'

export enum AvailableModals {
  betEnergyInfo,
  betEnergyZero,
  dailyStreak,
  battleTickets,
  inviteFriends,
  perpInfo,
  airdropInfo,
  partnershipInfo,
  triangleAccelerated,
  leaderBoardInfo,
}

export const modalToComponent = {
  [AvailableModals.betEnergyInfo]: { component: EnergyInfoModal },
  [AvailableModals.betEnergyZero]: { component: EnergyZeroModal },
  [AvailableModals.dailyStreak]: { component: DailyStreakModal },
  [AvailableModals.battleTickets]: { component: BattleTicketsModal },
  [AvailableModals.inviteFriends]: { component: InviteFriendsModal },
  [AvailableModals.perpInfo]: { component: PerpDexInfoModal },
  [AvailableModals.airdropInfo]: { component: ScalrAirdropModal },
  [AvailableModals.partnershipInfo]: { component: PartnershipModal },
  [AvailableModals.triangleAccelerated]: { component: TriangleAccelerated },
  [AvailableModals.leaderBoardInfo]: { component: LeaderBoardsFaqModal },
}

export default atom<AvailableModals | null>(null)
