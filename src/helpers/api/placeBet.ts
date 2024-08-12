import backendKy from 'helpers/api/backendKy'
import handleError from 'helpers/handleError'

export default async function ({
  amount,
  direction,
}: {
  amount: number
  direction: 'long' | 'short'
}) {
  try {
    await backendKy().post('/bet', {
      json: { amount, direction },
    })
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to place a bet 😥' })
  }
}
