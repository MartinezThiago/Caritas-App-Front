import type {
  FieldError,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

import type { InputType } from '@/components/types'

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {InputType} type - The type of the input.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 * @arg {FieldError} [error] - The error from react-hook-form.
 * @arg {string} [label] - The label of the input.
 * @arg {string} [placeholder] - The placeholder of the input.
 * @arg {boolean} [autoFocus] - The autofocus of the input.
 * @arg {{ label?: string, input?: string }} [className] - The class names for the label and the input.
 */
interface Props {
  id: string
  type: InputType
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  error?: FieldError
  label?: string
  placeholder?: string
  autoFocus?: boolean
  className?: {
    label?: string
    input?: string
  }
}

/**
 * The custom input component adapted for register function of react-hook-form.
 * @arg {Props} props
 */
export default function Input({
  id,
  type,
  register,
  registerOptions = {},
  error,
  label,
  placeholder,
  autoFocus = false,
  className,
}: Readonly<Props>): React.ReactNode {
  return (
    <>
      {Boolean(label) && (
        <label
          className={`
        block text-sm font-bold mb-2 
        ${className?.label}
      `}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`
            shadow appearance-none border w-full h-[2.5rem] py-2 px-3 text-zinc-700 
            mb-2 focus:outline-none focus:shadow-outline 
            ${className?.input}
          `}
        id={id}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...(Boolean(register) && register(id, registerOptions))}
      />
      <div className='relative w-full h-[1rem] mb-2'>
        {Boolean(error) && (
          <p
            className={`${error != null ? 'absolute' : 'hidden'
              } text-red-500 text-xs italic`}
          >
            {error !== undefined ? error.message ?? null : null}
          </p>
        )}
      </div>
    </>
  )
}
