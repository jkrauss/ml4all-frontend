<script>
	import ReportProblem from "./../Modal/ReportProblem.svelte";
	import { modal, user, userSettings, userSettingsInit } from "../stores.js";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
	import Img from "@smui/common/Img.svelte";
	import { Icon } from "@smui/button";
	import Menu from "../components/Menu.svelte";
	import Login from "../auth/login.svelte";
	import Wrapper from "@smui/tooltip/Wrapper.svelte";
	import Tooltip from "@smui/tooltip/Tooltip.svelte";
	import { goto, redirect } from "@roxi/routify";

	let menu;
	let burger;
	let width;
	let menuToggle = false;
	function auth() {
		if ($user && Object.keys($user).length) {
			//localStorage.removeItem("auth");
			//localStorage.removeItem("orderDataCache");
			localStorage.clear()
			$user = {};
			$userSettings = {};
			$userSettingsInit = {};
			
		} else {
			$modal.title = "Login";
			$modal.component = Login;
		}
		// after every login or logout set the main content to show the homepage
		$goto("/index");
	}
	function reportProblem() {
		$modal.title = "Idee oder Problem melden";
		$modal.component = ReportProblem;
	}
</script>

<svelte:window bind:outerWidth={width} />

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
						{$userSettings?.username || "DEMO"}
					</div>
				</Wrapper>
				<Wrapper>
					<IconButton class="material-icons" on:click={auth}
						>{#if $user && Object.keys($user).length}logout{:else}login{/if}
					</IconButton>
					<Tooltip
						>{#if $user && Object.keys($user).length}Logout{:else}Login{/if}</Tooltip
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
						class="material-icons"
						on:click={() => (menuToggle = !menuToggle)}
						bind:id={burger}
						>menu
					</IconButton>
					<Menu bind:menuToggle>
						<li on:click={auth} class="cursor-pointer p-2">
							{#if $user && Object.keys($user).length}Logout{:else}Login{/if}
						</li>
					{#if $user && Object.keys($user).length}
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
