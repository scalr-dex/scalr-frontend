import { QueryClient } from '@tanstack/react-query'

export default new QueryClient()

export enum QueryKeys {
  userTasks,
  leaderBoard,
  user,
}
