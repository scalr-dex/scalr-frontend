import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import LeaderBoardResponse from 'type/LeaderBoardResponse'

export default async function () {
  try {
    const { lb, user } = await backendKy()
      .get('leaderboard')
      .json<LeaderBoardResponse>()
    const images = await backendKy()
      .get('leaderboard/images')
      .json<{ HasPicture: boolean; Base64: string }[]>()

    const usersWithImages = lb.map((value, index) => ({
      ...value,
      userPfp: 'data:image/jpg;base64,' + images[index].Base64,
    }))

    return { lb: usersWithImages, user }
  } catch (e) {
    handleError({ e })
    return { user: undefined, lb: [] }
  }
}
