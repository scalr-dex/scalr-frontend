import { SVGRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { EChart } from '@kbox-labs/react-echarts'
import dayjs from 'dayjs'
import { UniversalTransition } from 'echarts/features'
import { GraphTokenData } from 'type/TokenState'

export default function ({
  data,
  loading,
}: {
  data: GraphTokenData
  loading?: boolean
}) {
  const loadingAnimation = loading ? 'animate-pulse' : ''

  return (
    <div
      className={`relative w-full h-96 my-4 ${loadingAnimation}`}
      style={{
        background: 'radial-gradient(#ffffff08 1.5px, transparent 0)',
        backgroundSize: '8px 8px',
      }}
    >
      <EChart
        notMerge
        animation
        grid={{
          left: 1,
          top: 10,
          right: 9,
          bottom: 30,
        }}
        width={400}
        height={400}
        use={[GridComponent, LineChart, SVGRenderer, UniversalTransition]}
        renderer="svg"
        xAxis={{
          type: 'time',
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          animation: true,
          axisLabel: {
            fontSize: 10,
            fontWeight: 500,
            lineHeight: 12,
            color: '#ffffff50',
            formatter: (unixTime) => {
              const date = dayjs(unixTime)
              return date.second() % 5 === 0 ? date.format('HH:mm:ss') : ''
            },
          },
        }}
        yAxis={{
          type: 'value',
          position: 'right',
          splitLine: { show: false },
          splitNumber: 1,
          axisLabel: {
            inside: true,
            margin: 5,
            height: 20,
            formatter: (num) => num.toFixed(4),
          },
          animation: true,
          min: (val) => val.min - 0.01,
          max: (val) => val.max + 0.01,
        }}
        series={{
          name: 'Token price',
          id: 'token',
          type: 'line',
          data,
          showSymbol: false,

          universalTransition: true,
          smooth: true,
          animation: true,
          animationEasing: 'cubicInOut',
          animationDuration: 500,
          stateAnimation: { duration: 100, easing: 'linear' },
          lineStyle: {
            color: '#B1C9F7',
            width: 4,
            cap: 'round',
            join: 'round',
            shadowBlur: 10,
            shadowColor: '#4785F6',
            shadowOffsetX: 1,
            shadowOffsetY: 0,
          },
        }}
      />
    </div>
  )
}
