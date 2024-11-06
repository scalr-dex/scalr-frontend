import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { ChildrenProp, DefaultModalProps } from 'type/Props'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'helpers/queryClient'
import genesis from 'helpers/api/genesis'
import LeftRight from 'components/LeftRight'
import formatUSA from 'helpers/formatters/formatUSA'
import Divider from 'components/Divider'
import {
  BronzeLeague,
  DiamondLeague,
  GoldLeague,
  PlatinumLeague,
  SilverLeague,
} from 'components/icons/Leagues'
import { ReactNode } from 'react'

const leagueToComponent = {
  'Bronze League': <BronzeLeague />,
  'Silver League': <SilverLeague />,
  'Gold League': <GoldLeague />,
  'Platinum League': <PlatinumLeague />,
  'Diamond League': <DiamondLeague />,
} as { [key: string]: ReactNode }

function StatsSection({ children }: ChildrenProp) {
  return <div className="flex flex-col gap-y-2">{children}</div>
}

function ModalBody() {
  const { data, status } = useQuery({
    queryKey: [QueryKeys.genesis],
    queryFn: genesis,
  })

  const isLoading = status !== 'success'

  const league = isLoading
    ? leagueToComponent['Gold League']
    : leagueToComponent[data.league]

  return (
    <>
      <ImageAnimatedOnLoad src="img/utya-win.png" forModal />
      <div className="flex flex-col gap-y-4">
        <Header2>Season 1 is over</Header2>
        <BodyText>Here are your stats:</BodyText>
        <StatsSection>
          <LeftRight left="League" isLoading={isLoading}>
            {league}
          </LeftRight>
          <LeftRight left="Points" isLoading={isLoading} shouldFormat>
            {data?.total_points}
          </LeftRight>
          <LeftRight left="Volume" isLoading={isLoading} shouldFormat>
            {data?.total_volume}
          </LeftRight>
          <LeftRight left="Leaderboard position" isLoading={isLoading}>
            {data?.leaderboard_place}
          </LeftRight>
        </StatsSection>
        <Divider />
        <StatsSection>
          <LeftRight left="Total bets" isLoading={isLoading} shouldFormat>
            {data?.total_bets}
          </LeftRight>
          <LeftRight left="Win/Lose, winrate" isLoading={isLoading}>
            {formatUSA(Number(data?.total_wins))}/
            {formatUSA(Number(data?.total_losses))}, {data?.winrate}%
          </LeftRight>
        </StatsSection>
        <Divider />
        <StatsSection>
          <LeftRight left="Tasks completed" isLoading={isLoading} shouldFormat>
            {data?.tasks_completed}
          </LeftRight>
          <LeftRight left="Friends invited" isLoading={isLoading}>
            {data?.friends_invited}
          </LeftRight>
          <LeftRight left="Days with Scalr" isLoading={isLoading}>
            {data?.days_with_scalr}
          </LeftRight>
        </StatsSection>
      </div>
      <ScrollFadeOverlay />
    </>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <Button onClick={onClose} buttonType={ButtonTypes.secondary}>
      Happy to be here!
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={(onClose) => <ModalFooter onClose={onClose} />}
    />
  )
}
