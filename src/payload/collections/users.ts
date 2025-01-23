import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminFieldLevel } from '../access/is-admin'
import { isAdminOrSelf } from '../access/is-admin-or-self'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email'
  },
  auth: {
    depth: 0,
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: false, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000 // 10mins: Time period to allow the max login attempts
  },
  access: {
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    delete: isAdmin
  },
  fields: [
    {
      name: 'roles',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel
      },
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Editor',
          value: 'editor'
        }
      ]
    }
  ]
}
