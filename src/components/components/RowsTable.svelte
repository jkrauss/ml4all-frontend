<script>
    import DataTable, {Body, Cell, Head, Label, Pagination, Row} from '@smui/data-table';
    import {writable} from "svelte/store";
    import {search} from "ss-search";
    import {User} from "../auth/userStores";
    import Select, {Option} from '@smui/select';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';

    export let rows;
    export let orderqty;

    let DataStore = writable([]);
    let rowsReady = [];
    let searchText = "";
    let currentPage = 0;
    $:rowsReady = rows.map((item) => {
        let temp = {name: item, array: []}
        Object.keys(orderqty).forEach((day) => {
            temp.array.push(orderqty[day][item]);
        })
        return temp;
    })
    const weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];


    $: {
        let tempDataReady = rowsReady;
        tempDataReady = search(tempDataReady, ["name"], searchText)
        /*        tempDataReady = tempDataReady.reduce((ac, item, i) => {
                    if (i <= currentPage * $User.rows_per_page && i >= (currentPage - 1) * $User.rows_per_page) {
                        return [...ac, item];
                    } else {
                        return ac;
                    }
                }, []);*/
        $DataStore = tempDataReady;
    }
    $: start = currentPage * $User.rows_per_page;
    $: end = Math.min(start + $User.rows_per_page, $DataStore.length);
    $: slice = $DataStore.slice(start, end);
    $: lastPage = Math.max(Math.ceil($DataStore.length / $User.rows_per_page) - 1, 0);
    $: if (currentPage > lastPage) {
        currentPage = lastPage;
    }

</script>
<Textfield bind:value={searchText} class="w-full mb-4" label="Suche">
    <!--    <HelperText persistent slot="helper">Helper Text</HelperText>-->
</Textfield>
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
    {#each slice as row }
        <Row>
            <Cell>{row.name}</Cell>
            {#each row.array as number}
                <Cell>{number}</Cell>
            {/each}
        </Row>
    {/each}
    </Body>
    <Pagination slot="paginate">
        <svelte:fragment slot="rowsPerPage">
            <Label>Zeilen pro Seite</Label>
            <Select bind:value={$User.rows_per_page} noLabel variant="outlined">
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={100}>100</Option>
            </Select>
        </svelte:fragment>
        <svelte:fragment slot="total">
            {start + 1}-{end} of {rowsReady.length}
        </svelte:fragment>

        <IconButton
                action="first-page"
                class="material-icons"
                disabled={currentPage === 0}
                on:click={() => (currentPage = 0)}
                title="First page">first_page
        </IconButton
        >
        <IconButton
                action="prev-page"
                class="material-icons"
                disabled={currentPage === 0}
                on:click={() => currentPage--}
                title="Prev page">chevron_left
        </IconButton
        >
        <IconButton
                action="next-page"
                class="material-icons"
                disabled={currentPage === lastPage}
                on:click={() => currentPage++}
                title="Next page">chevron_right
        </IconButton
        >
        <IconButton
                action="last-page"
                class="material-icons"
                disabled={currentPage === lastPage}
                on:click={() => (currentPage = lastPage)}
                title="Last page">last_page
        </IconButton
        >
    </Pagination>
</DataTable>