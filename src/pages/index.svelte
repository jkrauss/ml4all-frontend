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
    let labels = ['Einsparung', 'Verbleibende Retoure'];
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
            <Content class="gap-4">
                <Title><h1 class="text-2xl">Dashboard</h1></Title>
                <section class="p-0 grid grid-cols-2 md:grid-cols-3 gap-2 py-2">
                    <div class="chart-container">
                        <h2 class="text-xl my-6 mx-auto">
                            Einsparung
                        </h2>
                        <Donut data={[
                        $data_ready.donut_data.profits_lost,$data_ready.donut_data.profits_remaining]}
                               id={id1}
                               {labels}/>
                    </div>
                    <div class="chart-container md:col-start-3">
                        <h2 class="text-xl my-6">Produktverfügbarkeit</h2>
                        <Donut data={[
                        $data_ready.donut_data.returns_savings,$data_ready.donut_data.returns_remaining]} id={id2}
                               {labels}/>
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
            </Content>
        </Paper>
    </div>
{/if}