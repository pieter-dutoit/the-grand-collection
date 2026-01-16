export type DateInfo = {
  dateTime: string
  humanReadable: string
}

const formatHumanReadable = (date: Date) =>
  new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)

export const formatDate = (value: string): DateInfo => {
  const date = new Date(value)

  return {
    dateTime: date.toISOString(),
    humanReadable: formatHumanReadable(date)
  }
}

export const formatDateLabel = (value?: string | null) => {
  if (!value) {
    return null
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return formatHumanReadable(date)
}
