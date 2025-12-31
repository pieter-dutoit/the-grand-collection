import WhereToStaySection from '../guides/[article]/components/where-to-stay'
import { getDestinationData } from '../lib/destination-data'

type DestinationWhereToStayProps = {
  destinationSlug: string
}

export default async function DestinationWhereToStay({
  destinationSlug
}: DestinationWhereToStayProps) {
  const { destination, guesthouses } = await getDestinationData(destinationSlug)

  return (
    <WhereToStaySection guesthouses={guesthouses} destination={destination} />
  )
}
