import type { PresetOptions } from 'unocss'
import { type PresetWindOptions } from '@unocss/preset-wind'

export type remTransformType = (px: number) => number

export interface RemPxOptions {
  /**
     * 1rem = n px
     * @default 16
     */
  baseFontSize?: number

  /**
     * screen width in px
     * @default 375
     */
  screenWidth?: number
}

export interface PresetCXOption extends PresetOptions {
  presetWindOptions?: PresetWindOptions
  uni?: {
    /**
           * 是否为 uni 环境
           *
           * @default false
           */
    enable?: boolean
    /**
           * 将 uni-app H5 的单位统一转成 PX
           *
           * @default true
           */
    transformUniH5PX?: boolean

    H5Option?: {
      /**
             *  指定是否为 uni 小程序环境
             *  如果没有指定会根据环境变量 `process.env.UNI_PLATFORM === 'h5'` 检测
             */
      isH5?: boolean
      /**
           * 如何将 uni-app H5 的单位统一转成 REM
           *
           */
      transformUniH5PX?: RemPxOptions
    }
  }
  /**
       * 支持旧原子式的规则
       *
       * @default false
       */
  legacySupport?: boolean
  // 以 r 结尾的 css 类，如何被转为 rem
  remTransform?: remTransformType
  /**
       * 是否启用 useRem2PxTransform
       *
       * @default true
       */
  useRem2PxTransform?: boolean
  /**
       * 是否启用 useRemTransform
       *
       * @default true
       */
  useRemTransform?: boolean
}
