import WhereToStaySection from '@/components/where-to-stay'
import { getDestinationData } from '../lib/destination-data'

type DestinationWhereToStayProps = {
  destinationSlug: string
}

export default async function DestinationWhereToStay({
  destinationSlug
}: DestinationWhereToStayProps) {
  const { destination, guesthouses } = await getDestinationData(destinationSlug)
  const {
    accommodation: { title, description, label }
  } = destination

  return (
    <WhereToStaySection
      title={title}
      label={label}
      description={description}
      guesthouses={guesthouses}
      destination={destination}
    />
  )
}
