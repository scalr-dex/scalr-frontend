import BottomTabNavigator from 'components/BottomTabNavigator'
import Modals from 'components/Modals'
import { AnimatePresence, motion } from 'framer-motion'
import { didOnboardAtom, onboardedS2Atom } from 'helpers/atoms/UserStates'
import { useAtomValue } from 'jotai'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const motionVariants = {
  initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
    x: direction === 'backward' ? '-100%' : '100%',
    transition: {
      type: 'spring',
      duration: 0.2,
      delay: 0,
    },
  }),
  in: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 1,
      delay: 0,
    },
  },
  out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
    x: direction === 'backward' ? '100%' : '-100%',
    transition: {
      type: 'spring',
      duration: 0.2,
      delay: 0,
    },
  }),
}

export default function () {
  const location = useLocation()
  const didOnboard = useAtomValue(didOnboardAtom)
  const onboardedS2 = useAtomValue(onboardedS2Atom)

  const onboarded = didOnboard && onboardedS2

  return (
    <div className="flex flex-col relative h-[100dvh] text-white z-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          custom={{ direction: 'forward' }}
          initial="initial"
          animate="in"
          exit="exit"
          variants={motionVariants}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

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
    </div>
  )
}
