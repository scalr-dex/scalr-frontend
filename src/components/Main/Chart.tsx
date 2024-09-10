import { CanvasRenderer } from 'echarts/renderers'
import {
  GridComponent,
  MarkLineComponent,
  MarkPointComponent,
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { EChart } from '@kbox-labs/react-echarts'
import dayjs from 'dayjs'
import { GraphTokenData } from 'type/TokenState'
import { UserBet } from 'type/User'
import { tick } from 'helpers/atoms/priceHistoryAtom'
import ChartArrowUp from 'components/icons/ChartArrowUp'
import BetDirection from 'type/BetDirection'
import ChartArrowDown from 'components/icons/ChartArrowDown'

export default function ({
  data,
  loading,
  userBet,
}: {
  data: GraphTokenData[]
  loading: boolean
  userBet: UserBet | null
}) {
  const loadingAnimation = loading ? 'animate-pulse' : ''

  const roundLines = data
    .filter(({ roundSeparator }) => Boolean(roundSeparator))
    .map(({ value }) => ({
      xAxis: value[0],
      name: 'Round Separator' + value[0],
    }))

  const betPoint = userBet
    ? data
        .filter(
          ({ value, roundSeparator }) =>
            value[0] >= userBet?.startTime - 1000 && roundSeparator // 1sec is approximation for differences in timing between chart and JS
        )
        .map(({ value }) => ({
          name: 'User Bet',
          xAxis: value[0],
          yAxis: value[1],
          symbol:
            userBet.direction === BetDirection.long
              ? ChartArrowUp
              : ChartArrowDown,
        }))
    : []

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
          left: -16, // chart is jumpy on the edges, we hide this
          right: 10,
          top: 10,
          bottom: 20,
        }}
        className="w-full min-h-64"
        use={[
          GridComponent,
          MarkLineComponent,
          MarkPointComponent,
          LineChart,
          CanvasRenderer,
        ]}
        renderer="canvas"
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
          animationDurationUpdate: tick,
        }}
        yAxis={{
          type: 'value',
          position: 'right',
          splitLine: { show: false },
          splitNumber: 1,
          axisLabel: {
            inside: true,
            margin: 0,
            height: 20,
            formatter: (num) => num.toFixed(4),
          },
          min: (val) => val.min - 0.0005,
          max: (val) => val.max + 0.0005,
          animationDurationUpdate: tick,
        }}
        series={{
          name: 'Token price',
          id: 'token',
          type: 'line',
          data,

          markLine: {
            data: roundLines,

            label: { show: false },
            tooltip: { show: false },

            symbol: ['diamond', 'diamond'],
            symbolSize: 7,
            lineStyle: {
              type: 'dotted',
              color: '#ffffff',
              width: 2,
            },
            animationDurationUpdate: tick,
          },

          markPoint: {
            data: betPoint,
            itemStyle: {
              color: '#fff',
              borderColor: '#fff',
              shadowBlur: 10,
              shadowColor: '#fff',
              shadowOffsetX: 1,
              shadowOffsetY: 0,
            },
            symbolSize: 16,
            animationDurationUpdate: tick,
          },

          showSymbol: false,
          animation: true,
          animationEasing: 'cubicInOut',
          animationDuration: 1000,
          animationDurationUpdate: tick,
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
