import BetBlock from 'components/Main/BetBlock'
import Graph from 'components/Main/Graph'
import TokenPrice from 'components/Main/TokenPrice'

export default function () {
  return (
    <div>
      <TokenPrice />
      <Graph />
      <BetBlock />
    </div>
  )
}
