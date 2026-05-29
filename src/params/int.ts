import { defineParamParser, miss } from 'vue-router/experimental'

export const intParser = defineParamParser<number>({
  get: (value) => {
    const num = Number(value)
    if (Number.isNaN(num))
      return miss()
    return num
  },
  set: value => String(value),
})
