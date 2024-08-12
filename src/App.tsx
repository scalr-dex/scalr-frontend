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

export default function () {
  const isTma = useSetup()
  const [parent] = useAutoAnimate()

  if (!isTma) return <BrowserInvite />

  return (
    <SDKProvider debug={env.DEV}>
      <Router>
        <div
          className="relative min-h-[94dvh] overflow-x-hidden flex flex-col pt-1 container mx-auto max-w-prose text-white"
          ref={parent}
        >
          <Switch>
            <Route path="/" component={Main} />
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
    </SDKProvider>
  )
}
