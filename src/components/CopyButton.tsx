import ButtonTypes from 'type/Button'
import CheckMark from 'components/icons/CheckMark'
import Copy from 'components/icons/Copy'
import Button from 'components/Button'
import { useCallback, useState } from 'preact/hooks'
import { ClassNameProp } from 'type/Props'

export default function ({
  textToCopy,
  onlyIcon,
  className,
}: {
  textToCopy: string
  onlyIcon?: boolean | undefined
} & ClassNameProp) {
  const [copied, setCopied] = useState(false)

  const content = onlyIcon ? null : copied ? 'Copied' : 'Copy link'

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [textToCopy])

  return (
    <Button
      onClick={onCopy}
      buttonType={copied ? ButtonTypes.success : ButtonTypes.secondary}
      className={className}
      rounded="rounded-full"
      iconRight={copied ? <CheckMark /> : <Copy />}
    >
      {content}
    </Button>
  )
}
