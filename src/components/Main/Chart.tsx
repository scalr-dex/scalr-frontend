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
import { tick } from 'helpers/atoms/priceHistoryAtom'
import ChartArrowUp from 'components/icons/ChartArrowUp'
import ChartArrowDown from 'components/icons/ChartArrowDown'

export default function ({
  data,
  loading,
}: {
  data: GraphTokenData[]
  loading: boolean
}) {
  const loadingAnimation = loading ? 'animate-pulse' : ''

  const betPoint = data
    .filter(({ userBet }) => userBet !== undefined)
    .map(({ value, name, userBet }) => ({
      name,
      xAxis: value[0],
      yAxis: value[1],
      symbol: userBet ? ChartArrowUp : ChartArrowDown,
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
        animationDurationUpdate={tick}
        animationEasing="cubicInOut"
        animationDuration={1000}
        grid={{
          left: -16, // chart is jumpy on the edges, we hide this
          right: 5,
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
        }}
        series={{
          name: 'Token price',
          id: 'token',
          type: 'line',
          data,

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
          },

          showSymbol: false,
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
