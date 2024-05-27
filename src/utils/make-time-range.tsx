import { defaultHours } from '@/constants'

export const makeTimeRange = (start: string, end: string): string[] => {
  const startIndex = defaultHours.indexOf(start)
  const endIndex = defaultHours.indexOf(end)
  return defaultHours.slice(startIndex, endIndex + 1)
}