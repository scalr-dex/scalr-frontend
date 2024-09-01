import ButtonTypes, { buttonClassNames } from 'type/Button'
import { BodyText } from 'components/Text'

export default function () {
  return (
    <div className="flex flex-col gap-y-2 px-4 text-xl text-center w-screen h-screen items-center justify-center text-white">
      <BodyText>Oooh, an error occurred 🥺</BodyText>
      <BodyText>We're on it 👨‍💻</BodyText>
      <button
        onClick={() => window.location.reload()}
        className={`flex flex-row gap-x-2 items-center justify-center w-fit rounded-lg p-4 transition-colors font-semibold ${buttonClassNames()[ButtonTypes.accent]}`}
      >
        Reload app
      </button>
    </div>
  )
}
