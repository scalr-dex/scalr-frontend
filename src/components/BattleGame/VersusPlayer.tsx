import ImgWithComponentFallback from 'components/ImgWithComponentFallback'

export default function ({ name }: { name: string }) {
  return (
    <div className="relative">
      <ImgWithComponentFallback size={28} name={name} className="z-0" />
    </div>
  )
}
