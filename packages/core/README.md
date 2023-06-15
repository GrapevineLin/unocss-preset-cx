# @unocss-cx/preset-cx

蝉选 Unocss 规则预设，包含了 [tailwind](https://tailwindcss.com/docs/) ([Wind preset](https://unocss.dev/presets/wind))规则，以及对旧原子式的支持、Rem 和 Rpx 单位的转化。

## Install

首先安装 unocss:

vite:

```bash
npm i  unocss --save-dev
yarn add -D unocss
pnpm add -D unocss
```


webpack:

```bash
npm i  @unocss/webpack --save-dev
yarn add -D @unocss/webpack
pnpm add -D @unocss/webpack
```
安装本预设：

```bash
npm i @unocss-cx/preset-cx --save-dev # with npm
yarn add @unocss-cx/preset-cx -D # with yarn
pnpm add @unocss-cx/preset-cx -D # with pnpm
```


如果是 uni 小程序，那么你需要额外安装一个兼容包-[@unocss-applet/transformer-applet](https://github.com/unocss-applet/unocss-applet/tree/main/packages/transformer-applet)：

```bash
npm i @unocss-applet/transformer-applet --save-dev # with npm
yarn add @unocss-applet/transformer-applet -D # with yarn
pnpm add @unocss-applet/transformer-applet -D # with pnpm
```


## Usage

```ts
import { defineConfig } from 'unocss'
// webpack:
// import { defineConfig } from '@unocss/webpack'
import presetCx from '@unocss-cx/preset-cx'

export default defineConfig({
    theme: {
        colors: {
            // 自定义主题色, 可选
            primary: '#2965FF' //class="bg-brand-primary"
        }
    },
  presets: [
      presetCx(),
  ],
})
```
uni-app:

```ts
import { defineConfig } from '@unocss/webpack'
import presetCx from '@unocss-cx/preset-cx'
import transformerApplet from '@unocss-applet/transformer-applet'

export default defineConfig({
    theme: {
        colors: {
            // 自定义主题色, 可选
            primary: '#2965FF' //class="bg-brand-primary"
        }
    },
    presets: [
        presetCx({
            uni: {
                enable: true
            }
        })
    ],
    transformers: [transformerApplet()]
})
```

## Type Declarations

```ts
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
    },
    // 以 r 结尾的 css 类，如何被转为 rem
    remTransform?: remTransformType
}
```
