import MainSquare from 'components/icons/MainSquare'
import { useLocation } from 'wouter'
import Cup from 'components/icons/Cup'
import DollarCoin from 'components/icons/DollarCoin'
import { trackNavigation } from 'helpers/api/analytics'
import GiftWithNotifications from 'components/icons/GiftWithNotifications'
import ShopHouse from 'components/icons/ShopHouse'
import Globe from 'components/icons/Globe'

const buttons = [
  { path: '/', component: <MainSquare /> },
  { path: 'leaderboards', component: <Cup /> },
  {
    path: 'tasks',
    component: <GiftWithNotifications />,
  },
  { path: 'perp', component: <DollarCoin /> },
  { path: 'market', component: <ShopHouse /> },
  { path: 'discovery', component: <Globe /> },
]

export default function () {
  const [location, setLocation] = useLocation()

  const latest = location.split('/')[1] || '/'

  return (
    <footer className="fixed inset-x-0 bottom-safe-bottom flex justify-center items-center pointer-events-none">
      <div className="w-fit shadow-super flex flex-row gap-x-8 items-center justify-center px-8 py-3 border border-white-16 bg-primary text-gray-500 rounded-3xl pointer-events-auto">
        {buttons.map(({ path, component }, index) => (
          <button
            onClick={() => {
              setLocation(path)
              trackNavigation(path)
              setTimeout(
                () =>
                  document
                    .getElementById('scrollable')
                    ?.scrollTo({ top: 0, behavior: 'smooth' }),
                400
              )
            }}
            className={`w-6 h-6 ${latest.match(path) ? 'text-white' : 'text-opacity-50'} hover:text-gray-300 transition-colors hover:drop-shadow`}
            key={'nav-link-' + index}
          >
            {component}
          </button>
        ))}
      </div>
    </footer>
  )
}
