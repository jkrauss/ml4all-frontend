<script>
    import Chart from 'svelte-frappe-charts';

    export let data;

    let chartData = {
        labels: data.columns,
        datasets: [
            {
                name: "Last Week",
                values: data.last_week
            },
            {
                name: "Proposal",
                values: data.proposal
            }
        ]
    };
</script>

<Chart data={chartData} type="line"/>