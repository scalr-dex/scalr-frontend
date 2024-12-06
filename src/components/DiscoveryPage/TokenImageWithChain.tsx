import ImgWithComponentFallback from 'components/ImgWithComponentFallback'
import { AvailableChains, chainToLogo } from 'type/ChainLogos'

export default function TokenImageWithChain({
  tokenName,
  imgUrl,
  chain,
}: {
  tokenName: string
  imgUrl: string
  chain: AvailableChains
}) {
  console.log(chain)
  return (
    <div className="relative w-12 h-12">
      <ImgWithComponentFallback size={12} imgUrl={imgUrl} name={tokenName} />
      <div className="absolute right-0 bottom-0 rounded-full z-10">
        {chainToLogo[chain]}
      </div>
    </div>
  )
}
