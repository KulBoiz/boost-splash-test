import millify from "millify"

export const formatSize = (number: number) => {
  return millify(number, { units: ["B", "KB", "MB", "GB"], space: true })
}
