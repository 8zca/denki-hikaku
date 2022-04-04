import { IStepPriceFormat } from '@/interfaces/IStepPriceFormat'

const lpioPriceList: IStepPriceFormat = {
  40: { base: 1086.8, steps: [{ min: 1, max: 120, price: 18.84 }, { min: 121, max: 300, price: 23.03 }, { min: 301, max: 9999, price: 25.78 }] },
  50: { base: 1344.2, steps: [{ min: 1, max: 120, price: 18.84 }, { min: 121, max: 300, price: 23.03 }, { min: 301, max: 9999, price: 25.78 }] },
  60: { base: 1613.04, steps: [{ min: 1, max: 120, price: 18.65 }, { min: 121, max: 300, price: 23.03 }, { min: 301, max: 9999, price: 25.78 }] }
}

export const calcLpio = (amp: number, kwh: number): number => {
  if (lpioPriceList[amp]) {
    const { base, steps } = lpioPriceList[amp]
    return base + calcStepPrice(steps, kwh)
  }
  return 0
}

export const calcLooop = (_: number, kwh: number): number => {
  return kwh * 26.4
}

export const calcTepco = (amp: number, kwh: number): number => {
  const base = Math.floor(amp / 10) * 286
  const steps = [{ min: 1, max: 120, price: 19.88 }, { min: 121, max: 300, price: 26.46 }, { min: 301, max: 9999, price: 30.57 }]
  return base + calcStepPrice(steps, kwh)
}

const tokyuSteps = [{ min: 1, max: 120, price: 19.77 }, { min: 121, max: 300, price: 26.36 }, { min: 301, max: 9999, price: 28.95 }]
const tokyuPriceList: IStepPriceFormat = {
  40: { base: 1089, steps: tokyuSteps },
  50: { base: 1320, steps: tokyuSteps },
  60: { base: 1551, steps: tokyuSteps }
}
export const calcTokyu = (amp: number, kwh: number): number => {
  if (tokyuPriceList[amp]) {
    const { base, steps } = tokyuPriceList[amp]
    return base + calcStepPrice(steps, kwh)
  }
  return 0
}

export const calcAshita = (_: number, kwh: number): number => {
  return 26 * kwh
}

export const calcRakuten = (_: number, kwh: number): number => {
  return 26.5 * kwh
}

export const calcOyayubi = (_: number, kwh: number) => {
  return 26.4 * kwh
}

const calcStepPrice = (steps: Array<{ min: number; max: number; price: number }>, kwh: number) => {
  return steps.reduce((accm, current, currentIndex) => {
    if (currentIndex > 0 && steps[currentIndex - 1].max >= kwh) return accm

    let value
    if (currentIndex > 0 && kwh > current.max ) {
      value = current.max - current.min + 1
    } else {
      value = currentIndex > 0 ? kwh - steps[currentIndex - 1].max : Math.min(kwh, current.max)
    }

    return accm + value * current.price
  }, 0)
}
