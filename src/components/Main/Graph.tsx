import { ResponsiveLine } from '@nivo/line'
import { AxisTickProps } from '@nivo/axes'
import { useCallback } from 'preact/hooks'
import { TokenStates } from 'type/TokenState'

type NumericValue = {
  valueOf(): number
}

export default function ({
  data,
  loading,
}: {
  data: TokenStates
  loading?: boolean
}) {
  const loadingAnimation = loading ? 'animate-pulse' : ''

  const renderTick = useCallback((props: AxisTickProps<NumericValue>) => {
    if (props.tickIndex === 0 || props.tickIndex === 8)
      return (
        <text
          dominant-baseline="central"
          text-anchor="start"
          transform={`translate(0,${props.y}) rotate(0)`}
          className="font-accent text-xs font-semibold"
          style={{ fill: 'rgba(51, 51, 51, 50)' }}
        >
          {props.value}
        </text>
      )
  }, [])

  return (
    <div
      className={`relative w-full h-96 my-4 ${loadingAnimation}`}
      style={{
        background: 'radial-gradient(#ffffff08 1.5px, transparent 0)',
        backgroundSize: '8px 8px',
      }}
    >
      <div className="z-20 w-full h-full">
        <ResponsiveLine
          margin={{ bottom: 20, top: 15 }}
          animate={false}
          colors="#B1C9F7"
          data={[{ id: 'tokenPrice', data }]}
          xScale={{
            type: 'time',
            format: 'native',
            precision: 'second',
            nice: true,
          }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          axisBottom={{
            format: '%H:%M:%S',
            tickSize: 0,
          }}
          axisTop={null}
          axisRight={{ renderTick }}
          axisLeft={null}
          enablePoints={false}
          enableGridX={false}
          enableGridY={false}
          isInteractive={false}
        />
      </div>
    </div>
  )
}

// {/* <script context="module" lang="ts">
// import { type ContextKey } from "svelte";
// import { type Readable } from "svelte/store";
// import { type PricePoint } from "$modules/api/ws/store/price";
// import { type QueueDataWrapper } from "$lib/queue";
// export const CONTEXT_KEY: ContextKey<Readable<QueueDataWrapper<PricePoint>>> =
// 	"keyApacheChartDataStore";
// </script>

// <script lang="ts">
// import type { EChartsType as BaseEchartsType, EChartsOption } from "echarts";

// import Big from "big.js";
// import dayjs from "dayjs";
// import { getContext } from "svelte";
// import { get } from "svelte/store";
// const priceStore = getContext(CONTEXT_KEY);
// import { onMount } from "svelte";
// onMount(() => {
// 	priceStore.subscribe(($priceStore) => {
// 		if (!chart) return console.warn("chart was not initialized");
// 		chart.setOption({
// 			series: [
// 				{
// 					data: $priceStore.value,
// 				},
// 			],
// 		});
// 	});
// });
// import { browser } from "$app/environment";

// const CHART_OPTIONS = {
// 	grid: {
// 		left: 200,
// 		top: 20,
// 		right: 10,
// 		bottom: 10,
// 	},
// 	xAxis: {
// 		type: "time",
// 		axisTick: {
// 			show: false,
// 		},
// 		alignTicks: true,
// 		splitLine: {
// 			show: false,
// 		},
// 		animationEasing: "linear",
// 		// interval: 500,
// 		axisLine: {
// 			show: false,
// 		},
// 		axisLabel: {
// 			fontSize: 10,
// 			fontWeight: 510,
// 			lineHeight: 12,
// 			color: "rgba(255, 255, 255, 0.48)",
// 			margin: 10,
// 			formatter: (v) => {
// 				const date = dayjs(v);
// 				const showTime = date.second() % 5 === 0;
// 				return showTime ? `${date.format("HH:mm:ss")}` : "";
// 			},
// 		},
// 		splitNumber: 6,
// 	},
// 	yAxis: {
// 		type: "value",
// 		position: "right",
// 		splitLine: {
// 			show: false,
// 		},
// 		splitNumber: 1,
// 		axisLabel: {
// 			inside: true,
// 			showMinLabel: true,
// 			margin: 5,
// 			height: 20,
// 			showMaxLabel: true,
// 			formatter: (v) => {
// 				return Big(v).div(10000).toString();
// 			},
// 		},
// 		min: (val) => {
// 			return val.min - 0.01;
// 		},
// 		max: (val) => {
// 			return val.max + 0.01;
// 		},
// 	},
// 	/* dataZoom: [
// 		{
// 			type: "inside",
// 			start: 20,
// 			end: 100,
// 			realtime: true,
// 		},
// 	], */
// 	series: [
// 		{
// 			name: "Live chart",
// 			type: "line",
// 			sampling: "lttb",
// 			data: get(priceStore).value,
// 			animationEasing: "linear",
// 			animationDuration: 1000,
// 			showSymbol: false,
// 			lineStyle: {
// 				color: "#B1C9F7",
// 				width: 4,
// 				cap: "round",
// 				join: "round",
// 				shadowBlur: 10,
// 				shadowColor: "#4785F6",
// 				shadowOffsetX: 1,
// 				shadowOffsetY: 0,
// 			},
// 		},
// 	],
// 	height: "83%",
// 	fontFamily: "var(--font-primary)",
// } satisfies EChartsOption;

// import { Chart } from "svelte-echarts";
// import {
// 	init,
// 	use,
// 	type init as _coreInit,
// 	type EChartsType as CoreEchartsType,
// } from "echarts/core";
// import { LineChart } from "echarts/charts";
// import { UniversalTransition } from "echarts/features";
// import { GridComponent, TransformComponent } from "echarts/components";
// import { SVGRenderer } from "echarts/renderers";
// let chart: (BaseEchartsType | CoreEchartsType) | undefined = undefined;

// use([
// 	LineChart,
// 	GridComponent,
// 	SVGRenderer,
// 	TransformComponent,
// 	UniversalTransition,
// ]);
// $: if (chart) chart?.resize?.();
// </script>

// <div class="apache-container">
// 	<Chart
// 		{init}
// 		notMerge
// 		transition
// 		replaceMerge="{['series', 'yAxis', 'xAxis', 'grid']}"
// 		initOptions="{{
// 			renderer: 'svg',
// 			ssr: !browser,
// 		}}"
// 		options="{CHART_OPTIONS}"
// 		bind:chart
// 	/>
// </div>

// <style>
// .apache-container {
// 	display: contents;
// 	--height: clamp(240px, calc(100vh - 412px), 420px);
// 	--width: calc(100vw + 250px);
// 	--fullbleed-margin: calc(var(--layout-side-width) * -1);
// }
// .apache-container :global(div[_echarts_instance_]) {
// 	margin-left: calc(var(--fullbleed-margin) - 250px);
// 	margin-right: var(--fullbleed-margin);
// }
// .apache-container :global(div[_echarts_instance_]),
// .apache-container :global(div[_echarts_instance_] > div),
// .apache-container :global(div[_echarts_instance_] > div > canvas) {
// 	min-height: var(--height) !important;
// 	height: var(--height) !important;
// 	max-height: var(--height) !important;
// 	min-width: var(--width) !important;
// 	max-width: var(--width) !important;
// 	width: var(--width) !important;
// }
// .apache-container :global(div[_echarts_instance_] > div > svg) {
// 	overflow: visible;
// 	user-select: none;
// }
// </style> */}
