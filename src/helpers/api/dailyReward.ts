import backendKy from 'helpers/api/backendKy'

export default function claimDailyReward() {
  return backendKy().get('claim').json<string>()
}

export function getDailyStreak() {
  return backendKy()
    .get('daily_streak')
    .json<{ last_login_date: string; login_days: number }>()
}

export function getDailyNickname() {
  return backendKy().get('daily_nickname')
}
