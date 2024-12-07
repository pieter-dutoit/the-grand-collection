import type { Access, FieldAccess } from 'payload'
import { User } from '../payload-types'

export const isLoggedIn: Access<User> = ({ req: { user } }) => {
  // Return true if user is logged in, false if not
  return Boolean(user)
}

export const isLoggedInFieldLevel: FieldAccess<{ id: string }, User> = ({
  req: { user }
}) => {
  return Boolean(user)
}
