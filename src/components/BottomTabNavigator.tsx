import MainSquare from 'components/icons/MainSquare'
import { NavLink } from 'react-router-dom'
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
  { path: 'perp', component: <DollarCoin /> },
]

export default function () {
  return (
    <footer className="fixed inset-x-0 bottom-safe-bottom flex justify-center items-center pointer-events-none">
      <div className="w-fit shadow-super flex flex-row gap-x-8 items-center justify-center px-8 py-3 border border-white-16 bg-primary text-gray-500 rounded-3xl pointer-events-auto">
        {buttons.map(({ path, component }, index) => (
          <NavLink
            onClick={() => {
              trackNavigation(path)
            }}
            to={path}
            key={'nav-link-' + index}
            className={({ isActive }) =>
              `w-6 h-6 text-opacity-50 ${isActive && 'text-white'} hover:text-gray-300 transition-colors hover:drop-shadow`
            }
          >
            {component}
          </NavLink>
        ))}
      </div>
    </footer>
  )
}
