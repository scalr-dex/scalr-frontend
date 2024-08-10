import MainSquare from 'components/icons/MainSquare'
import { useLocation } from 'wouter-preact'
import { useAtomValue } from 'jotai'
import didOnboardAtom from 'helpers/atoms/UserStates'
import Cup from 'components/icons/Cup'
import Gift from 'components/icons/Gift'
import { useHapticFeedback } from '@telegram-apps/sdk-react'

const buttons = [
  { path: '/', component: <MainSquare /> },
  { path: 'tasks', component: <Cup /> },
  { path: 'leaderboards', component: <Gift /> },
]

export default function () {
  const haptic = useHapticFeedback()
  const didOnboard = useAtomValue(didOnboardAtom)
  const [location, setLocation] = useLocation()

  if (!didOnboard) return null

  const latest = location.split('/')[1] || '/'

  return (
    <div className="sticky flex justify-center items-center bottom-3 pointer-events-none">
      <div className="w-fit shadow-super flex flex-row gap-x-8 items-center justify-center px-8 py-3 border border-white-16 bg-primary text-gray-500 rounded-3xl">
        {buttons.map(({ path, component }, index) => (
          <button
            onClick={() => {
              setLocation(path)
              haptic.impactOccurred('light')
            }}
            className={`pointer-events-auto w-6 h-6 ${latest.match(path) ? 'text-white' : 'text-opacity-50'} hover:text-gray-300 transition-colors hover:drop-shadow`}
            key={'nav-link-' + index}
          >
            {component}
          </button>
        ))}
      </div>
    </div>
  )
}
