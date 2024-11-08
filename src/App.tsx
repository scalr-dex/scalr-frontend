import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import NotFound from 'pages/NotFound'
import Tasks from 'pages/Tasks'
import { ToastContainer } from 'react-toastify'
import useSetup from 'helpers/hooks/useSetup'
import BrowserInvite from 'pages/BrowserInvite'
import LeaderBoards from 'pages/Leaderboards'
import env from 'helpers/env'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from 'helpers/queryClient'
import AppStatus from 'type/AppStatus'
import SplashScreen from 'components/SplashScreen'
import { useAtomValue } from 'jotai'
import didOnboardAtom, { onboardedS2Atom } from 'helpers/atoms/UserStates'
import useWebSocketData from 'helpers/hooks/useWebSocketData'
import Loader from 'components/Loader'
import Main from 'pages/Main'
import { ErrorBoundary } from '@sentry/react'
import ErrorBoundaryFallback from 'components/ErrorBoundaryFallback'
import LoaderFullPage from 'components/LoaderFullPage'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'
import PerpDex from 'pages/PerpDex'
import { lazy, Suspense, useEffect, useMemo } from 'react'
import Modals from 'components/Modals'
import {
  createBrowserRouter,
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { useIntegration } from '@telegram-apps/react-router-integration'

const navigator = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
])

const Onboarding = lazy(() => import('pages/Onboarding'))

function AppInner({ socket }: { socket: WebSocket }) {
  useWebSocketData(socket)
  const [parent] = useAutoAnimate()
  const didOnboard = useAtomValue(didOnboardAtom)
  const onboardedS2 = useAtomValue(onboardedS2Atom)

  const onboarded = didOnboard && onboardedS2

  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={`${location.origin}/tonconnect-manifest.json`}
        actionsConfiguration={{
          twaReturnUrl: env.VITE_APP_BASE_LINK as `${string}://${string}`,
        }}
        uiPreferences={{ theme: THEME.DARK }}
      >
        <HashRouter>
          <div
            className="flex flex-col relative h-[100dvh] overflow-x-hidden max-w-prose text-white z-0"
            ref={parent}
          >
            <Routes>
              {didOnboard ? (
                <>
                  <Route path="/tasks" Component={Tasks} />
                  <Route path="/leaderboards" Component={LeaderBoards} />
                  <Route
                    path="/perp"
                    Component={() => (
                      <Suspense fallback={<Loader full />}>
                        <PerpDex />
                      </Suspense>
                    )}
                  />
                  <Route path="/" Component={Main} />
                </>
              ) : (
                <Route
                  path="/"
                  Component={() => (
                    <Suspense fallback={<LoaderFullPage />}>
                      <Onboarding />
                    </Suspense>
                  )}
                />
              )}

              <Route path="/404" Component={NotFound} />
            </Routes>
          </div>
          {onboarded ? <BottomTabNavigator /> : null}
          <ToastContainer
            draggable
            position="top-center"
            pauseOnHover
            pauseOnFocusLoss
            closeOnClick
            closeButton={false}
            autoClose={3000}
            theme="dark"
            toastClassName="!bg-tertiary !rounded-xl !w-[96dvw] !ml-[2dvw] !shadow-super !top-4 !font-semibold"
            draggableDirection="y"
            hideProgressBar
            limit={3}
            stacked
          />
          <Modals />
        </HashRouter>
      </TonConnectUIProvider>
    </QueryClientProvider>
  )
}

export default function () {
  const { appStatus, socket } = useSetup()

  if (appStatus === AppStatus.loading) return <SplashScreen />
  if (appStatus === AppStatus.isElse) return <BrowserInvite />

  if (socket)
    return (
      <ErrorBoundary fallback={ErrorBoundaryFallback}>
        <AppInner socket={socket} />
      </ErrorBoundary>
    )
  else return <SplashScreen />
}
