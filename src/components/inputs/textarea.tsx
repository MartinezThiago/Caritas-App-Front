import withLabelAndHelperText from './withLabelAndHelperText'

import React from 'react'
import type {
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {string} [placeholder] - The placeholder of the input.
 * @arg {boolean} [autoFocus] - The autofocus of the input.
 * @arg {number} [rows] - The number of rows of the textarea.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 */
interface Props {
  id: string
  placeholder?: string
  autoFocus?: boolean
  rows?: number
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
}

function TextArea ({
  id,
  placeholder,
  autoFocus = false,
  rows = 4,
  register,
  registerOptions = {}
}: Props) {
  return <textarea
    key={id}
    id={id}
    placeholder={placeholder}
    autoFocus={autoFocus}
    rows={rows}
    {...(register(id, registerOptions))}
    className={`w-full mb-2 py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-outline`}
  />
}

export default withLabelAndHelperText(TextArea)
