import queryString from 'query-string'
import { FilterParam } from './params'
export const StringConcate = (...strings: string[]) => {
  return strings.join(' ')
}

export const DateParamParser = (date: string, arg_date: string) => {
  console.log('date param', date)
  if (!date) {
    return undefined
  }
  if (arg_date === 'gte') {
    return {
      gte: new Date(date)
    }
  } else {
    return {
      lte: new Date(date)
    }
  }
}

export const ParseQueryFilter = (filter: FilterParam extends Record<any, any> ? FilterParam : any) => {
  // const a = await queryString
  // if (a) {
  //   return a.parse(filter as any)
  // }
  Object.keys(filter).forEach((key) => {
    if (filter[key] == null || filter[key] === '') {
      delete filter[key]
    } else if (filter[key].includes('{')) {
      filter[key] = JSON.parse(filter[key])
    }
  })

  return filter
}
