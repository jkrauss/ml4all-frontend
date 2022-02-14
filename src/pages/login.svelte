<script>
    import Paper, {Content, Title} from "@smui/paper";
    import Button, {Label} from "@smui/button";
    import Textfield from '@smui/textfield';
    import {goto, redirect} from "@roxi/routify";
    import {fade} from "svelte/transition";

    import {onMount} from 'svelte';
    import {loginStatus, Auth} from "../components/auth/userStores";

    export let open = false;
    let userData = {username: "", password: ""};
    let loading = false;
    let error;


    function login() {
        loading = true;
        Auth.signin(userData, () => {
            loading = false;
            open = false;
            $redirect("/");
        }, (er) => {
            error = er
            loading = false
        })
    }


    //make page only visible if logged out - otherwise redirect to index-page
    onMount(() => {
        if ($loginStatus) {
            $goto("/")
        }
    });

</script>

<div in:fade>
    <Paper elevation={1} style="height:80hmax">
        <Title>
            <h1 class="text-2xl my-6">
                Login
            </h1>
        </Title>
        <Content>
                <form
                action=""
                class="flex flex-col justify-center items-center gap-2 w-full h-full"
                on:submit|preventDefault={login}
                >
                <Textfield
                bind:value={userData.username}
                label="Benutzername"
                
                />
                <Textfield
                bind:value={userData.password}
                label="Passwort"
                            type="password"
                            />
                            {#if error}
                            <div class="text-red-500">
                                {error}
                            </div>
                            {/if}
                            {#if loading}
                            <Button variant="raised">
                                <Label
                                ><span class="material-icons animate-spin">
                                    sync
                                </span></Label
                                >
                            </Button>
                            {:else}
                            <Button variant="raised" on:click={login}>
                                <Label>Login</Label>
                            </Button>
                            {/if}
                        </form>
                        
                    </Content>
                </Paper>
                <br />

    <Paper elevation={1} >
        <Content>
            <div class="flex flex-col justify-center items-center gap-2 w-full h-full">
                oder
                <Button variant="raised" on:click={() => $goto("/signup")}>
                    <Label>Registrieren</Label>
                </Button>
            </div>
        </Content>
    </Paper>
</div>