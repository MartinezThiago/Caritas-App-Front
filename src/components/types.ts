export enum InputEnum {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  FILE = 'file',
  SEARCH = 'search'
}

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'checkbox' | 'radio' | 'file' | 'search'

export enum ButtonEnum {
  SUBMIT = 'submit',
  BUTTON = 'button'
}

export type ButtonType = 'submit' | 'button'
