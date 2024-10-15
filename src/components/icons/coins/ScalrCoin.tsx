import { ClassNameProp } from 'type/Props'

export default function ({
  size = 28,
  className,
}: { size?: number } & ClassNameProp) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z"
        fill="white"
      />
      <circle
        transform="translate(9.5 9.5)"
        cx="4.54329"
        cy="4.54329"
        r="4.54329"
        fill="#1A1A1B"
      />
      <path
        d="M20.5257 13.3769C20.6698 13.5211 20.9049 13.522 21.0369 13.3666C21.3424 13.0069 21.5904 12.6013 21.7716 12.164C21.9999 11.6128 22.1174 11.022 22.1174 10.4253C22.1174 9.82868 21.9999 9.23788 21.7716 8.68665C21.5433 8.13542 21.2086 7.63456 20.7867 7.21266C20.3649 6.79077 19.864 6.45611 19.3128 6.22778C18.7616 5.99945 18.1708 5.88194 17.5742 5.88194C16.9776 5.88194 16.3868 5.99945 15.8356 6.22778C15.3983 6.40892 14.9927 6.657 14.6331 6.96246C14.4777 7.09448 14.4786 7.32956 14.6228 7.47376L17.5742 10.4253L20.5257 13.3769Z"
        fill="#1A1A1B"
      />
      <path
        d="M7.47435 14.6231C7.33016 14.4789 7.09509 14.478 6.96308 14.6334C6.65763 14.9931 6.40957 15.3987 6.22843 15.836C6.00012 16.3872 5.8826 16.978 5.8826 17.5747C5.8826 18.1713 6.00012 18.7621 6.22843 19.3134C6.45675 19.8646 6.7914 20.3654 7.21327 20.7873C7.63514 21.2092 8.13598 21.5439 8.68718 21.7722C9.23839 22.0005 9.82916 22.1181 10.4258 22.1181C11.0224 22.1181 11.6132 22.0005 12.1644 21.7722C12.6017 21.5911 13.0073 21.343 13.3669 21.0375C13.5223 20.9055 13.5214 20.6704 13.3772 20.5262L10.4258 17.5747L7.47435 14.6231Z"
        fill="#1A1A1B"
      />
      <path
        d="M13.3765 7.47421C13.5206 7.33001 13.5216 7.09493 13.3661 6.96291C13.0065 6.65745 12.6009 6.40938 12.1636 6.22823C11.6124 5.99991 11.0216 5.88239 10.425 5.88239C9.8284 5.88239 9.23763 5.99991 8.68642 6.22823C8.13522 6.45656 7.63438 6.79122 7.21251 7.21312C6.79064 7.63501 6.45599 8.13587 6.22767 8.6871C5.99936 9.23833 5.88185 9.82913 5.88185 10.4258C5.88185 11.0224 5.99936 11.6132 6.22767 12.1645C6.40881 12.6018 6.65687 13.0074 6.96232 13.367C7.09433 13.5225 7.3294 13.5216 7.47359 13.3774L10.425 10.4258L13.3765 7.47421Z"
        fill="#1A1A1B"
      />
      <path
        d="M14.6235 20.5258C14.4794 20.67 14.4784 20.9051 14.6339 21.0371C14.9935 21.3425 15.3991 21.5906 15.8364 21.7718C16.3876 22.0001 16.9784 22.1176 17.575 22.1176C18.1716 22.1176 18.7624 22.0001 19.3136 21.7718C19.8648 21.5434 20.3656 21.2088 20.7875 20.7869C21.2094 20.365 21.544 19.8641 21.7723 19.3129C22.0006 18.7617 22.1182 18.1709 22.1182 17.5742C22.1182 16.9776 22.0006 16.3868 21.7723 15.8355C21.5912 15.3982 21.3431 14.9926 21.0377 14.633C20.9057 14.4775 20.6706 14.4784 20.5264 14.6226L17.575 17.5742L14.6235 20.5258Z"
        fill="#1A1A1B"
      />
    </svg>
  )
}
