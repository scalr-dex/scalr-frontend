import SolanaLogo from 'components/icons/SolanaLogo'
import ImgWithComponentFallback from 'components/ImgWithComponentFallback'

export default function TokenImageWithChain({
  tokenName,
  imgUrl,
}: {
  tokenName: string
  imgUrl: string
}) {
  return (
    <div className="relative w-12 h-12">
      <ImgWithComponentFallback size={12} imgUrl={imgUrl} name={tokenName} />
      <div className="absolute right-0 bottom-0 rounded-full">
        <SolanaLogo />
      </div>
    </div>
  )
}
