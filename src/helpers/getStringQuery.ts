const getStringQuery = (query: string | string[]): undefined | string =>
  !!query && (typeof query === "string" ? query : query[0])

export default getStringQuery
