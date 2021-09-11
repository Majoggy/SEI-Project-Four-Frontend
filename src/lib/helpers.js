export function percentage (part, whole) {
  const result = 100 * part / whole
  return `${result.toFixed(0)}%`
}

export function minusFormatting (num) {
  if (num < 0) {
    num = num * -1
    return `-£${num}`
  } else if (num === 0) {
    return '£0' 
  } else return `£${num}`
}