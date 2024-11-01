export enum AvailableLeagues {
  'Diamond League',
  'Platinum League',
  'Gold League',
  'Silver League',
  'Bronze League',
}

export interface SeasonStats {
  days_with_scalr: number
  friends_invited: number
  leaderboard_place: number
  league: AvailableLeagues
  tasks_completed: number
  telegram_id: number
  total_bets: number
  total_losses: number
  total_points: string
  total_volume: string
  total_wins: number
  winrate: number
}
