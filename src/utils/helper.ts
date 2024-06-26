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
