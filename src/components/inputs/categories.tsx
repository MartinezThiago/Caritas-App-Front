import type {
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

import withLabelAndHelperText from './withLabelAndHelperText'
import { register } from 'module'
import { useState } from 'react'

const checkbox = (
  key: string,
  value: string,
  handleCategoryChange: (e: any) => any,
  label: string,
  checked: boolean = false
) => {
  return <div
    key={`${key}-container`}
    className=''
  >
    <input
      key={key}
      id={key}
      type='checkbox'
      value={value}
      checked={checked}
      onChange={handleCategoryChange}
      className='me-2 bg-blue-900 ring-1 ring-blue-900'
    />
    <label
      key={`${key}-label`}
      htmlFor={key}
    >
      {label}
    </label>
  </div>
}

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 * @arg {(value: string[]) => void} setValue - The setValue function from react-hook-form.
 * @arg {() => void} clearError - The clearError function from react-hook-form.
 * @arg {string[]} placeholders - The placeholders for the input.
 */
interface Props {
  id: string
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  setValue: (value: string[]) => void
  clearError: () => void
  placeholders?: string[]
}

function Categories({
  id,
  register,
  registerOptions,
  setValue,
  clearError,
}: Readonly<Props>) {
  const [categories, setCategories] = useState<string[]>([])
  register(id, registerOptions)

  const handleChange = (e: any) => {
    let newCategories = [...categories]
    if (e.target.checked) {
      newCategories.push(e.target.value)
    } else {
      newCategories = newCategories.filter(
        (category: string) => category !== e.target.value
      )
    }
    if (newCategories.length > 0) {
      clearError()
    }
    setCategories(newCategories)
    setValue(newCategories)
  }

  return <fieldset
    key='categories'
    className='w-full h-[2.5rem] mb-2 py-2 px-3 flex place-content-evenly text-sm font-bold shadow border focus:outline-none focus:shadow-outline'
  >
    {checkbox(
      'limpieza',
      'limpieza',
      handleChange,
      'Limpieza',
      categories.includes('limpieza')
    )}
    {checkbox(
      'alimentos',
      'alimentos',
      handleChange,
      'Alimento',
      categories.includes('alimentos')
    )}
    {checkbox(
      'ropa',
      'ropa',
      handleChange,
      'Ropa',
      categories.includes('ropa')
    )}
    {checkbox(
      'utiles escolares',
      'utiles escolares',
      handleChange,
      'Útiles escolares',
      categories.includes('utiles escolares')
    )}
  </fieldset >
}

export default withLabelAndHelperText(Categories)
