<script>
    import DataTable, {Body, Cell, Head, Label, Row} from '@smui/data-table';

    export let rows;
    export let orderqty;

    let rowsReady = [];

    rowsReady = rows.map((item) => {
        let temp = {name: item, array: []}
        Object.keys(orderqty).forEach((day) => {
            temp.array.push(orderqty[day][item]);
        })
        return temp;
    })
    const weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

</script>

<DataTable style="width: 100%;">
    <Head>
        <Row>
            <Cell columnId="name">
                <Label>Product</Label>
            </Cell>
            {#each Object.keys(orderqty) as day}
                <Cell columnId={day}>
                    <Label>{weekday[new Date(day).getDay()]}</Label>
                </Cell>
            {/each}
        </Row>

    </Head>
    <Body>
    {#each rowsReady as row }
        <Row>
            <Cell numeric>{row.name}</Cell>
            {#each row.array as number}
                <Cell>{number}</Cell>
            {/each}
        </Row>
    {/each}
    </Body>
</DataTable>