import regex from 'helpers/formatters/regex'
import { forwardRef } from 'preact/compat'
import PinField, { PinFieldProps } from 'react-pin-field'

const codeLength = 4

function PinCode(props: PinFieldProps) {
  return (
    <div className="flex flex-row gap-x-1">
      <PinField
        {...props}
        autoFocus
        length={codeLength}
        className={`bg-tertiary border border-transparent focus:border-white-16 aria-busy:border-error disabled:opacity-50 uppercase transition-colors rounded-lg w-8 h-10 text-center text-2xl leading-7 font-bold aria-busy:text-error ${props.className}`}
        autoCapitalize="on"
        validate={regex}
      />
    </div>
  )
}

export default forwardRef(PinCode)
