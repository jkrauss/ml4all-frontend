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
                    `${backendURL}/api/forecast/?store=${$User.store}`
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

    let value = 0;
    $: choices = Object.keys($dataStore);
    let selected = writable("M");

    let data_ready = derived([dataStore, selected], ([$dataStore, $selected], set) => {
        set($dataStore[$selected])
    })


    $:console.log($data_ready)
</script>

<div in:fade>
    <Paper class="md:w-10/12 w-full mx-auto" elevation={1}>
        <Title><h1 class="text-2xl my-6">Dashboard</h1></Title>
        <Content>
            <!--            <input bind:value={data[0]} type="number">
                        <input bind:value={data[1]} type="number">-->
            <div class="flex flex-col p-32 md:p-0 md:grid md:grid-cols-3 gap-64">
                <div class="chart-container relative">
                    <h2 class="text-xl my-6 mx-auto">
                        Einsparung
                    </h2>
                    <Donut {data} id={id1} {labels}/>
                </div>
                <div class="chart-container col-start-3">
                    <h2 class="text-xl my-6">Produktverfügbarkeit</h2>
                    <Donut {data} id={id2} {labels}/>
                </div>
            </div>
            <div class="flex justify-center items-center">
                <SegmentedButton bind:selected={$selected} let:segment segments={choices} singleSelect>
                    <!-- Note: the `segment` property is required! -->
                    <Segment {segment}>
                        <Label>{segment}</Label>
                    </Segment>
                </SegmentedButton>
            </div>
        </Content>
    </Paper>
</div>