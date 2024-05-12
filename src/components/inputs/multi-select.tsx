import Select from 'react-select'
import withLabelAndHelperText from './withLabelAndHelperText'
import { Item } from '@/utils/examples/locations'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { useEffect } from 'react'

function MultiSelect ({
  id,
  register,
  registerOptions,
  className,
  props
}: {
  id: string
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  className?: string
  props?: any
}): React.ReactNode {
  useEffect(() => {
    register(id, registerOptions)
  }, [])

  const handleChange = (options: Item[]) => {
    const value = options.map(option => option.value)
    props.setValue(id, value)
  }

  return (
    <Select
      placeholder=''
      onChange={handleChange}
      className={`w-full ${className}`}
      classNames={{
        container: base => `${base} max-w-[20.6rem] sm:max-w-[42rem] !w-full`,
        control: base => `${base} !w-full`,
        valueContainer: base =>
          `${base} !w-full !flex !flex-row !flex-nowrap !whitespace-nowrap !overflow-x-auto`
      }}
      {...props}
    />
  )
}

export default withLabelAndHelperText(MultiSelect)
