

    <canvas id="{id}"></canvas> 

<script>

	import { onMount, afterUpdate } from 'svelte';

	import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Tooltip
	} from 'chart.js';

	Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Tooltip
	);

    export let data;
    //export let title;
    export let labels;
    export let id;

    var ctx;
    var myChart;

	function createChart(){
		ctx = document.getElementById(id);
        if(myChart) myChart.destroy();
		myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    label: 'My First Dataset',
                    data,
                    backgroundColor: [
                    '#30974e',
                    '#FFA400'
                    ],
                    hoverOffset: 4
                }]
            },
        });
	}

	afterUpdate(createChart);
</script>