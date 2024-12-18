import HyperliquidIcon from 'components/icons/networks/HyperliquidIcon'
import SolanaIcon from 'components/icons/networks/SolanaIcon'
import TonNetworkIcon from 'components/icons/networks/TonNetworkIcon'

export const chainToLogo = {
  solana: <SolanaIcon />,
  hyperliquid: <HyperliquidIcon />,
  ton: <TonNetworkIcon />,
}

export type AvailableChains = keyof typeof chainToLogo
