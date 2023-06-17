import type { Preset, PresetOptions } from 'unocss'
import presetWind from '@unocss/preset-wind'
import { getPostprocess } from './postprocess'

export type remTransformType = (px: number) => number

export interface PresetCXOption extends PresetOptions {
  uni?: {
    /**
         * 是否为 uni 环境
         *
         * @default false
         */
    enable?: boolean
    /**
         *  指定是否为 uni 小程序环境
         *  如果没有指定会根据环境变量 `process.env.UNI_PLATFORM === 'h5'` 检测
         */
    isH5?: boolean
    /**
         * 将 uni-app H5 的单位统一转成 PX
         *
         * @default true
         */
    transformUniH5PX?: boolean
  }
  /**
     * 支持旧原子式的规则
     *
     * @default false
     */
  legacySupport?: boolean
  // 以 r 结尾的 css 类，如何被转为 rem
  remTransform?: remTransformType
}

export function presetCx(option: PresetCXOption = {}): Preset {
  option.uni ??= {}
  option.legacySupport = option.legacySupport ?? false
  option.uni.enable = option.uni?.enable ?? false
  option.uni.isH5 = option.uni?.isH5 ?? process.env.UNI_PLATFORM === 'h5'
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
    rules: option.legacySupport
      ? [
          [
            /^(m|p)(t|b|l|r|x|y)?-?(\d+)(r?)$/,
            ([, marginOrPadding, position, value]) => {
              const mop = marginOrPadding === 'm' ? 'margin' : 'padding'
              if (!position)
                return { [mop]: `${value}px` }

              if (position === 'x')
                return { [`${mop}-left`]: `${value}px`, [`${mop}-right`]: `${value}px` }

              if (position === 'y')
                return { [`${mop}-top`]: `${value}px`, [`${mop}-bottom`]: `${value}px` }

              const marginOrPaddingMap = new Map([
                ['t', 'top'],
                ['b', 'bottom'],
                ['l', 'left'],
                ['r', 'right'],
              ])
              const _position = marginOrPaddingMap.get(position)
              const joiner = _position ? `-${_position}` : ''
              return { [`${mop}${joiner}`]: `${value}px` }
            },
          ],
          [/^fs-?(\d+)(r?)$/, ([, d]) => ({ 'font-size': `${d}px` })],
          [/^font-weight-(\d+)$/, ([, d]) => ({ ' font-weight': `${d}` })],
          [
            /^(lh|line-height)-?(\d+)(p|r)?$/,
            ([, , d, percent]) => ({ 'line-height': `${d}${d === '1' ? '' : percent === 'p' ? '%' : 'px'}` }),
          ],
          [/^z-?(\d+)$/, ([, index]) => ({ 'z-index': index })],
          [
            /^(border-radius-|br)-?(\d+)(p|r)?$/,
            ([, , d, percent]) => ({ 'border-radius': `${d}${percent === 'p' ? '%' : 'px'}` }),
          ],
          [/^opacity-?(\d+)$/, ([, d]) => ({ ' opacity': `0.${d}` })],
          [/^c-?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, ([, color]) => ({ color: `#${color}` })],
          [/^flex-?(\d+)$/, ([, d]) => ({ flex: d })],
          [/^grid-template-columns-(\d+)$/, ([, d]) => ({ 'grid-template-columns': `repeat(${d}, 1fr)` })],
          [/^grid-gap-?(\d+)$/, ([, d]) => ({ 'grid-gap': `${d}px` })],
        ]
      : [],
    shortcuts: [{ 'flex-center': 'flex items-center justify-center' }, { 'flex-center-col': 'flex-center flex-col' }],
    postprocess: getPostprocess(option as Required<PresetCXOption>),
  }
}

export default presetCx
