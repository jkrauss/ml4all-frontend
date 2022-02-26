<script>
    import { afterUpdate } from 'svelte';

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
    //export let labels;
    export let id;

    const chartData = {
    labels: data.columns,
    datasets: [
        {
        label: "Last Week",
        data: data.last_week,
        borderColor: '#30974e',
        //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },
        {
        label: "Proposal",
        data: data.proposal,
        borderColor: '#FFA400',
        //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        }
    ]
    };

    var ctx;
    var myChart;

    function createChart(){
        ctx = document.getElementById(id);
        if(myChart) myChart.destroy();
        myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
        });
    }

    afterUpdate(createChart);
</script>

<br />
<canvas id="{id}"></canvas> 
<br />