const BACK_HOST = process.env.BACK_HOST as string
const BACK_PORT = process.env.BACK_PORT as string
export const BACK_BASE_URL = `${BACK_HOST}:${BACK_PORT}/CaritasBack/`// === http://localhost:6389/CaritasBack/ 

const FRONT_HOST = process.env.NEXT_PUBLIC_API_HOST as string
const FRONT_PORT = process.env.NEXT_PUBLIC_API_PORT as string
export const FRONT_BASE_URL = `${FRONT_HOST}:${FRONT_PORT}/api/`
