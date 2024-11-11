import Tasks from 'pages/Tasks'
import useSetup from 'helpers/hooks/useSetup'
import BrowserInvite from 'pages/BrowserInvite'
import LeaderBoards from 'pages/Leaderboards'
import env from 'helpers/env'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from 'helpers/queryClient'
import AppStatus from 'type/AppStatus'
import SplashScreen from 'components/SplashScreen'
import useWebSocketData from 'helpers/hooks/useWebSocketData'
import Main from 'pages/Main'
import { ErrorBoundary } from '@sentry/react'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'
import PerpDex from 'pages/PerpDex'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Onboarding from 'pages/Onboarding'
import Root from 'pages/Root'
import LoaderFullPage from 'components/LoaderFullPage'

const navigator = createHashRouter([
  {
    element: <Root />,
    ErrorBoundary: ErrorBoundary,
    children: [
      { path: 'main', element: <Main /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'leaderboards', element: <LeaderBoards /> },
      { path: 'perp', element: <PerpDex /> },
      { path: 'onboarding', element: <Onboarding /> },
      { path: '*', element: <Main /> },
    ],
  },
])

function AppInner({ socket }: { socket: WebSocket }) {
  useWebSocketData(socket)

  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={`${location.origin}/tonconnect-manifest.json`}
        actionsConfiguration={{
          twaReturnUrl: env.VITE_APP_BASE_LINK as `${string}://${string}`,
        }}
        uiPreferences={{ theme: THEME.DARK }}
      >
        <RouterProvider
          router={navigator}
          future={{
            v7_startTransition: true,
          }}
          fallbackElement={<LoaderFullPage />}
        />
      </TonConnectUIProvider>
    </QueryClientProvider>
  )
}

export default function () {
  const { appStatus, socket } = useSetup()

  if (appStatus === AppStatus.loading) return <SplashScreen />
  if (appStatus === AppStatus.isElse) return <BrowserInvite />

  if (socket) return <AppInner socket={socket} />
  else return <SplashScreen />
}
