import ShinyStar from 'components/icons/ShinyStar'

export default function () {
  return (
    <div className="absolute -top-2 w-20 py-1 bg-tertiary rounded-full text-white text-xxs">
      <ShinyStar className="absolute -inset-6 animate-spin" />
      <span className="font-medium">BEST OFFER</span>
    </div>
  )
}
