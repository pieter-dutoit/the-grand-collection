import type {
  Article,
  ArticleSection,
  Guesthouse
} from '@/payload/payload-types'

export const ARTICLE_TYPE_GUIDE = 'guide'
export const ARTICLE_TYPE_GUESTHOUSE_POST = 'guesthouse_post'

type SlugRelation = string | { slug?: string | null } | null | undefined

export const getGuideArticlePath = (
  destinationSlug: string,
  articleSlug: string
) => `/destinations/${destinationSlug}/guides/${articleSlug}`

export const getGuesthousePostPath = (
  guesthouseSlug: string,
  articleSlug: string
) => `/guesthouses/${guesthouseSlug}/articles/${articleSlug}`

export const getGuesthouseArticlesPath = (guesthouseSlug: string) =>
  `/guesthouses/${guesthouseSlug}/articles`

export const resolveRelationSlug = (
  relation: SlugRelation,
  slugById?: Map<string, string>
) => {
  if (!relation) {
    return undefined
  }

  if (typeof relation === 'string') {
    return slugById?.get(relation)
  }

  return relation.slug || undefined
}

export const getArticleSectionName = (
  section: Article['section'] | ArticleSection | string | null | undefined
) => {
  if (!section || typeof section === 'string') {
    return undefined
  }

  return section.name || undefined
}

export const getArticleSectionSlug = (
  section: Article['section'] | ArticleSection | string | null | undefined,
  sectionSlugById?: Map<string, string>
) => resolveRelationSlug(section, sectionSlugById)

export const getGuesthouseSlug = (
  guesthouse: Article['guesthouse'] | Guesthouse | string | null | undefined,
  guesthouseSlugById?: Map<string, string>
) => resolveRelationSlug(guesthouse, guesthouseSlugById)
