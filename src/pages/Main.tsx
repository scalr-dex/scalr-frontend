import BetBlock from 'components/Main/BetBlock'
import Graph from 'components/Main/Graph'
import TokenPrice from 'components/Main/TokenPrice'
import Onboarding from 'components/Onboarding/index'
import didOnboardAtom from 'helpers/atoms/UserStates'
import { useAtomValue } from 'jotai'

export default function () {
  const didOnboard = useAtomValue(didOnboardAtom)

  if (!didOnboard) return <Onboarding />

  return (
    <div>
      <TokenPrice />
      <Graph />
      <BetBlock />
    </div>
  )
}
