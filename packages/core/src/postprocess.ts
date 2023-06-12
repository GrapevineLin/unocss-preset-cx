import type {Arrayable, Postprocessor} from 'unocss'
import type {remTransformType,} from "./index";
import {PresetCXOption,} from "./index";

const remRE = /(-?[.\d]+)rem/g
const rRE = /(-?[.\d]+)r$/
export const pxRE = /-?[\.\d]+px/g
export const rpxRE = /-?[\.\d]+rpx/g
export const rpxOrPxRE = /-?[\.\d]+r?px/g

export function getPostprocess(option: Required<PresetCXOption>): Arrayable<Postprocessor> {
    const postprocess: Arrayable<Postprocessor> = []

    // 将 tailwind 的rem 转为 px
    postprocess.push(rem2PxTransform)

    if (option.uni.enable) {
        // 在 uni-app h5 模式下，将 rpx 转为 px
        if (option.uni.isH5) {
            // postprocess.push(uniAppVue2CssRpxTransform)
        } else {
            // 在 uni-app 非 H5 模式下，将 px 转为 rpx
            postprocess.push(px2RpxTransform)
        }
    }

    postprocess.push(remClassTransform(option.remTransform))

    return postprocess
}

// 将 rpx 转为 px
export const uniAppVue2CssRpxTransform: Postprocessor = (css) => {
    return css.entries.forEach((i) => {
        let value = i[1]
        if (value && typeof value === 'string') {
            const matchs = Array.from(value.matchAll(rpxRE))
            if (matchs.length !== 0) {
                matchs.forEach((m) => {
                    const size = m[0]
                    // @ts-ignore
                    value = value.replace(size, `%?${size.slice(0, -3)}?%`)
                })
                i[1] = value
            }
        }
    })
}

// 将 tailwind 的rem 转为 px
export const rem2PxTransform: Postprocessor = (util) => {
    const unit = util.selector.endsWith('rem') ? 'rem' : 'px'
    util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && remRE.test(value)) {
            i[1] = value.replace(remRE, (_, p1) => `${p1 * 4}${unit}`)
        }
    })
}

// 将 px 转为 rpx
export const px2RpxTransform: Postprocessor = (util) => {
    const pxRe = /(-?[.\d]+)px/g
    const unit = util.selector.endsWith('px') ? 'px' : 'rpx'
    util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && pxRe.test(value)) {
            i[1] = value.replace(pxRe, (_, p1) => `${p1}${unit}`)
        }
    })
}

// 以 r 结尾的 css 类，会被转为 rem
export const remClassTransform: (remTransform: remTransformType) => Postprocessor =
    (remTransform) => (util) => {
        if (!rRE.test(util.selector.slice(1))) {
            return
        }
        const unit = 'rem'
        util.entries.forEach((i) => {
            const value = i[1]
            if (typeof value === 'string') {
                i[1] = value.replace(/(-?[.\d]+)r?px/g, (v) => `${remTransform(+v.slice(0, 2))}${unit}`)
            }
        })
    }
