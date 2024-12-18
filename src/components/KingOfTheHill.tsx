import ButtonTypes from 'type/Button'
import Button from 'components/Button'
import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import { ClientKing } from 'type/LeaderBoardResponse'
import { AccentText, BodyText } from 'components/Text'
import { openUserChat } from 'helpers/safeOpenLink'
import handleStarPayment from 'helpers/telegram/handleStarPayment'
import Timer from 'components/Main/Timer'
import { useCallback, useState } from 'react'
import handleError from 'helpers/handleError'
import { useAtomValue, useSetAtom } from 'jotai'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import UserAtom from 'helpers/atoms/UserAtom'
import { kingMessageAtom } from 'helpers/atoms/UserStates'
import { invalidateQuery, QueryKeys } from 'helpers/queryClient'

export default function KingOfTheHill(
  props: { king: ClientKing | undefined } & { loading?: boolean }
) {
  const message = useAtomValue(kingMessageAtom)
  const user = useAtomValue(UserAtom)
  const [loading, setLoading] = useState(false)
  const setModal = useSetAtom(modalsAtom)

  const isKing = user?.telegramId === props.king?.telegram_id

  const claimThrone = useCallback(
    async (buyLink: string) => {
      try {
        setLoading(true)
        await handleStarPayment({
          link: buyLink,
          onSuccess: () => {
            setModal(AvailableModals.kingOfTheHill)
          },
        })
        await invalidateQuery(QueryKeys.leaderBoard)
      } catch (e) {
        handleError({ e })
      } finally {
        setLoading(false)
      }
    },
    [setModal]
  )

  if (!props.king || props.loading)
    return (
      <div className="rounded-2xl bg-primary-dark drop-shadow-glow-accent h-32" />
    )

  const { userPfp, name, started, username, buyData } = props.king

  return (
    <div className="p-4 rounded-2xl bg-primary-dark flex flex-col gap-y-6 drop-shadow-glow-accent">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-x-3 items-center cursor-pointer">
          <ImgWithComponentFallback imgUrl={userPfp} name={String(name)} />
          <div className="flex flex-col">
            <AccentText
              className="font-semibold truncate max-w-28"
              onClick={() => openUserChat(username)}
            >
              {name}
            </AccentText>
            <BodyText className="text-sm text-white/50">
              {message || '...'}
            </BodyText>
          </div>
        </div>
        <Timer
          diffTime={started.valueOf()}
          step={-1}
          format="HH:mm:ss"
          className="text-center w-24"
        />
      </div>

      <Button
        buttonType={ButtonTypes.secondary}
        onClick={() =>
          isKing
            ? setModal(AvailableModals.kingOfTheHill)
            : void claimThrone(buyData.buy_link)
        }
        isLoading={loading}
      >
        {isKing ? 'Edit message' : 'Claim the Throne'}
      </Button>
    </div>
  )
}
