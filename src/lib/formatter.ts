export const convertPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

export const cleanString = (value: string) =>
  value
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .join('_')
