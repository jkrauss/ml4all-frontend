<script>
    import ReportProblem from "./../Modal/ReportProblem.svelte";
    import LoginModal from "../auth/loginModal.svelte";
    //import { modal, user, userSettings, userSettingsInit } from "../stores.js";
    import {modal} from "../stores.js";
    import TopAppBar, {Row, Section, Title} from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Img from "@smui/common/Img.svelte";
    import {Icon} from "@smui/button";
    import Menu from "../components/Menu.svelte";
    import Wrapper from "@smui/tooltip/Wrapper.svelte";
    import Tooltip from "@smui/tooltip/Tooltip.svelte";
    import {goto} from "@roxi/routify";
    import {Auth, loginStatus, User} from "../auth/userStores";

    let loginToggle = false;
    let menu;
    let burger;
    let width;
    let menuToggle = false;

    function auth() {
        if ($loginStatus) {
            Auth.signout();
            $goto("/signup")
        } else {
            loginToggle = !loginToggle;
        }
    }

    function reportProblem() {
        $modal.title = "Idee oder Problem melden";
        $modal.component = ReportProblem;
    }
</script>

<LoginModal bind:open={loginToggle}/>

<svelte:window bind:outerWidth={width}/>

<header>
    <TopAppBar variant="static">
        <Row>
            <Section on:click={() => $goto("/")}>
                <Wrapper>
                    <Title class="cursor-pointer p-2">
                        <Icon
                                component={Img}
                                src="/logo_pretzel.png"
                                style="width:180px;"
                        />
                    </Title>
                    <Tooltip>Planung</Tooltip>
                </Wrapper>
            </Section>
            <Section align="end">
                <Wrapper>
                    <div class="sm:flex hidden">
                        {$User?.username || "DEMO"}
                    </div>
                </Wrapper>
                <Wrapper>
                    <IconButton class="material-icons" on:click={auth}
                    >
                        {#if $loginStatus}logout{:else}login{/if}
                    </IconButton>
                    <Tooltip
                    >
                        {#if $loginStatus}Logout{:else}Login{/if}
                    </Tooltip
                    >
                </Wrapper>
                <Wrapper>
                    <IconButton class="material-icons" on:click={reportProblem}>
                        feedback
                    </IconButton>
                    <Tooltip>Idee oder Problem</Tooltip>
                </Wrapper>
                <!-- wrapper to keep menu in place -->
                <div class="relative">
                    <IconButton
                            bind:id={burger}
                            class="material-icons"
                            on:click={() => (menuToggle = !menuToggle)}
                    >menu
                    </IconButton>
                    <Menu bind:menuToggle>
                        <li class="cursor-pointer p-2" on:click={auth}>
                            {#if $loginStatus}Logout{:else}Login{/if}
                        </li>
                        {#if $loginStatus}
                            <li
                                    on:click={() => $goto("/help")}
                                    class="cursor-pointer p-2"
                            >
                                Hilfe
                            </li>
                            <li
                                    on:click={() => {
							$goto("/");
						}}
                                    class="cursor-pointer p-2"
                            >
                                Planung
                            </li>
                            <li
                                    on:click={() => {
							$goto("/settings");
						}}
                                    class="cursor-pointer p-2"
                            >
                                Einstellungen
                            </li>
                        {/if}
                    </Menu>
                </div>
            </Section>
        </Row>
    </TopAppBar>
</header>