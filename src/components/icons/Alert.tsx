import { ClassNameProp } from 'type/Props'

export default function ({
  size = 22,
  className,
}: ClassNameProp & { size?: number } = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11 12V6M11.5 15.5C11.5 15.7761 11.2761 16 11 16C10.7239 16 10.5 15.7761 10.5 15.5M11.5 15.5C11.5 15.2239 11.2761 15 11 15C10.7239 15 10.5 15.2239 10.5 15.5M11.5 15.5H10.5M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke="#F3617D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
