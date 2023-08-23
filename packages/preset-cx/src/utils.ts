export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isObject(item: any): item is Record<string, any> {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

/**
 * Deep merge two objects
 */
export function mergeDeep<T>(original: T, patch: DeepPartial<T>, mergeArray = false): T {
  const o = original as any
  const p = patch as any

  if (Array.isArray(p)) {
    if (mergeArray && Array.isArray(p))
      return [...o, ...p] as any
    else
      return [...p] as any
  }

  const output = { ...o }
  if (isObject(o) && isObject(p)) {
    Object.keys(p).forEach((key) => {
      if (((isObject(o[key]) && isObject(p[key])) || (Array.isArray(o[key]) && Array.isArray(p[key]))))
        output[key] = mergeDeep(o[key], p[key], mergeArray)
      else
        Object.assign(output, { [key]: p[key] })
    })
  }
  return output
}
