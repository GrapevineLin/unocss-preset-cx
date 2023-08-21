import type { Rule } from 'unocss'
import type { PresetCXOption } from '../type'
import { legacyRules } from './legacy-rules'
import { safeAreaRules } from './safe-area-rules'

export function getRules(option: PresetCXOption) {
  const result: Rule[] = []
  if (option.legacySupport)
    result.push(...legacyRules)
  result.push(...safeAreaRules)

  return result
}
