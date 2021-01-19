<script>
	// library
	import {onMount} from "svelte";
	import { chart } from "svelte-apexcharts";
	import dayjs from "dayjs";
	
	// function
	import {WebpacketData} from "./functions/convert";
	import {GetApiTicker} from "./functions/ajax";
	
	// store
	import {store} from "./functions/store";

	// config
	let TimeFrame={
		_1days:8.64e+7,
        _1minutes:60000,
	}

	onMount(()=>{
		GetApiTicker();
	});

	let options={};

	store.subscribe((value)=>{
		console.log(value.DataChart.length);
		options={
			chart: {
			type: 'candlestick',
			height: 500,
			id: 'candles',
			background:"#000000",
			toolbar: {
				autoSelected: 'pan',
				show: false
			},
			zoom: {
				enabled: false
			},
			},
			plotOptions: {
			candlestick: {
				colors: {
				upward: '#3C90EB',
				downward: '#DF7D46'
				}
			}
			},
			xaxis: {
			type: 'datetime'
			},
			series: [{
				data:value?.DataChart
			}],
			dataLabels: {
				enabled: false,
			},
			makers: {
				size: 0,
			},
			colors: ["#f9ba42", "#84531d"],
			stroke: {
				width: [4, 4]
			}, 
			plotOptions: {
				bar: {
					columnWidth: "25%"
				},
			},
			xaxis: {
				type: 'category',
					axisBorder: {
					show: false,
				},
			labels: {
				show:false,
				formatter: function(val) {
					return dayjs(val).format('MMM DD HH:mm')
				}
			},
			grid: {
					show: true,
					borderColor: "white",
					strokeDashArray: 0,
					position: "back",
					yaxis: {
						lines: {
							show: false,
						},
					},
				},
				tickPlacement: 'on',
			},
			yaxis: {
				labels: {
					show: false
				},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false,
			},
			},
			tooltip: {
				shared: true,
				intersect: false,
				x: {
					show: false
				},
				y:{
					show:false
				},
			},
			stroke: {
				width: 2
			},
		
		};
	});
  </script>

<style>
	* {
		padding:0;
		margin:0;
	}

	.div-konten {
		margin:.75em;
	}
</style>
   
<div class="container-fluid">
	<div class="row">
		<div class="col-12">
			<div class="d-flex justify-content-between">
				<div class="div-konten">
					CandleStick Price 
				</div>
			</div>
			<div class="div-konten">
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:5})}>
					5 Minute
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:15})}>
					15 Minute
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:30})}>
					30 Minute
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:180})}>
					3 Hours
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:420})}>
					7 Hours
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:1440})}>
					1 Days
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:1440*7})}>
					1 Week
				</button>
				<button class="btn btn-success" on:click={()=>WebpacketData({resolutions:43200})}>
					1 Month
				</button>
			</div>
			<div use:chart={options} />
		</div>
		<div class="col-5">
			
		</div>
	</div>
</div>