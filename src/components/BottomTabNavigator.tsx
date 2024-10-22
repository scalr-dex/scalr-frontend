import MainSquare from 'components/icons/MainSquare'
import { useLocation } from 'wouter-preact'
import Cup from 'components/icons/Cup'
import DollarCoin from 'components/icons/DollarCoin'
import { trackNavigation } from 'helpers/api/analytics'
import GiftWithNotifications from 'components/icons/GiftWithNotifications'

const buttons = [
  { path: '/', component: <MainSquare /> },
  { path: 'leaderboards', component: <Cup /> },
  {
    path: 'tasks',
    component: <GiftWithNotifications />,
  },
  { path: 'airdrop', component: <DollarCoin /> },
  { path: 'perp', component: <span>🪙</span> },
]

export default function () {
  const [location, setLocation] = useLocation()

  const latest = location.split('/')[1] || '/'

  return (
    <footer className="fixed inset-x-0 bottom-safe-bottom flex justify-center items-center pointer-events-none">
      <div className="w-fit shadow-super flex flex-row gap-x-8 items-center justify-center px-8 py-3 border border-white-16 bg-primary text-gray-500 rounded-3xl">
        {buttons.map(({ path, component }, index) => (
          <button
            onClick={() => {
              setLocation(path)
              trackNavigation(path)
            }}
            className={`pointer-events-auto w-6 h-6 ${latest.match(path) ? 'text-white' : 'text-opacity-50'} hover:text-gray-300 transition-colors hover:drop-shadow`}
            key={'nav-link-' + index}
          >
            {component}
          </button>
        ))}
      </div>
    </footer>
  )
}
