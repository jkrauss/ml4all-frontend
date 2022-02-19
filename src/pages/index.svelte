<script>
    import Paper, {Title} from "@smui/paper";
    import {goto, redirect} from "@roxi/routify";
    import {fade} from "svelte/transition";
    import {onMount} from 'svelte';
    import {loginStatus, User} from "../components/auth/userStores";
    import {derived, writable} from "svelte/store";
    import axios from "axios";
    import {backendURL} from "../components/stores";
    import {Content} from "@smui/card";
    import Donut from "../components/components/Donut.svelte";
    import SegmentedButton, {Segment} from '@smui/segmented-button';
    import {Label} from '@smui/common';
    import LineGraph from "../components/components/LineGraph.svelte";
    import RowsTable from "../components/components/RowsTable.svelte";
    import Information_icon from "../components/components/Information_icon.svelte";
    import OrderButton from "../components/components/OrderButton.svelte";


    onMount(() => {
        if (!$loginStatus) {
            $redirect("/signup")
        }
    });

    function createDataStore(v) {
        const {subscribe, set, update} = writable({});
        const storageKey = "Dashboard-Data-Store"
        let content = JSON.parse(localStorage.getItem(storageKey)) || []
        set(JSON.parse(JSON.stringify(content)));
        User.subscribe(async (n) => {
            if ($loginStatus) {
                let {data} = await axios.get(
                    `${backendURL}/api/forecast/?store=${$User.store || 1}`
                );
                content = JSON.parse(JSON.stringify(data));
                set(data)
            }
        })


        return {
            subscribe,
            set,
            update,
        }
    }


    const dataStore = createDataStore();


    onMount(() => {
        if (!loginStatus) {
            $goto("/signup")
        }
    });

    let data = [90, 10]
    let id1 = "donut_save";
    let id2 = "donut_stock";
    let idLine = "line_graph";

    let value = 0;
    $: choices = Object.keys($dataStore);
    let selected = writable("M");

    let data_ready = derived([dataStore, selected], ([$dataStore, $selected], set) => {
        set($dataStore[$selected])
    })

</script>

{#if $data_ready}
    <div in:fade>
        <Paper class="md:w-10/12 w-full mx-auto" elevation={1}>
            <Content class="flex flex-col gap-4">
                <Title><h1 class="text-2xl">Dashboard</h1></Title>
                <section class="p-0 grid grid-cols-2 md:grid-cols-3 gap-2 py-2">
                    <div class="chart-container flex flex-col gap-4">
                        <h2 class="text-xl my-6 flex items-center ">
                            Einsparung
                            <Information_icon class="text-sm">Zeigt Einsparungen</Information_icon>
                        </h2>
                        <Donut data={[
                        $data_ready.donut_data.returns_savings,$data_ready.donut_data.returns_remaining]}
                               id={id1}
                               labels={['Einsparung', 'Verbleibende Retoure']}/>
                        <div class="flex flex-col w-full justify-center items-center">
                            Einsparung: {$data_ready.donut_data.returns_savings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}/Monat
                        </div>
                    </div>

                    <div class="chart-container md:col-start-3 flex flex-col gap-4">
                        <h2 class="text-xl my-6 flex">Produktverfügbarkeit
                            <Information_icon class="text-sm">Zeigt
                                Produkt verfügbarkeit
                            </Information_icon>
                        </h2>
                        <Donut data={[
                        $data_ready.donut_data.profits_remaining,$data_ready.donut_data.profits_lost]} id={id2}
                               labels={['Produkte verfügbar', 'Verfügbarkeitsrisiko']}/>
                        <div class="flex flex-col w-full justify-center items-center">
                            Verlustrisiko: -{$data_ready.donut_data.profits_lost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}/Monat
                        </div>
                    </div>
                </section>
                <section class="flex justify-center items-center">
                    <SegmentedButton bind:selected={$selected} let:segment segments={choices} singleSelect>
                        <!-- Note: the `segment` property is required! -->
                        <Segment {segment}>
                            <Label>{segment}</Label>
                        </Segment>
                    </SegmentedButton>
                </section>
                <section class="">
                    {#key $data_ready}
                        <LineGraph data={$data_ready.line_diagram} id={idLine}/>
                    {/key}
                </section>
                <section class="">
                    <RowsTable rows={$data_ready.rows} orderqty={$data_ready.order_quantity}>

                    </RowsTable>

                </section>

                <section class="">
                    <OrderButton on:click={(e)=>{
                        	let filename = `Foodsight_Bestellung.${e.detail}`;
                            console.log({ ...$data_ready, option:e.detail});
                    axios.post(`${backendURL}/api/order`,{ ...$data_ready, option:e.detail}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
		});
                    }}/>
                </section>

            </Content>
        </Paper>
    </div>
{/if}