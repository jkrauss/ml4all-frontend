<script>
    import {notification} from "../components/stores";
    import Paper, {Content, Title} from "@smui/paper";
    import Select, {Option} from "@smui/select";
    import List, {Separator} from "@smui/list";
    import axios from "axios";
    import {fade} from "svelte/transition";
    import {redirect} from "@roxi/routify";
    import {onMount} from 'svelte';
    import {loginStatus, User} from "../components/auth/userStores";

    onMount(() => {
        if (!$loginStatus) {
            $redirect("/login")
        }
    });

    function changeStore(storeObject) {
        $User.state = storeObject.state;
        $User.city = storeObject.city;
        $User.store_name = storeObject.store_name;
        $User.store = storeObject.id;
    }

    let files;
    $: {
        testFileUploaded(files);
    }

    function testFileUploaded(newValue) {
        if (files && files[0]) {
            console.log(newValue[0].name);
            let ext = files[0].name.split('.').pop();
            switch (ext) {
                case 'xls':
                case 'xlsx':
                    console.log('Allowed');
                    let formData = new FormData();
                    formData.append('file', files[0]);
                    axios.post('/api/sales_upload',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then((response) => {
                        console.log(response.data);
                    })
                        .catch(function () {
                            console.log('FAILURE!!');
                        });
                    break;
                default:
                    console.log('Not allowed');
                    files = null;
                    $notification = {
                        text: "Es können nur Excel-Dateien hochgeladen werden.",
                        bg: "var(--mdc-theme-callout);",
                        color: "var(--mdc-theme-on-primary);",
                    };
                    setTimeout(() => {
                        $notification = undefined;
                    }, 5000);
                //files[0] = '';// is readonly
            }
        }
    };
</script>
<style>
    .file {
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        position: absolute;
    }

    input:hover + label,
    input:focus + label {
        transform: scale(1.015);
        filter: brightness(104%);
    }

    .file-input label {
        display: block;
        position: relative;
        width: fit-content;
        background: "var(--mdc-theme-callout)";
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform .2s ease-out;
    }
</style>
{#if $loginStatus}
    <section class="flex flex-col gap-4 md:w-10/12 w-full mx-auto " in:fade>
        <Paper elevation={1}>
            <Title><h1 class="text-2xl my-6">Einstellungen</h1></Title>
            <Content>
                <List>
                    <div class="flex justify-between">
                        <h2>angemeldete/r Benutzer*In</h2>
                        <p>{$User?.username || "DEMO"}</p>
                    </div>
                    {#if $User?.register_plugin_name}
                        <div class="flex justify-between">
                            <h2>Kassensystem</h2>
                            <div>
                                <p>{$User?.register_plugin_name}</p>
                                <br/>
                                {#if $User?.register_plugin === "plugins.manual.manual"}
                                    <div class="file-input">
                                        <input
                                                type="file"
                                                id="file"
                                                class="file"
                                                bind:files
                                                accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                        >
                                        <label for="file"
                                               class="px-4 py-2 m-0 text-white text-sm font-medium tracking-widest rounded-sm bg-[var(--mdc-theme-callout)]"
                                        > DATEI HOCHLADEN </label>
                                    </div>
                                    {#if files && files[0]}
                                        <p>{files[0].name}</p>
                                    {:else}
                                        <p style="text-align: center;">(.xlsx, .xls)</p>
                                    {/if}
                                {/if}
                                <br/>
                            </div>
                        </div>
                    {/if}
                    <Separator/>
                    <br/>

                    <div class="flex justify-between">
                        <h2>Standort</h2>
                        <p>
                            <Select
                                    bind:value={$User.store}
                                    style="max-width:150px;"
                            >
                                {#each $User?.stores as s}
                                    <Option
                                            value={s.id}
                                            number
                                            on:SMUI:action={() => changeStore(s)}
                                    >{s.store_name}</Option>
                                {:else}
                                    <Option>Problem Loading</Option>
                                {/each}
                            </Select>
                        </p>
                    </div>
                    <div class="flex justify-between">
                        <h2>Land</h2>
                        <p>{$User?.country}</p>
                    </div>
                    <div class="flex justify-between">
                        <h2>Bundesland</h2>
                        <p>{$User?.state}</p>
                    </div>
                    <div class="flex justify-between">
                        <h2>Stadt</h2>
                        <p>{$User?.city}</p>
                    </div>
                </List>
            </Content>
        </Paper>
    </section>
{/if}