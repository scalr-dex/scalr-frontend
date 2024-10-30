import backendKy from 'helpers/api/backendKy'
import { SeasonStats } from 'type/Genesis'

export default function () {
  return backendKy().get('genesis/stats').json<SeasonStats>()
}
