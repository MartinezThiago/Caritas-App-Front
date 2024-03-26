import withLabelAndHelperText from './withLabelAndHelperText'

import type { InputType } from '@/components/types'
import type {
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {InputType} type - The type of the input.
 * @arg {string} [placeholder] - The placeholder of the input.
 * @arg {boolean} [autoFocus] - The autofocus of the input.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 */
interface Props {
  id: string
  type: InputType
  placeholder?: string
  autoFocus?: boolean
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
}

const Input: React.FC<Props> = ({
  id,
  type,
  placeholder,
  autoFocus = false,
  register,
  registerOptions = {}
}) => {
  return <input
    key={id}
    id={id}
    type={type}
    placeholder={placeholder}
    autoFocus={autoFocus}
    {...(register(id, registerOptions))}
    multiple={type === 'file'}
    className={`w-full h-[2.5rem] mb-2 py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-outline`}
  />
}

export default withLabelAndHelperText(Input)
