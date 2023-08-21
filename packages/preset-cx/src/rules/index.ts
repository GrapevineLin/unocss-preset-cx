import type { Rule } from 'unocss'
import type { PresetCXOption } from '../type'
import { legacyRules } from './legacy-rules'

export function getRules(option: PresetCXOption) {
  const result: Rule[] = []
  if (option.legacySupport)
    result.push(...legacyRules)

  return result
}
