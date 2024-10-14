// Shoutouts to: https://github.com/rainbow-me/rainbowkit/blob/main/packages/rainbowkit/src/components/Avatar/emojiAvatarForAddress.ts

import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import pfpStore, { PfpStoreValue } from 'helpers/atoms/pfpStore'
import { Notomoji } from '@svgmoji/noto'
import data from 'svgmoji/emoji.min.json'

const colors = [
  '#FC5C54',
  '#FFD95A',
  '#E95D72',
  '#6A87C8',
  '#5FD0F3',
  '#75C06B',
  '#FFDD86',
  '#5FC6D4',
  '#FF949A',
  '#FF8024',
  '#9BA1A4',
  '#EC66FF',
  '#FF8CBC',
  '#FF9A23',
  '#C5DADB',
  '#A8CE63',
  '#71ABFF',
  '#FFE279',
  '#B6B1B6',
  '#FF6780',
  '#A575FF',
  '#4D82FF',
  '#FFB35A',
] as const

const avatars = [
  { color: colors[0], emoji: '🌶' },
  { color: colors[1], emoji: '🤑' },
  { color: colors[2], emoji: '🐙' },
  { color: colors[3], emoji: '🫐' },
  { color: colors[4], emoji: '🐳' },
  { color: colors[0], emoji: '🤶' },
  { color: colors[5], emoji: '🌲' },
  { color: colors[6], emoji: '🌞' },
  { color: colors[7], emoji: '🐒' },
  { color: colors[8], emoji: '🐵' },
  { color: colors[9], emoji: '🦊' },
  { color: colors[10], emoji: '🐼' },
  { color: colors[11], emoji: '🦄' },
  { color: colors[13], emoji: '🐧' },
  { color: colors[8], emoji: '🦩' },
  { color: colors[14], emoji: '👽' },
  { color: colors[0], emoji: '🎈' },
  { color: colors[8], emoji: '🍉' },
  { color: colors[1], emoji: '🎉' },
  { color: colors[15], emoji: '🐲' },
  { color: colors[16], emoji: '🌎' },
  { color: colors[17], emoji: '🍊' },
  { color: colors[18], emoji: '🐭' },
  { color: colors[19], emoji: '🍣' },
  { color: colors[1], emoji: '🐥' },
  { color: colors[20], emoji: '👾' },
  { color: colors[15], emoji: '🥦' },
  { color: colors[0], emoji: '👹' },
  { color: colors[17], emoji: '🙀' },
  { color: colors[4], emoji: '⛱' },
  { color: colors[21], emoji: '⛵️' },
  { color: colors[17], emoji: '🥳' },
  { color: colors[8], emoji: '🤯' },
  { color: colors[22], emoji: '🤠' },
] as const

const notoMoji = new Notomoji({ data, type: 'individual' })
const defaultVal = { ...avatars[0], svg: notoMoji.url(avatars[0].emoji) }

function hashCode(text: string) {
  let hash = 0
  if (text.length === 0) return hash
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash
}

export default function (str?: string): PfpStoreValue {
  if (!str) return defaultVal
  const storedValue = readAtom(pfpStore)[str]
  if (storedValue) return storedValue || defaultVal

  const avatarIndex = Math.abs(hashCode(str.toLowerCase()) % avatars.length)
  const avatar = avatars[avatarIndex ?? 0]

  const toWrite = { ...avatar, svg: notoMoji.url(avatar.emoji) }

  writeAtom(pfpStore, { [str]: toWrite })
  return toWrite
}
