import backendKy from 'helpers/api/backendKy'
import { DiscoveryFeedItem } from 'type/Discovery'

export default function getDiscoveryFeed() {
  return backendKy().get('memecoins').json<DiscoveryFeedItem[]>()
}
