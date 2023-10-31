import type { Arrayable, Postprocessor } from 'unocss'
import { isString } from './utils'
import type { PresetCXOption, RemPxOptions, remTransformType } from './index'

const remRE = /(-?[.\d]+)rem/g
const rRE = /(-?[.\d]+)r$/
export const pxRE = /-?[\.\d]+px/g
export const rpxRE = /-?[\.\d]+rpx/g
export const rpxOrPxRE = /-?[\.\d]+r?px/g

// 将 rpx 转为 px
export const uniAppVue2CssRpxTransform: Postprocessor = (css) => {
  return css.entries.forEach((i) => {
    let value = i[1]
    if (value && isString(value)) {
      const matchs = Array.from(value.matchAll(rpxRE))
      if (matchs.length !== 0) {
        matchs.forEach((m) => {
          const size = m[0]
          value = (value as string).replace(size, `%?${size.slice(0, -3)}?%`)
        })
        i[1] = value
      }
    }
  })
}

function px2rem(value: string, baseFontSize = 16, screenWidth = 375) {
  return `${+value.slice(0, -2) / (750 / screenWidth) / baseFontSize}rem`
}

export const px2RemTransform: (remPxOptions: RemPxOptions) => Postprocessor
    = remPxOptions => (util) => {
      const rpxRE = /^-?[\.\d]+px$/
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string') {
          if (rpxRE.test(value))
            i[1] = px2rem(value, remPxOptions.baseFontSize, remPxOptions.screenWidth)
        }
      })
    }

// 将 tailwind 的rem 转为 px
export const rem2PxTransform: Postprocessor = (util) => {
  const unit = util.selector.endsWith('rem') ? 'rem' : 'px'
  util.entries.forEach((i) => {
    const value = i[1]
    if (typeof value === 'string' && remRE.test(value))
      i[1] = value.replace(remRE, (_, p1) => `${p1 * 4}${unit}`)
  })
}

// 将 px 转为 rpx
export const px2RpxTransform: Postprocessor = (util) => {
  const pxRe = /(-?[.\d]+)px/g
  const unit = util.selector.endsWith('px') ? 'px' : 'rpx'
  util.entries.forEach((i) => {
    const value = i[1]
    if (typeof value === 'string' && pxRe.test(value))
      i[1] = value.replace(pxRe, (_, p1) => `${p1}${unit}`)
  })
}

// 以 r 结尾的 css 类，会被转为 rem
export const remClassTransform: (remTransform: remTransformType) => Postprocessor
    = remTransform => (util) => {
      if (!rRE.test(util.selector.slice(1)))
        return

      const unit = 'rem'
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string') {
          i[1] = value.replace(/(-?[.\d]+)r?px/g, (_, size) => {
            return `${remTransform(size)}${unit}`
          })
        }
      })
    }

export function getPostprocess(option: Required<PresetCXOption>): Arrayable<Postprocessor> {
  const postprocess: Arrayable<Postprocessor> = []

  // 将 tailwind 的rem 转为 px
  postprocess.push(rem2PxTransform)

  if (option.uni.enable) {
    // 在 uni-app h5 模式下，将 rpx 转为 px
    if (option.uni.H5Option!.isH5) {
      postprocess.push(px2RemTransform(option.uni.H5Option!.transformUniH5PX!))
    }
    else {
      // 在 uni-app 非 H5 模式下，将 px 转为 rpx
      postprocess.push(px2RpxTransform)
    }
  }

  postprocess.push(remClassTransform(option.remTransform))

  return postprocess
}
