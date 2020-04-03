export interface IStepPriceFormat {
  [key: number]: {
    base: number
    steps: Array<{
      min: number
      max: number
      price: number
    }>
  }
}
