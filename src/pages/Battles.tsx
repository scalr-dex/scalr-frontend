import Button from 'components/Button'
import ButtonSmall from 'components/ButtonSmall'
import CardFilled from 'components/CardFilled'
import BattlesLogo from 'components/icons/BattlesLogo'
import Dices from 'components/icons/Dices'
import GetHelp from 'components/icons/GetHelp'
import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import BattleSearchModal from 'components/Modals/BattleSearchModal'
import PulseDot from 'components/PulseDot'
import { BodyText, GlowText, Header3, Header4 } from 'components/Text'
import UserAtom from 'helpers/atoms/UserAtom'
import formatUSA from 'helpers/formatters/formatUSA'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'

export default function () {
  const user = useAtomValue(UserAtom)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)

  const onShuffleName = useCallback(() => {
    console.log('shuffle')
  }, [])

  return (
    <div className="flex flex-col h-full px-4 pb-footer-height">
      <BattlesLogo />

      <CardFilled className="flex-row gap-x-2 items-center justify-between mb-8">
        <div className="flex flex-col gap-y-1">
          <BodyText className="font-semibold text-white/50">
            My crystals balance
          </BodyText>
          <Header3>{formatUSA(10000)}</Header3>
        </div>
        <ButtonSmall
          buttonType={ButtonTypes.neutral}
          iconRight={<span className="text-xl">+</span>}
          className="px-3 py-1.5"
          rounded="rounded-full"
        >
          Add crystals
        </ButtonSmall>
      </CardFilled>

      <div className="flex flex-row justify-between items-center mb-4">
        <Header4>Battle amount</Header4>
        <BodyText className="font-semibold text-controls-secondary-disabled">
          See rules{' '}
          <div
            className="tooltip tooltip-left cursor-help"
            data-tip="Battles is a game between 2 players. You buy some crystals and bet them to enter the game. We match you with opponent that bet same value. You need to predict TON price 3 times correctly. If you and your opponent have same amount of wins after 3 rounds - you get one more round, until somebody fails"
          >
            <GetHelp />
          </div>
        </BodyText>
      </div>

      <CardFilled className="flex-col gap-y-6 items-center mb-6">
        <div className="flex flex-row gap-x-2 w-full">
          <ButtonSmall
            className="px-6 py-3 w-full"
            buttonType={ButtonTypes.outline}
          >
            10 💎
          </ButtonSmall>
          <ButtonSmall
            className="px-6 py-3 w-full"
            buttonType={ButtonTypes.special}
            onClick={openModal}
          >
            20 💎
          </ButtonSmall>
          <ButtonSmall
            className="px-6 py-3 w-full"
            buttonType={ButtonTypes.outline}
          >
            100 💎
          </ButtonSmall>
        </div>

        <BodyText className="inline-flex gap-x-2 items-center self-center">
          <PulseDot />
          <BodyText>{formatUSA(8421)}</BodyText>
          <BodyText className="text-white/50">are playing now</BodyText>
        </BodyText>

        <div className="flex flex-col gap-y-1 items-center">
          <ImgWithComponentFallback
            imgUrl={''}
            name={user?.username || '...'}
            size={14}
          />
          <BodyText className="text-xs text-white/50">My battle name</BodyText>
          <div className="flex flex-row items-center gap-x-2">
            <GlowText>{user?.username || '...'}</GlowText>
            <Dices
              className="transition-all hover:cursor-pointer hover:scale-105 active:text-accent-dark h-6 w-6"
              onClick={onShuffleName}
            />
          </div>
        </div>
      </CardFilled>

      <div className="flex flex-row gap-x-3">
        <Button rounded="rounded-full" onClick={openModal}>
          Start public battle
        </Button>
        <Button
          rounded="rounded-full"
          onClick={openModal}
          buttonType={ButtonTypes.secondary}
        >
          Start private battle
        </Button>
      </div>
      <BattleSearchModal showModal={modalOpen} setShowModal={setModalOpen} />
    </div>
  )
}
