import withLabelAndHelperText from './withLabelAndHelperText'

import type { InputType } from '@/components/types'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {InputType} type - The type of the input.
 * @arg {string} [placeholder] - The placeholder of the input.
 * @arg {boolean} [autoFocus] - The autofocus of the input.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 * @arg {DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} [props] - The props for the raw input element.
 */
interface Props {
  id: string
  type: InputType
  placeholder?: string
  autoFocus?: boolean
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  className?: string
  props?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

const Input: React.FC<Props> = ({
  id,
  type,
  placeholder,
  autoFocus = false,
  register,
  registerOptions = {},
  className,
  props
}) => {
  return (
    <input
      key={id}
      id={id}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      {...register(id, registerOptions)}
      multiple={type === 'file'}
      className={`w-full h-[2.5rem] py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-lg border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 ${className}`}
      {...props}
    />
  )
}

export default withLabelAndHelperText(Input)
