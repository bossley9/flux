import moment from 'moment'

export function formatPubDate(dateStr: string): string {
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)

  const pubDate = new Date(dateStr)
  const pubMoment = moment(pubDate)

  const isOutdated = pubDate.getTime() - lastWeek.getTime() < 0

  return isOutdated ? pubMoment.format('MMM DD YYYY') : pubMoment.fromNow()
}
