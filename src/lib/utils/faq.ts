import type { Faq } from '@/payload/payload-types'

export type FaqItemContent = {
  id: string
  question: string
  answer: string
}

type FaqItem = NonNullable<Faq['items']>[number]

const isFaqDocument = (value: Faq | string | null | undefined): value is Faq =>
  typeof value === 'object' && value !== null && 'items' in value

const getItemsFromList = (items: FaqItem[]) =>
  items.reduce<FaqItemContent[]>((acc, item, index) => {
    const question = item.question?.trim()
    const answer = item.answer?.trim()

    if (!question || !answer) {
      return acc
    }

    const id =
      typeof item.id === 'string' && item.id.length > 0
        ? item.id
        : `${index}-${question}`

    acc.push({ id, question, answer })
    return acc
  }, [])

export const getFaqItems = (faq: Faq | string | null | undefined) => {
  if (!isFaqDocument(faq)) {
    return []
  }

  return getItemsFromList(faq.items ?? [])
}

export const hasFaqItems = (faq: Faq | string | null | undefined) =>
  getFaqItems(faq).length > 0
