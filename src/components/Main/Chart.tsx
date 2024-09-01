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
    yAxis: userBet?.value[1] || 0,
    xAxis: userBet?.value[0] || 0,
  }

  const roundLines = data
    .filter(({ roundSeparator }) => Boolean(roundSeparator))
    .map(({ value }) => ({
      xAxis: value[0],
      name: 'Round Separator' + value[0],
      label: { show: false },
    }))

  return (
    <div
      className={`relative w-full min-h-64 flex flex-1 my-4 ${loadingAnimation}`}
      style={{
        background: 'radial-gradient(#ffffff08 1.5px, transparent 0)',
        backgroundSize: '8px 8px',
      }}
    >
      <EChart
        animation
        grid={{
          left: 1,
          top: 10,
          right: 9,
          bottom: 20,
        }}
        className="w-full min-h-64"
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
          animationDurationUpdate: 1000,
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
          animationDurationUpdate: 1000,
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
            animationDurationUpdate: 1000,
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
            animationDurationUpdate: 1000,
          },

          showSymbol: false,
          universalTransition: true,
          animation: true,
          animationEasing: 'cubicInOut',
          animationDuration: 1000,
          animationDurationUpdate: 1000,
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
