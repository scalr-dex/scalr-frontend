import { Dispatch, StateUpdater, useEffect } from 'preact/hooks'

export default function (setTime: Dispatch<StateUpdater<number>>, step = 1) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])
}
