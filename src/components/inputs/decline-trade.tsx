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
  setValue: (value: string) => void
  clearError: () => void
  placeholders?: string[]
}

const DeclineTradeOptions = ({
  id,
  register,
  registerOptions,
  setValue,
  clearError
}: Readonly<Props>): React.ReactNode => {
  register(id, registerOptions)
  const [optionDecline, setOptionDecline] = useState<string>('')

  const handleChange = (e: any) => {
    // console.log(e.target.value);

    setOptionDecline(e.target.value)
    setValue(e.target.value)
    clearError()
  }

  return (
    <fieldset
      key='categories'
      className='w-full h-[auto] mb-2 py-2 px-3 flex flex-col items-start place-content-evenly text-base font-semibold shadow border focus:outline-none focus:shadow-outline'
    >
      <div className='flex items-center justify-center gap-2'>
        <input
          key='dni-option'
          id='1'
          type='radio'
          value='No se presento documentacion'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='1'>No se presento documentacion</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='item-option'
          id='2'
          type='radio'
          value='Uno de los productos no representaba la publicacion'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='2'>Uno de los productos no representaba la publicacion</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Limpieza-category'
          id='3'
          type='radio'
          value='3'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='3'>Opcion 3</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Ropa-category'
          id='4'
          type='radio'
          value='4'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='4'>Opcion 4</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Limpieza-category'
          id='5'
          type='radio'
          value='5'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='5'>Opcion 5</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Ropa-category'
          id='6'
          type='radio'
          value='6'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='6'>Opcion 6</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Ropa-category'
          id='7'
          type='radio'
          value='7'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='7'>Opcion 7</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='Ropa-category'
          id='8'
          type='radio'
          value='8'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='8'>Opcion 8</label>
      </div>
    </fieldset>
  )
}

export default withLabelAndHelperText(DeclineTradeOptions)
