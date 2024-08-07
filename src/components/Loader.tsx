export default function ({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="animate-spin"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00065 1.3335C11.6826 1.3335 14.6673 4.31826 14.6673 8.00016C14.6673 11.6821 11.6826 14.6668 8.00065 14.6668C4.31875 14.6668 1.33398 11.6821 1.33398 8.00016C1.33398 6.93584 1.5834 5.92976 2.02696 5.0372"
        stroke="#1A1A1B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
