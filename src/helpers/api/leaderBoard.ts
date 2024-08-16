import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import LeaderBoardResponse from 'type/LeaderBoardResponse'

export default async function () {
  try {
    return await backendKy().get('leaderboard').json<LeaderBoardResponse>()
  } catch (e) {
    handleError({ e })
    return { user: undefined, lb: [] }
  }
}
