import { useAutoAnimate } from '@formkit/auto-animate/react'
import BottomTabNavigator from 'components/BottomTabNavigator'
import Modals from 'components/Modals'
import { didOnboardAtom, onboardedS2Atom } from 'helpers/atoms/UserStates'
import { useAtomValue } from 'jotai'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function () {
  const [parent] = useAutoAnimate()
  const didOnboard = useAtomValue(didOnboardAtom)
  const onboardedS2 = useAtomValue(onboardedS2Atom)

  const onboarded = didOnboard && onboardedS2

  return (
    <div
      className="flex flex-col relative h-[100dvh] overflow-x-hidden max-w-prose text-white z-0"
      ref={parent}
    >
      <Outlet />
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
      <ScrollRestoration />
    </div>
  )
}
