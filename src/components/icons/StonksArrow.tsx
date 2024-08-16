export default function ({ size, rotate }: { size: number; rotate?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform"
      style={{ transform: 'rotateZ(' + rotate + 'deg)' }}
    >
      <path
        d="M1 13C6.40726 7.59274 7.59274 6.40726 13 1M13 1V11.1538M13 1H2.84615"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
