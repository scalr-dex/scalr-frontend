import { useQuery } from '@tanstack/react-query'
import getDiscoveryFeed from 'helpers/api/discovery'
import DiscoveryItem from 'components/DiscoveryPage/DiscoveryItem'
import LoaderFullPage from 'components/LoaderFullPage'

export default function DiscoveryFeed() {
  const { data, status } = useQuery({
    queryKey: ['discovery-feed'],
    queryFn: getDiscoveryFeed,
  })

  if (!data || status !== 'success') {
    return <LoaderFullPage />
  }

  return (
    <div className="flex flex-col gap-y-6">
      {data.map((item) => (
        <DiscoveryItem key={item.id} {...item} />
      ))}
    </div>
  )
}
