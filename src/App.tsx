import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import NotFound from 'pages/NotFound'
import Tasks from 'pages/Tasks'
import { ToastContainer } from 'react-toastify'
import { Router, Switch, Route } from 'wouter-preact'
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
import SturdyWebSocket from 'sturdy-websocket'
import { lazy, Suspense } from 'preact/compat'
import Loader from 'components/Loader'
import Main from 'pages/Main'

const Onboarding = lazy(() => import('pages/Onboarding'))

function AppInner({ socket }: { socket: SturdyWebSocket }) {
  useWebSocketData(socket)
  const [parent] = useAutoAnimate()
  const didOnboard = useAtomValue(didOnboardAtom)

  return (
    <SDKProvider debug={env.DEV} acceptCustomStyles>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div
            className="flex flex-col relative min-h-[90dvh] overflow-x-hidden my-4 container mx-auto max-w-prose text-white"
            ref={parent}
          >
            {didOnboard ? (
              <Switch>
                <Route path="/" component={Main} />
                <Route path="/tasks" component={Tasks} />
                <Route path="/leaderboards" component={LeaderBoards} />

                <Route component={NotFound} />
              </Switch>
            ) : (
              <Suspense fallback={<Loader full />}>
                <Onboarding />
              </Suspense>
            )}
          </div>
          {didOnboard ? <BottomTabNavigator /> : null}
          <ToastContainer
            draggable
            position="bottom-center"
            pauseOnHover
            pauseOnFocusLoss
            closeOnClick
            stacked
            closeButton={false}
            autoClose={3000}
            theme="dark"
            toastClassName="!bg-tertiary !rounded-xl !bottom-24 !w-[96dvw] !ml-[2dvw] !shadow-super"
            draggableDirection="x"
            hideProgressBar
            limit={1}
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

  if (socket) return <AppInner socket={socket} />
  else return <SplashScreen />
}
