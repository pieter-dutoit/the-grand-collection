import { isAdmin } from './is-admin'
import { isLoggedIn } from './is-logged-in'

export const DEFAULT_COLLECTION_ACCESS = {
  read: isLoggedIn,
  create: isLoggedIn,
  update: isLoggedIn,
  delete: isAdmin
}
