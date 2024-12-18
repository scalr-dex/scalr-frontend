import backendKy from 'helpers/api/backendKy'

const marketController = backendKy({ prefixUrlAppend: '/store' })

interface MarketEntity {
  id: number
  name: 'Reward' | 'Points' | 'Subscription'
  price: number
  amount: number
  payload: string
  buy_link: string
}

export function getMarketEntries() {
  return backendKy().get('store').json<MarketEntity[]>()
}

export function buyEntry(id: number) {
  return marketController.get(`purchase/${id}`)
}
