import { OnClickPropVoid } from 'type/Props'

export default function AccordionArrow({
  isOpen,
  onClick,
}: OnClickPropVoid & { isOpen?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isOpen ? 'rotate-180' : ''} opacity-50 hover:opacity-70 active:opacity-90 duration-500 transition-all`}
      onClick={onClick}
    >
      <path
        d="M12.7799 5.22944C12.6389 5.08253 12.4477 5 12.2484 5C12.049 5 11.8578 5.08253 11.7168 5.22944L7.99546 9.10846L4.27408 5.22944C4.13229 5.08669 3.94238 5.00771 3.74526 5.00949C3.54814 5.01128 3.35958 5.09369 3.22019 5.23898C3.08081 5.38428 3.00174 5.58082 3.00003 5.78629C2.99832 5.99176 3.07409 6.18971 3.21104 6.33751L7.46394 10.7706C7.60492 10.9175 7.79611 11 7.99546 11C8.19481 11 8.386 10.9175 8.52698 10.7706L12.7799 6.33751C12.9208 6.19055 13 5.99127 13 5.78347C13 5.57568 12.9208 5.37639 12.7799 5.22944Z"
        fill="white"
      />
    </svg>
  )
}
