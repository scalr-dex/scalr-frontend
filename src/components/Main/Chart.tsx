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
import emojiAvatarForString from 'helpers/emojiAvatarForString'

const minMaxY = 0.0005
const symbolOffset = 48

const colorToShadow: { [color: string]: string } = {
  '#FFE792': '#E5FCB4',
  '#B1C9F7': '#4785F6',
}

export default function ({
  data,
  lineColor = '#B1C9F7',
  roundSeparators = [],
  loading,
}: {
  data: GraphTokenData[]
  roundSeparators?: number[]
  loading: boolean
  lineColor?: string
}) {
  const loadingAnimation = loading ? 'animate-pulse' : ''

  const betPoint = data
    .filter(
      ({ userBet, battleBet }) =>
        userBet !== undefined || battleBet !== undefined
    )
    .map(({ value, name, userBet, battleBet }) => {
      const isUp = battleBet?.direction || userBet

      return {
        name,
        xAxis: value[0],
        yAxis: value[1],
        symbol: battleBet
          ? 'image://' + emojiAvatarForString(battleBet.userId).svg
          : userBet
            ? ChartArrowUp
            : ChartArrowDown,
        symbolSize: battleBet ? 40 : 16,
        symbolOffset: battleBet
          ? [0, battleBet.userIndex ? symbolOffset : -symbolOffset]
          : 0,
        shadowColor: battleBet ? 'none' : '#fff',
        shadowBlur: battleBet ? 0 : 10,
        shadowOffsetX: battleBet ? 0 : 1,
        shadowOffsetY: 0,
        label: {
          show: battleBet !== undefined,
          position: battleBet?.userIndex
            ? ('top' as const)
            : ('bottom' as const),
          color: isUp ? '#23CFB2' : '#F3617D',
          fontWeight: 700,
          formatter: isUp ? 'UP' : 'DOWN',
        },
      }
    })

  const roundLines = roundSeparators.map((value) => ({
    xAxis: value,
    name: 'Round Separator' + value,
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
        animationEasingUpdate="linear"
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
          min: (val) => val.min - minMaxY,
          max: (val) => val.max + minMaxY,
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
          },

          markPoint: {
            data: betPoint,
            itemStyle: {
              color: '#fff',
              borderColor: '#fff',
            },
          },

          showSymbol: false,
          lineStyle: {
            color: lineColor,
            width: 4,
            cap: 'round',
            join: 'round',
            shadowBlur: 10,
            shadowColor: colorToShadow[lineColor],
            shadowOffsetX: 1,
            shadowOffsetY: 0,
          },
        }}
      />
    </div>
  )
}
