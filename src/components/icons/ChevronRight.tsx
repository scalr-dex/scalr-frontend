export default function ({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 9.25L5 5L1 0.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
