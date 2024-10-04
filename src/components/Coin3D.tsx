import 'Coin3D.css'
import Logo from 'components/icons/Logo'

const edgeDetailLevel = 20

export default function () {
  const coinEdges = [...Array(edgeDetailLevel)].map((_, index) => (
    <figure
      className="side"
      style={{
        transform: `translate3d(-50%, -50%, 0) rotateY(90deg) rotateX(${(360 / edgeDetailLevel) * index}deg) translateZ(4.9em)`,
      }}
      key={`coin-size-${index}`}
    />
  ))

  return (
    <div class="coin-wrapper">
      <div
        class="coin euro"
        style={{
          animationDirection: 'linear',
          animationDuration: '4s',
          animationFillMode: 'both',
          animationIterationCount: 'infinite',
          animationName: 'spinEuro',
          animationTimingFunction: 'linear',
        }}
      >
        <div class="face front">
          <div class="symbol">
            <Logo size={144} />
          </div>
        </div>
        <div class="face back">
          <div class="symbol">
            <Logo size={144} />
          </div>
        </div>
        {coinEdges}
      </div>
    </div>
  )
}
