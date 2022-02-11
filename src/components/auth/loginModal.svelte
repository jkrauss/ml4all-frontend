<script>
    import Textfield from "@smui/textfield";
    import Dialog, {Actions, Content, Header, Title,} from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Button, {Label} from '@smui/button';
    import {Auth} from "./userStores";
    import {goto} from "@roxi/routify";

    export let open = false;
    let userData = {username: "", password: ""};
    let loading = false;
    let error;


    function login() {
        loading = true;
        Auth.signin(userData, () => {
            loading = false;
            open = false;
            $goto("/");
        }, (er) => {
            error = er
            loading = false
        })
    }
</script>

<Dialog
        aria-describedby="over-fullscreen-content"
        aria-labelledby="over-fullscreen-title"
        bind:open={open}
        fullscreen
>
    <Header>
        <Title id="over-fullscreen-title">Login</Title>
        <IconButton action="close" class="material-icons">close</IconButton>
    </Header>
    <Content id="over-fullscreen-content">
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
        </form>

    </Content>
    <Actions>
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
    </Actions>
</Dialog>