import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import NotFound from 'pages/NotFound'
import Tasks from 'pages/Tasks'
import { ToastContainer } from 'react-toastify'
import { Router, Switch, Route, Redirect } from 'wouter-preact'
import useSetup from 'helpers/hooks/useSetup'
import BrowserInvite from 'pages/BrowserInvite'
import LeaderBoards from 'pages/Leaderboards'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from 'helpers/queryClient'
import AppStatus from 'type/AppStatus'
import SplashScreen from 'components/SplashScreen'
import { useAtomValue } from 'jotai'
import { didOnboardAtom } from 'helpers/atoms/UserStates'
import useWebSocketData from 'helpers/hooks/useWebSocketData'
import { lazy, Suspense } from 'preact/compat'
import Loader from 'components/Loader'
import Main from 'pages/Main'
import { ErrorBoundary } from '@sentry/react'
import ErrorBoundaryFallback from 'components/ErrorBoundaryFallback'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import LoaderFullPage from 'components/LoaderFullPage'
import BattleLobby from 'pages/BattleLobby'
import BattleChart from 'pages/BattleChart'
import BattleVersus from 'pages/BattleVersus'

const Onboarding = lazy(() => import('pages/Onboarding'))
const Airdrop = lazy(() => import('pages/Airdrop'))

function AppInner({ socket }: { socket: WebSocket }) {
  useWebSocketData(socket)
  const [parent] = useAutoAnimate()
  const didOnboard = useAtomValue(didOnboardAtom)

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <div
          className="flex flex-col relative min-h-screen overflow-x-hidden max-w-prose pt-safe-top pb-safe-bottom text-white"
          ref={parent}
        >
          <Switch>
            {didOnboard ? (
              <>
                <Route path="/tasks" component={Tasks} />
                <Route path="/leaderboards" component={LeaderBoards} />
                <Route
                  path="/airdrop"
                  component={() => (
                    <Suspense fallback={<Loader full />}>
                      <Airdrop />
                    </Suspense>
                  )}
                />
                <Route path="/battle/chart" component={BattleChart} />
                <Route path="/battle/versus" component={BattleVersus} />
                <Route
                  path="/battle/lobby/:code?"
                  component={({ params }) => <BattleLobby {...params} />}
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
        <BottomTabNavigator />
        <ToastContainer
          draggable
          position="top-center"
          pauseOnHover
          pauseOnFocusLoss
          closeOnClick
          closeButton={false}
          autoClose={3000}
          theme="dark"
          toastClassName="!bg-tertiary !rounded-xl !w-[96dvw] !ml-[2dvw] !shadow-super !top-4"
          draggableDirection="x"
          hideProgressBar
          limit={1}
        />
      </Router>
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
