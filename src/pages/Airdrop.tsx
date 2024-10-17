import Coin3D from 'components/Coin3D'
import FooterSafeArea from 'components/FooterSafeArea'
import { BodyText, Header1, Header3, Header4 } from 'components/Text'
import TonConnect from 'components/TonConnect'

export default function () {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-y-4 text-center px-4">
      <Header1>Scalr Airdrop</Header1>
      <Header3 className="italic !font-semibold">
        Connect wallet to take part in $SCR tokens distribution
      </Header3>
      <Coin3D />

      <TonConnect />

      <span>
        <Header4>Tokens will be distributed for:</Header4>
        <BodyText className="font-normal text-controls-tertiary-focus">
          <ul>
            <li>- Bet volumes</li>
            <li>- Invited friends</li>
            <li>- More info soon 👀</li>
          </ul>
        </BodyText>
      </span>
      <FooterSafeArea />
    </div>
  )
}
