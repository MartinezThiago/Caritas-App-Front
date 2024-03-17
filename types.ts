export interface User {
  name: string
  email: string
  role: 'admin' | 'volunter' | 'nominal' | undefined
}