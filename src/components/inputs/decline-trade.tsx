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
          value='Una de las personas no presentó el DNI'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='1'>Una de las personas no presentó el DNI</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='item-option'
          id='2'
          type='radio'
          value='Uno de los productos no representaba la publicación'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='2'>Uno de los productos no representaba la publicación</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='broken-item-option'
          id='3'
          type='radio'
          value='Uno de los productos estaba dañado'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='3'>Uno de los productos estaba dañado</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='non-attendance-option'
          id='4'
          type='radio'
          value='Una de las personas no se presentó'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='4'>Una de las personas no se presentó</label>
      </div>
    </fieldset>
  )
}

export default withLabelAndHelperText(DeclineTradeOptions)
