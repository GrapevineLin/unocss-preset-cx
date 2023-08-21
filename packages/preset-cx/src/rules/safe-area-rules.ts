import type { Rule } from 'unocss'

export const safeAreaRules: Rule[] = [

  [
    'm-safe',
    {
      'margin-top': 'env(safe-area-inset-top)',
      'margin-right': 'env(safe-area-inset-right)',
      'margin-bottom': 'env(safe-area-inset-bottom)',
      'margin-left': 'env(safe-area-inset-left)',
    },
  ],
  [
    'mx-safe',
    {
      'margin-right': 'env(safe-area-inset-right)',
      'margin-left': 'env(safe-area-inset-left)',
    },
  ],
  [
    'my-safe',
    {
      'margin-top': 'env(safe-area-inset-top)',
      'margin-bottom': 'env(safe-area-inset-bottom)',
    },
  ],
  [
    'mt-safe',
    {
      'margin-top': 'env(safe-area-inset-top)',
    },
  ],
  [
    'mr-safe',
    {
      'margin-right': 'env(safe-area-inset-right)',
    },
  ],
  [
    'mb-safe',
    {
      'margin-bottom': 'env(safe-area-inset-bottom)',
    },
  ],
  [
    'ml-safe',
    {
      'margin-left': 'env(safe-area-inset-left)',
    },
  ],
  [
    'p-safe',
    {
      'padding-top': 'env(safe-area-inset-top)',
      'padding-right': 'env(safe-area-inset-right)',
      'padding-bottom': 'env(safe-area-inset-bottom)',
      'padding-left': 'env(safe-area-inset-left)',
    },
  ],
  [
    'px-safe',
    {
      'padding-right': 'env(safe-area-inset-right)',
      'padding-left': 'env(safe-area-inset-left)',
    },
  ],
  [
    'py-safe',
    {
      'padding-top': 'env(safe-area-inset-top)',
      'padding-bottom': 'env(safe-area-inset-bottom)',
    },
  ],
  [
    'pt-safe',
    {
      'padding-top': 'env(safe-area-inset-top)',
    },
  ],
  [
    'pr-safe',
    {
      'padding-right': 'env(safe-area-inset-right)',
    },
  ],
  [
    'pb-safe',
    {
      'padding-bottom': 'env(safe-area-inset-bottom)',
    },
  ],
  [
    'pl-safe',
    {
      'padding-left': 'env(safe-area-inset-left)',
    },
  ],
  [
    'min-h-screen-safe',
    {
      'min-height': 'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
    },
  ],
  [
    'h-screen-safe',
    {
      height: 'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
    },
  ],
]
