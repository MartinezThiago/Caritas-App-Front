/* eslint-disable react/display-name */
import type {
  FieldError,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

/**
 * The props for the custom input component.
 * @arg {string} id - The id of the input.
 * @arg {string} label - The label of the input.
 * @arg {FieldError} [error] - The error from react-hook-form.
 * @arg {UseFormRegister<any>} register - The register function from react-hook-form.
 * @arg {RegisterOptions} [registerOptions] - The options for the register function.
 */
export interface Props {
  id?: string,
  label?: string | React.ReactNode,
  error?: FieldError
  register?: UseFormRegister<any>
  registerOptions?: RegisterOptions
}

/**
 * Wrapper for the custom input component that includes the label and the error
 * message.
 */
const withLabelAndHelperText = <T extends object>(
  Wrapped: React.FC<T>
): React.FC<T & Props> => ({
  id,
  label='',
  error,
  ...props
}: Readonly<T & Props>) => <>
      {Boolean(label) && (
        <label
          key={`${id}-label`}
          htmlFor={id}
          className='block w-full text-left text-sm font-bold'
        >
          {label}
        </label>
      )}
      <Wrapped
        id={id}
        {...props as T}
      />
      <div
        key={`${id}-error-container`}
        className='relative w-full h-[1rem] mb-2'
      >
        {Boolean(error) && (
          <p
            key={`${id}-error`}
            className={`${error != null ? 'absolute' : 'hidden'} text-red-500 text-xs italic`}
          >
            {error !== undefined ? error.message ?? null : null}
          </p>
        )}
      </div>
    </>

export default withLabelAndHelperText
