export default function ({ onClick }: { onClick: () => void }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline ml-1 cursor-pointer hover:text-white transition-colors"
      onClick={onClick}
    >
      <g clip-path="url(#clip0_3063_88008)">
        <path
          d="M9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346Z"
          stroke="currentColor"
          stroke-opacity="0.64"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.57422 7.49852C7.77014 6.94158 8.15685 6.47194 8.66585 6.1728C9.17485 5.87365 9.7733 5.7643 10.3552 5.86411C10.9371 5.96393 11.4649 6.26646 11.8451 6.71813C12.2253 7.1698 12.4334 7.74146 12.4326 8.33185C12.4326 9.99852 9.93255 10.8319 9.93255 10.8319"
          stroke="currentColor"
          stroke-opacity="0.64"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 14.168H10.0083"
          stroke="currentColor"
          stroke-opacity="0.64"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3063_88008">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
