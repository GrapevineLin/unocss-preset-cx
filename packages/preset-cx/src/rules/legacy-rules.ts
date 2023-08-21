import type { Rule } from 'unocss'

export const legacyRules: Rule[] = [
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
  [
    /^ellipsis-(\d+)$/,
    ([, line]) => ({
      'display': ' -webkit-box',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'word-break': 'break-all',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': line,
    }),
  ],
]
