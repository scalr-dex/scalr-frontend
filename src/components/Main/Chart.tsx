import { SVGRenderer } from 'echarts/renderers'
import {
  GridComponent,
  MarkLineComponent,
  MarkPointComponent,
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { EChart } from '@kbox-labs/react-echarts'
import dayjs from 'dayjs'
import { UniversalTransition } from 'echarts/features'
import { GraphTokenData } from 'type/TokenState'
import { UserBet } from 'type/User'

export default function ({
  data,
  loading,
  userBet,
}: {
  data: GraphTokenData[]
  userBet: UserBet | null
  loading: boolean
}) {
  const loadingAnimation = loading ? 'animate-pulse' : ''

  const betPoint = {
    name: 'User Bet',
    yAxis: userBet?.priceAt || 0,
    xAxis: Number(userBet?.date) || 0,
  }

  const roundLines = data
    .filter(({ roundSeparator }) => Boolean(roundSeparator))
    .map(({ value }, index) => ({
      xAxis: value[0],
      name: 'Round Separator' + index,
      label: { show: false },
    }))

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
        use={[
          GridComponent,
          MarkLineComponent,
          MarkPointComponent,
          LineChart,
          SVGRenderer,
          UniversalTransition,
        ]}
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
          min: (val) => val.min - 0.0005,
          max: (val) => val.max + 0.0005,
        }}
        series={{
          name: 'Token price',
          id: 'token',
          type: 'line',
          data,

          markLine: {
            data: roundLines,

            symbol: ['diamond', 'diamond'],
            symbolSize: 7,
            lineStyle: {
              type: 'dotted',
              color: '#ffffff',
              width: 2,
            },
          },

          markPoint: {
            data: [betPoint],
            itemStyle: {
              color: '#fff',
              borderColor: '#fff',
              shadowBlur: 10,
              shadowColor: '#fff',
              shadowOffsetX: 1,
              shadowOffsetY: 0,
            },
            symbolSize: 10,
            symbol: 'circle',
          },

          showSymbol: false,
          universalTransition: true,
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
