import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import Profile from 'pages/Profile'
import Tasks from 'pages/Tasks'
import { ToastContainer } from 'react-toastify'
import { Router, Switch, Route } from 'wouter-preact'

export default function () {
  const [parent] = useAutoAnimate()

  return (
    <Router>
      <div
        className="relative min-h-[94dvh] flex flex-col pt-1 container mx-auto max-w-prose text-white"
        ref={parent}
      >
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/profile" component={Profile} />
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
  )
}
