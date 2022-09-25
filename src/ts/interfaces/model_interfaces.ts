export interface User {
  id: string|number
  name: string
  email?: string
  avatar?: string
  isAdmin?: boolean
  emailVerified?: string
}

export interface Message {
  id: string|number
  body: string
  user: User
  createdAt: string
}
