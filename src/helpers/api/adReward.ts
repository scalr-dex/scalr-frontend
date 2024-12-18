import backendKy from 'helpers/api/backendKy'

export default function adReward(userId: number) {
  return backendKy().get(
    `rewards/351b4f14-cb95-4ee6-86fe-14daeb27e656/ad?userid=${userId}`
  )
}
