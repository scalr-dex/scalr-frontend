import { BodyText } from 'components/Text'

export default function ({
  name,
  player2,
}: {
  name: string
  player2?: boolean | undefined
}) {
  const gradient = player2
    ? 'from-[#6CA7FF] to-[#0B54E3]'
    : 'from-[#B797FC] to-[#5F3CC4]'

  return (
    <div
      className={`absolute bottom-0 z-10 flex items-center justify-center p-4 rounded-full border-4 border-white-16 bg-gradient-to-br ${gradient}`}
    >
      <BodyText>{name}</BodyText>
    </div>
  )
}
