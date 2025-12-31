import FaqSection from '@/components/faq-section'

import { getDestinationGuidesData } from '../lib/destination-data'

type DestinationFaqProps = {
  destinationSlug: string
}

export default async function DestinationFaq({
  destinationSlug
}: DestinationFaqProps) {
  const { destination } = await getDestinationGuidesData(destinationSlug)

  return (
    <FaqSection
      faq={destination.faq}
      parentLabel='Planning your trip'
      title={`${destination.name} FAQs`}
    />
  )
}
