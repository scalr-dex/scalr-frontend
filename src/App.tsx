import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import Main from 'pages/Main'
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
import Onboarding from 'components/Onboarding'
import { useAtomValue } from 'jotai'
import didOnboardAtom from 'helpers/atoms/UserStates'
import useWebSocketData from 'helpers/hooks/useWebSocketData'

function AppInner({ socket }: { socket: WebSocket }) {
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
            <Switch>
              {didOnboard ? (
                <>
                  <Route path="/" component={Main} />
                  <Route path="/tasks" component={Tasks} />
                  <Route path="/leaderboards" component={LeaderBoards} />
                </>
              ) : (
                <Onboarding />
              )}

              <Route component={NotFound} />
            </Switch>
          </div>
          <BottomTabNavigator />
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
            hideProgressBar
            draggableDirection="y"
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
