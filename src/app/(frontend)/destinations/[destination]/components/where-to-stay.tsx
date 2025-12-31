import WhereToStaySection from '../guides/components/where-to-stay'

import { getDestinationGuidesData } from '../lib/guides-data'

type DestinationWhereToStayProps = {
  destinationSlug: string
}

export default async function DestinationWhereToStay({
  destinationSlug
}: DestinationWhereToStayProps) {
  const { destination, guesthouses } =
    await getDestinationGuidesData(destinationSlug)

  return (
    <WhereToStaySection guesthouses={guesthouses} destination={destination} />
  )
}
