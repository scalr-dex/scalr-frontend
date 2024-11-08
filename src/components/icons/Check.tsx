import { ClassNameProp } from 'type/Props'

export default function ({ className }: ClassNameProp) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.33594 11.1576L7.5026 15.3242L16.6693 5.32422"
        stroke="#4374EC"
        strokeWidth="1.07143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
