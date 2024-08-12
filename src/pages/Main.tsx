import BetBlock from 'components/Main/BetBlock'
import Graph from 'components/Main/Graph'
import TokenPrice from 'components/Main/TokenPrice'
import Onboarding from 'components/Onboarding/index'
import didOnboardAtom from 'helpers/atoms/UserStates'
import useGraph from 'helpers/hooks/useGraph'
import { useAtomValue } from 'jotai'

function InnerMain() {
  const data = useGraph()

  const lastIndex = data.length - 1
  const lastPrice = data[lastIndex]?.y
  const loading = !data.length

  return (
    <div>
      <TokenPrice price={lastPrice} />
      <Graph data={data} loading={loading} />
      <BetBlock loading={loading} />
    </div>
  )
}

export default function () {
  const didOnboard = useAtomValue(didOnboardAtom)

  if (!didOnboard) return <Onboarding />

  return <InnerMain />
}
