import backendKy from 'helpers/api/backendKy'

const dexApi = backendKy({ prefixUrlAppend: '/dex' })

export default async function (code: string) {
  await dexApi.get(`beta?code=${code}`).json()
}
