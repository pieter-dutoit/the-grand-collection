import FaqSection from '@/components/faq-section'

import { getDestinationData } from '../lib/destination-data'

type DestinationFaqProps = {
  destinationSlug: string
}

export default async function DestinationFaq({
  destinationSlug
}: DestinationFaqProps) {
  const { destination } = await getDestinationData(destinationSlug)

  return (
    <FaqSection
      faq={destination.faq}
      parentLabel='Planning your trip'
      title={`${destination.name} FAQs`}
    />
  )
}
