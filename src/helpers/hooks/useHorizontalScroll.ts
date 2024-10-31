import { useEffect } from 'preact/hooks'

export default function (current: HTMLDivElement | null) {
  useEffect(() => {
    if (!current) return

    const callback = (e: WheelEvent) => {
      e.preventDefault()
      current.scrollLeft += e.deltaY
    }

    current.addEventListener('wheel', callback)

    return () => {
      current.removeEventListener('wheel', callback)
    }
  }, [current])
}
