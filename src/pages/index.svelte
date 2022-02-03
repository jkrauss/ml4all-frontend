<script>
    import Paper, {Title} from "@smui/paper";
    import {goto} from "@roxi/routify";
    import {fade} from "svelte/transition";
    import {onMount} from 'svelte';
    import {loginStatus, User} from "../components/auth/userStores";
    import {writable} from "svelte/store";
    import axios from "axios";
    import {backendURL} from "../components/stores";

    async function createDataStore() {
        let content = JSON.parse(localStorage.getItem("Dashboard-Data")) || [];
        const {subscribe, set, update} = writable(content);


        const {data} = await axios.get(`${backendURL}/api/forecast/?store=${$User.store}`)
        localStorage.setItem("Dashboard-Data", JSON.stringify(data));
        set(data)


        return {
            subscribe,
            set,
            update,
        }
    }


    onMount(() => {
        if (!loginStatus) {
            $goto("/signup")
        }
    });


    let data = createDataStore();
    let labels = ['Einsparung', 'Verbleibende Retoure'];
    let id1 = "donut_save";
    let id2 = "donut_stock";

    let value = 0;

    $:console.log($data)
</script>

<div in:fade>

    <Paper class="md:w-10/12 w-full mx-auto" elevation={1}>
        <Title><h1 class="text-2xl my-6">Dashboard</h1></Title>
        {#each $data as object}
            Test
            {JSON.stringify(object)}
        {/each}
        <!--<Content>
            <input bind:value={data[0]} type="number">
            <input bind:value={data[1]} type="number">
            <div>
                <div class="chart-container" style="width:45%; max-width:350px; position:relative; float:left;">
                    <Donut {data} id={id1} {labels}/>
                </div>
                <div class="chart-container" style="width:45%; max-width:350px; position:relative; float:right;">
                    <Donut {data} id={id2} {labels}/>
                </div>
            </div>
            <br style="clear: both;"/>
            <div style="padding: 0px 25%;">
                <Slider
                        bind:value
                        discrete
                        input$aria-label="Tick mark slider"
                        max={2}
                        min={-2}
                        step={1}
                        tickMarks
                />
            </div>
        </Content>-->
    </Paper>
</div>