import { omit, extend, reduce, unescape as lodashUnescape } from "lodash-es"
export {
  find,
  findLast,
  findIndex,
  findKey,
  first,
  last,
  filter,
  each,
  map,
  some,
  pick,
  pickBy,
  forOwn,
  forEach,
  differenceBy,
  clone,
  isEmpty,
  isArray,
  isFunction,
  debounce,
  pullAt,
  take,
  orderBy,
  unionBy,
  omit,
  padStart,
  sum,
  sumBy,
  values,
  keys,
  keyBy,
  compact,
  has,
  flatten,
  merge,
  isNil,
  reduce,
  extend,
  uniqBy,
  sortBy,
  chunk,
  flattenDeep,
  startCase,
  maxBy,
  max,
  includes,
  range,
  trim,
  minBy,
  slice,
  groupBy,
} from "lodash-es"

export const omitFn = (paths: string[]) => (obj: any) => omit(obj, paths)
export const mergeAll = (...args: any[]) => reduce(args, extend)

export function unescape(s = "") {
  return lodashUnescape(s).replace(/&nbsp;/g, " ")
}
