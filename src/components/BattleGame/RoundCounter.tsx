import { BodyText, Header3 } from 'components/Text'

const minRounds = 3

export default function ({ currentRound }: { currentRound: number }) {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <Header3>Round</Header3>
      <div className="flex flex-row items-center gap-x-2">
        {[...Array(minRounds)].map((_, index) => (
          <div
            className={`flex items-center justify-center h-6 w-6 aspect-square rounded-full ${index === currentRound ? 'bg-white' : 'bg-white/50'}`}
            key={`battle-round-${index}`}
          >
            <BodyText className="font-semibold text-center text-black align-baseline">
              {index + 1}
            </BodyText>
          </div>
        ))}
      </div>
    </div>
  )
}
