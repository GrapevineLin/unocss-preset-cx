// uno.config.ts
import {defineConfig} from 'unocss'
import presetCx from '@unocss-cx/preset-cx'

export default defineConfig({
    theme: {
        breakpoints: {
            720: '720px',
            1080: '1080px',
            1200: '1200px',
        }
    },
    presets: [presetCx()]
})
