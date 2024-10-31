import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import NotFound from 'pages/NotFound'
import Tasks from 'pages/Tasks'
import { ToastContainer } from 'react-toastify'
import { Router, Switch, Route, Redirect } from 'wouter-preact'
import { SDKProvider } from '@telegram-apps/sdk-react'
import useSetup from 'helpers/hooks/useSetup'
import BrowserInvite from 'pages/BrowserInvite'
import LeaderBoards from 'pages/Leaderboards'
import env from 'helpers/env'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from 'helpers/queryClient'
import AppStatus from 'type/AppStatus'
import SplashScreen from 'components/SplashScreen'
import { useAtomValue } from 'jotai'
import didOnboardAtom from 'helpers/atoms/UserStates'
import useWebSocketData from 'helpers/hooks/useWebSocketData'
import { lazy, Suspense } from 'preact/compat'
import Loader from 'components/Loader'
import Main from 'pages/Main'
import { ErrorBoundary } from '@sentry/react'
import ErrorBoundaryFallback from 'components/ErrorBoundaryFallback'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import LoaderFullPage from 'components/LoaderFullPage'
import { THEME, TonConnectUIProvider } from 'lib/ui-react'
import PerpDex from 'pages/PerpDex'

const Onboarding = lazy(() => import('pages/Onboarding'))

function AppInner({ socket }: { socket: WebSocket }) {
  useWebSocketData(socket)
  const [parent] = useAutoAnimate()
  const didOnboard = useAtomValue(didOnboardAtom)

  return (
    <SDKProvider debug={env.DEV} acceptCustomStyles>
      <QueryClientProvider client={queryClient}>
        <Router hook={useHashLocation}>
          <div
            className="flex flex-col relative h-[100dvh] overflow-x-hidden max-w-prose text-white z-0"
            ref={parent}
          >
            <Switch>
              {didOnboard ? (
                <>
                  <Route path="/tasks" component={Tasks} />
                  <Route path="/leaderboards" component={LeaderBoards} />
                  <Route
                    path="/perp"
                    component={() => (
                      <TonConnectUIProvider
                        manifestUrl={`${location.origin}/tonconnect-manifest.json`}
                        actionsConfiguration={{
                          twaReturnUrl: env.VITE_APP_BASE_LINK,
                        }}
                        uiPreferences={{ theme: THEME.DARK }}
                      >
                        <Suspense fallback={<Loader full />}>
                          <PerpDex />
                        </Suspense>
                      </TonConnectUIProvider>
                    )}
                  />
                  <Route path="/" component={Main} />
                </>
              ) : (
                <Route
                  path="/"
                  component={() => (
                    <Suspense fallback={<LoaderFullPage />}>
                      <Onboarding />
                    </Suspense>
                  )}
                />
              )}

              <Redirect to="/" />
              <Route path="/404" component={NotFound} />
            </Switch>
          </div>
          {didOnboard ? <BottomTabNavigator /> : null}
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
        </Router>
      </QueryClientProvider>
    </SDKProvider>
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
