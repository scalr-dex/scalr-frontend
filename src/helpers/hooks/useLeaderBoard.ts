import { useQuery } from '@tanstack/react-query'
import leaderBoard from 'helpers/api/leaderBoard'
import { QueryKeys } from 'helpers/queryClient'

export default function () {
  return useQuery({ queryKey: [QueryKeys.leaderBoard], queryFn: leaderBoard })
}
