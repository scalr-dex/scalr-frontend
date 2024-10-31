import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export async function invalidateQuery(queryKey: QueryKeys) {
  await queryClient.invalidateQueries({ queryKey: [queryKey] })
}

export enum QueryKeys {
  dailyStreak,
  userTasks,
  leaderBoard,
  user,
}

export default queryClient
