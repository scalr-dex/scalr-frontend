import handleError from 'helpers/handleError'
import backendKy from 'helpers/api/backendKy'
import LeaderBoardResponse, {
  ClientKing,
  PictureResponse,
} from 'type/LeaderBoardResponse'
import { writeAtom } from 'helpers/atoms/atomStore'
import { kingMessageAtom } from 'helpers/atoms/UserStates'

function getJsBase64(str: string) {
  return 'data:image/jpg;base64,' + str
}

export function updateKingMessage(message: string) {
  return backendKy().post('king/update', { json: { message } })
}

export default async function () {
  try {
    const { lb, user, King, KingBuyLink, KingPicture } = await backendKy()
      .get('leaderboard')
      .json<LeaderBoardResponse>()

    const images = await backendKy()
      .get('leaderboard/images')
      .json<PictureResponse[]>()

    const usersWithImages = lb.map((value, index) => ({
      ...value,
      userPfp: getJsBase64(images[index]?.Base64),
    }))

    const king: ClientKing = {
      ...King,
      started: new Date(King.started),
      userPfp: getJsBase64(KingPicture.Base64),
      buyData: KingBuyLink,
    }

    writeAtom(kingMessageAtom, king.message)

    return {
      lb: usersWithImages,
      user,
      king,
    }
  } catch (e) {
    handleError({ e })
    return { user: undefined, lb: [] }
  }
}
