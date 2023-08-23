import { type Preset } from 'unocss'
import presetWind from '@unocss/preset-wind'
import { getPostprocess } from './postprocess'
import type { PresetCXOption } from './type'
import { getRules } from './rules'
import { mergeDeep } from './utils'

const defaultConfig: PresetCXOption = {
  legacySupport: false,
  uni: {
    enable: false,
    transformUniH5PX: true,
    H5Option: {
      isH5: process.env.UNI_PLATFORM === 'h5',
      transformUniH5PX: {
        baseFontSize: 16,
        screenWidth: 375,
      },
    },
  },
  remTransform: (px: number) => +(px / (75 * 2) * 4).toFixed(2),
}

export function presetCx(option: PresetCXOption = {}): Preset {
  const userConfig = mergeDeep(defaultConfig, option)
  const theme = userConfig.uni?.enable
    ? {
        // 解决小程序不支持 * 选择器
        preflightRoot: ['page,::before,::after'],
      }
    : {}

  return {
    name: 'unocss-preset-cx',
    theme,
    presets: [presetWind()],
    rules: getRules(userConfig),
    shortcuts: [{ 'flex-center': 'flex items-center justify-center' }, { 'flex-center-col': 'flex-center flex-col' }],
    postprocess: getPostprocess(userConfig),
  }
}

export default presetCx
