import { Dispatch, SetStateAction, useEffect } from 'react'

export default function (setTime: Dispatch<SetStateAction<number>>, step = 1) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])
}
