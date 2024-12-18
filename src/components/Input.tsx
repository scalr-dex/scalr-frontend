import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="rounded-xl py-8 px-3 outline-none bg-tertiary border border-transparent focus:border-white-16 aria-busy:border-error disabled:opacity-50 transition-colors aria-busy:text-error"
      {...props}
    />
  )
}
