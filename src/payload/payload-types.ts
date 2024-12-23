/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations
  }
  collections: {
    amenities: Amenity
    users: User
    media: Media
    guesthouses: Guesthouse
    'contact-person': ContactPerson
    'social-media-platforms': SocialMediaPlatform
    'payload-locked-documents': PayloadLockedDocument
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  collectionsJoins: {}
  collectionsSelect: {
    amenities: AmenitiesSelect<false> | AmenitiesSelect<true>
    users: UsersSelect<false> | UsersSelect<true>
    media: MediaSelect<false> | MediaSelect<true>
    guesthouses: GuesthousesSelect<false> | GuesthousesSelect<true>
    'contact-person': ContactPersonSelect<false> | ContactPersonSelect<true>
    'social-media-platforms':
      | SocialMediaPlatformsSelect<false>
      | SocialMediaPlatformsSelect<true>
    'payload-locked-documents':
      | PayloadLockedDocumentsSelect<false>
      | PayloadLockedDocumentsSelect<true>
    'payload-preferences':
      | PayloadPreferencesSelect<false>
      | PayloadPreferencesSelect<true>
    'payload-migrations':
      | PayloadMigrationsSelect<false>
      | PayloadMigrationsSelect<true>
  }
  db: {
    defaultIDType: string
  }
  globals: {
    'home-page': HomePage
  }
  globalsSelect: {
    'home-page': HomePageSelect<false> | HomePageSelect<true>
  }
  locale: null
  user: User & {
    collection: 'users'
  }
  jobs: {
    tasks: unknown
    workflows: unknown
  }
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string
    password: string
  }
  login: {
    email: string
    password: string
  }
  registerFirstUser: {
    email: string
    password: string
  }
  unlock: {
    email: string
    password: string
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "amenities".
 */
export interface Amenity {
  id: string
  name: string
  description?: string | null
  icon: string | Media
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string
  alt: string
  prefix?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  roles?: ('admin' | 'editor')[] | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "guesthouses".
 */
export interface Guesthouse {
  id: string
  name: string
  slug?: string | null
  booking_platform: {
    name: 'NightsBridge'
    url: string
  }
  content: {
    background_image: string | Media
    heading: string
    description: string
    gallery: (string | Media)[]
    general_amenities: (string | Amenity)[]
  }
  contact_details: {
    contact_persons?: (string | ContactPerson)[] | null
    address: {
      street: string
      suburb: string
      city: string
      province:
        | 'Eastern Cape'
        | 'Free State'
        | 'Gauteng'
        | 'KwaZulu-Natal'
        | 'Limpopo'
        | 'Mpumalanga'
        | 'Northern Cape'
        | 'North West'
        | 'Western Cape'
      postalCode: string
    }
    socials: {
      name: string | SocialMediaPlatform
      url: string
    }
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-person".
 */
export interface ContactPerson {
  id: string
  name: string
  email: string
  phone: string
  position: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-media-platforms".
 */
export interface SocialMediaPlatform {
  id: string
  platform: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string
  document?:
    | ({
        relationTo: 'amenities'
        value: string | Amenity
      } | null)
    | ({
        relationTo: 'users'
        value: string | User
      } | null)
    | ({
        relationTo: 'media'
        value: string | Media
      } | null)
    | ({
        relationTo: 'guesthouses'
        value: string | Guesthouse
      } | null)
    | ({
        relationTo: 'contact-person'
        value: string | ContactPerson
      } | null)
    | ({
        relationTo: 'social-media-platforms'
        value: string | SocialMediaPlatform
      } | null)
  globalSlug?: string | null
  user: {
    relationTo: 'users'
    value: string | User
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "amenities_select".
 */
export interface AmenitiesSelect<T extends boolean = true> {
  name?: T
  description?: T
  icon?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  roles?: T
  updatedAt?: T
  createdAt?: T
  email?: T
  resetPasswordToken?: T
  resetPasswordExpiration?: T
  salt?: T
  hash?: T
  loginAttempts?: T
  lockUntil?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T
  prefix?: T
  updatedAt?: T
  createdAt?: T
  url?: T
  thumbnailURL?: T
  filename?: T
  mimeType?: T
  filesize?: T
  width?: T
  height?: T
  focalX?: T
  focalY?: T
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T
              width?: T
              height?: T
              mimeType?: T
              filesize?: T
              filename?: T
            }
      }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "guesthouses_select".
 */
export interface GuesthousesSelect<T extends boolean = true> {
  name?: T
  slug?: T
  booking_platform?:
    | T
    | {
        name?: T
        url?: T
      }
  content?:
    | T
    | {
        background_image?: T
        heading?: T
        description?: T
        gallery?: T
        general_amenities?: T
      }
  contact_details?:
    | T
    | {
        contact_persons?: T
        address?:
          | T
          | {
              street?: T
              suburb?: T
              city?: T
              province?: T
              postalCode?: T
            }
        socials?:
          | T
          | {
              name?: T
              url?: T
            }
      }
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-person_select".
 */
export interface ContactPersonSelect<T extends boolean = true> {
  name?: T
  email?: T
  phone?: T
  position?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-media-platforms_select".
 */
export interface SocialMediaPlatformsSelect<T extends boolean = true> {
  platform?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T
  globalSlug?: T
  user?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T
  key?: T
  value?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T
  batch?: T
  updatedAt?: T
  createdAt?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page".
 */
export interface HomePage {
  id: string
  hero: {
    background_image: string | Media
    title: string
    locations_link: {
      link_text: string
      link_url: string
    }
  }
  overview: {
    heading: string
    description: string
    images: (string | Media)[]
    features: {
      title: string
      description: string
      id?: string | null
    }[]
    locations_link: {
      link_text: string
      link_url: string
    }
  }
  featured: {
    heading: string
    subheading: string
    guesthouses: (string | Guesthouse)[]
  }
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page_select".
 */
export interface HomePageSelect<T extends boolean = true> {
  hero?:
    | T
    | {
        background_image?: T
        title?: T
        locations_link?:
          | T
          | {
              link_text?: T
              link_url?: T
            }
      }
  overview?:
    | T
    | {
        heading?: T
        description?: T
        images?: T
        features?:
          | T
          | {
              title?: T
              description?: T
              id?: T
            }
        locations_link?:
          | T
          | {
              link_text?: T
              link_url?: T
            }
      }
  featured?:
    | T
    | {
        heading?: T
        subheading?: T
        guesthouses?: T
      }
  updatedAt?: T
  createdAt?: T
  globalType?: T
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
