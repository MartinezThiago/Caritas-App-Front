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

const CancelPendingTrade = ({
  id,
  register,
  registerOptions,
  setValue,
  clearError
}: Readonly<Props>): React.ReactNode => {
  register(id, registerOptions)
  const [optionDecline, setOptionDecline] = useState<string>('')

  const handleChange = (e: any) => {
    //console.log(e.target.value);

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
          key='non-attendance-option'
          id='1'
          type='radio'
          value='No me puedo presentar'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='1'>No me puedo presentar</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='item-option'
          id='2'
          type='radio'
          value='Me arrepentí'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='2'>Me arrepentí</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='job-option'
          id='3'
          type='radio'
          value='Problemas laborales'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='3'>Problemas laborales</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='health-option'
          id='4'
          type='radio'
          value='Motivos de salud'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='4'>Motivos de salud</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='personal-option'
          id='5'
          type='radio'
          value='Problemas personales'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='5'>Problemas personales</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='transport-option'
          id='6'
          type='radio'
          value='Problemas de transporte'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='6'>Problemas de transporte</label>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <input
          key='weather-option'
          id='7'
          type='radio'
          value='Problemas de climáticos'
          name='optionDecline'
          onChange={handleChange}
        />
        <label htmlFor='7'>Problemas climáticos</label>
      </div>
    </fieldset>
  )
}

export default withLabelAndHelperText(CancelPendingTrade)
