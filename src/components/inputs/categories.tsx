import { useState } from 'react'
import withLabelAndHelperText from './withLabelAndHelperText'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

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

const Categories = ({
  id,
  register,
  registerOptions,
  setValue,
  clearError
}: Readonly<Props>): React.ReactNode => {
  register(id, registerOptions)
  const [category, setCategory] = useState<string>('1')

  const handleChange = (e: any) => {
    setCategory(e.target.value)
    setValue(e.target.value)
  }

  return (
    <fieldset
      key='categories'
      className='w-full h-[2.5rem] mb-2 py-2 px-3 flex place-content-evenly text-sm font-bold shadow border focus:outline-none focus:shadow-outline'
    >
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Útiles escolares-category'
          id='1'
          type='radio'
          value='1'
          name='category'
          onChange={handleChange}
        />
        <label htmlFor='1'>Útil escolar</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Alimento-category'
          id='2'
          type='radio'
          value='2'
          name='category'
          onChange={handleChange}
        />
        <label htmlFor='2'>Alimento</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Limpieza-category'
          id='3'
          type='radio'
          value='3'
          name='category'
          onChange={handleChange}
        />
        <label htmlFor='3'>Limpieza</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Ropa-category'
          id='4'
          type='radio'
          value='4'
          name='category'
          onChange={handleChange}
        />
        <label htmlFor='4'>Ropa</label>
      </div>
    </fieldset>
  )
}

export default withLabelAndHelperText(Categories)
