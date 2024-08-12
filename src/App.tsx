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
import Leaderboards from 'pages/Leaderboards'
import env from 'helpers/env'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from 'helpers/queryClient'
import AppStatus from 'type/AppStatus'
import SplashScreen from 'components/SplashScreen'

export default function () {
  const { appStatus, socket } = useSetup()
  const [parent] = useAutoAnimate()

  if (appStatus === AppStatus.loading || !socket) return <SplashScreen />
  if (appStatus === AppStatus.isElse) return <BrowserInvite />

  return (
    <SDKProvider debug={env.DEV}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div
            className="flex flex-col relative min-h-[90dvh] overflow-x-hidden my-2 container mx-auto max-w-prose text-white"
            ref={parent}
          >
            <Switch>
              <Route path="/" component={() => <Main socket={socket} />} />
              <Route path="/tasks" component={Tasks} />
              <Route path="/leaderboards" component={Leaderboards} />

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
            closeButton={false}
            theme="dark"
            hideProgressBar
            draggableDirection="y"
          />
        </Router>
      </QueryClientProvider>
    </SDKProvider>
  )
}
