import DiscoveryFeed from 'components/DiscoveryPage/DiscoveryFeed'
import TabSelect from 'componentsPage/TabSelect'
import FooterSafeArea from 'components/FooterSafeArea'
import { Header3 } from 'components/Text'

export default function () {
  return (
    <div className="flex flex-col mt-2 px-4 gap-y-8 items-center">
      <Header3 className="text-center">Discovery</Header3>

      <div className="flex flex-col gap-y-6 w-full">
        <TabSelect />
        <DiscoveryFeed />
      </div>

      <FooterSafeArea />
    </div>
  )
}
