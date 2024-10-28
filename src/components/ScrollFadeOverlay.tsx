export default function ({ top }: { top?: boolean }) {
  const positionStyle = top
    ? 'top-0 bg-gradient-to-b'
    : 'bottom-0 bg-gradient-to-t'

  return (
    <div
      className={`w-full min-h-4 h-4 z-10 sticky from-secondary ${positionStyle}`}
    />
  )
}
