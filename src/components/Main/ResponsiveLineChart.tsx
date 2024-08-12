import { ResponsiveLine } from '@nivo/line'
import useGraph from 'helpers/hooks/useGraph'

export default function () {
  const data = useGraph()

  if (!data.length)
    return (
      <div className="w-full h-full bg-gradient-to-b from-transparent via-white-16 to-transparent animate-pulse" />
    )

  return (
    <ResponsiveLine
      margin={{ bottom: 15, top: 5 }}
      animate={true}
      colors="#B1C9F7"
      data={[{ id: 'tokenPrice', data }]}
      xScale={{
        type: 'time',
        format: 'native',
        precision: 'second',
      }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      axisBottom={{
        format: '%H:%M:%S',
        tickSize: 0,
      }}
      axisRight={{}}
      axisLeft={{}}
      enablePoints={false}
      enableGridX={false}
      enableGridY={false}
      isInteractive={false}
      theme={{
        axis: {
          ticks: {
            text: {
              background: 'red',
              fontSize: 10,
              lineHeight: 12,
              fontWeight: 500,
              color: '#ffffff50',
            },
            line: { fill: 'transparent' },
          },
        },
      }}
    />
  )
}
