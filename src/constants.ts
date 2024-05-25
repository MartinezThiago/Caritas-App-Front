const BACK_HOST = process.env.BACK_HOST as string
const BACK_PORT = process.env.BACK_PORT as string
export const BACK_BASE_URL = `${BACK_HOST}:${BACK_PORT}/`

const FRONT_HOST = process.env.NEXT_PUBLIC_API_HOST as string
const FRONT_PORT = process.env.NEXT_PUBLIC_API_PORT as string
export const FRONT_BASE_URL = `${FRONT_HOST}:${FRONT_PORT}/api/`

export const defaultPhoto = 'data:image/jpeg;base64,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'

export const defaultHours = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
  '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
]
