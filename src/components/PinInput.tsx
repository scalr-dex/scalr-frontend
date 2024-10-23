import handleError from 'helpers/handleError'
import { useCallback, useState } from 'preact/hooks'
import { PinField } from 'react-pin-field'
import { BodyText } from 'components/Text'
import { ClassName } from 'type/Props'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function ({
  onFilledCallback,
  length = 4,
  boxSize = 'w-8 h-10',
  fontSize = 'text-2xl',
}: {
  onFilledCallback: (code: string) => void | Promise<void>
  length?: number
  boxSize?: ClassName
  fontSize?: ClassName
}) {
  const [parent] = useAutoAnimate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onComplete = useCallback(
    async (code: string) => {
      try {
        setLoading(true)
        await onFilledCallback(code)
      } catch (e) {
        handleError({ e })
        setError('Wrong code or already used')
      } finally {
        setLoading(false)
      }
    },
    [onFilledCallback]
  )

  return (
    <div className="flex flex-col gap-y-3 items-center" ref={parent}>
      <div className="flex flex-row gap-x-1">
        <PinField
          disabled={loading}
          onChange={() => setError('')}
          autoFocus
          length={length}
          className={`${boxSize} ${fontSize} z-10 outline-none bg-tertiary border border-transparent focus:border-white-16 aria-busy:border-error disabled:opacity-50 uppercase transition-colors rounded-lg text-center leading-7 font-bold aria-busy:text-error`}
          aria-busy={!!error}
          autoCapitalize="on"
          onComplete={onComplete}
        />
      </div>
      {error ? (
        <BodyText className="text-sm text-error">{error}</BodyText>
      ) : null}
    </div>
  )
}
