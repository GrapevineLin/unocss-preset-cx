import type { Preset } from 'unocss'
import presetWind from '@unocss/preset-wind'
import { getPostprocess } from './postprocess'
import type { PresetCXOption } from './type'
import { getRules } from './rules'

export function presetCx(option: PresetCXOption = {}): Preset {
  option.uni ??= {}
  option.legacySupport = option.legacySupport ?? false
  option.uni.enable = option.uni?.enable ?? false
  option.uni.H5Option = option.uni?.H5Option ?? {
    isH5: process.env.UNI_PLATFORM === 'h5',
    transformUniH5PX: {
      baseFontSize: 16,
      screenWidth: 375,
    },
  }
  option.uni.transformUniH5PX = option.uni?.transformUniH5PX ?? true
  option.remTransform ??= (px: number) => +(px / (75 * 2) * 4).toFixed(2)

  const theme = option.uni.enable
    ? {
        // 解决小程序不支持 * 选择器
        preflightRoot: ['page,::before,::after'],
      }
    : {}

  return {
    name: 'unocss-preset-cx',
    theme,
    presets: [presetWind()],
    rules: getRules(option),
    shortcuts: [{ 'flex-center': 'flex items-center justify-center' }, { 'flex-center-col': 'flex-center flex-col' }],
    postprocess: getPostprocess(option as Required<PresetCXOption>),
  }
}

export default presetCx
