import { AvailableChains } from 'type/ChainLogos'

export interface DiscoveryTab {
  label: string
  isActive?: boolean
  location?: string
}

export interface DiscoveryFeedItem {
  id: number
  name: string
  ticker: string
  chain: AvailableChains
  market_cap: number
  liquidity: number
  one_hour_volume: number
  one_hour_txs: number
  holders: number
  creation_date: string
  blue_chip_risk: string
  rugpull_risk: string
  kol_wallets: number
  smart_wallets: number
  price: number
  price_change_1h: number
  contract_address: string
  image_url: string
}
