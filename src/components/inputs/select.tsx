import withLabelAndHelperText from './withLabelAndHelperText'

import React from 'react'
import type {
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {boolean} [autoFocus] - The autofocus of the input.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 * @arg {string[]} [options] - The options for the select.
 */
interface Props {
  id: string
  autoFocus?: boolean
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  options?: any
  handleChange: (e: any) => void
  placeholder?: string
}

function Select({
  id,
  autoFocus = false,
  register,
  registerOptions = {},
  options,
  handleChange,
  placeholder
}: Props) {
  return <select
    key={id}
    id={id}
    {...(register(id, registerOptions))}
    defaultValue={''}
    autoFocus={autoFocus}
    onChange={handleChange}
    className={`w-full h-[2.5rem] mb-2 py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-outline`}
  >
    <option
      key={`default-${id}-option`}
      value={placeholder ? placeholder : ''}
      hidden
    ></option>
    {options && options.map((option: any) => <option
      key={option.label}
      value={option.value}
    >
      {option.label}
    </option>
    )}
  </select>
}

export default withLabelAndHelperText(Select)