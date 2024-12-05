export default function getDexScreenerLink(
  chain: string,
  tokenAddress: string
) {
  return `https://dexscreener.com/${chain.toLowerCase()}/${tokenAddress}`
}
