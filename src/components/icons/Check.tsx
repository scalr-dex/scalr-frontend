import { ClassNameProp } from 'type/Props'

export default function ({
  size = 21,
  className,
}: ClassNameProp & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.33594 11.1576L7.5026 15.3242L16.6693 5.32422"
        stroke="currentColor"
        strokeWidth="1.07143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
