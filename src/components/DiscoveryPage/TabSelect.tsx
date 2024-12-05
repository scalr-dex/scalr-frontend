import { BodyText } from 'components/Text'
import { DiscoveryTab } from 'type/Discovery'

const tabs: DiscoveryTab[] = [
  {
    label: '🔥 Trending',
    isActive: true,
  },
  {
    label: 'Next Gem',
  },
  {
    label: 'New',
  },
  {
    label: 'Smart/KOL',
  },
]

export default function TabSelect() {
  return (
    <div className="flex items-center justify-between w-full font-semibold">
      {tabs.map(({ label, isActive }) => (
        <BodyText
          className={`${isActive ? 'text-white' : 'text-white/50'} cursor-pointer`}
          key={label}
        >
          {label}
        </BodyText>
      ))}
    </div>
  )
}
