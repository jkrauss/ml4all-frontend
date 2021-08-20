<script>
	import ReportProblem from "./../Modals/ReportProblem.svelte";
	import { modal, user, mainContent, userSettings } from "../stores.js";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
	import Img from "@smui/common/Img.svelte";
	import Button, { Icon } from "@smui/button";
	import Menu from "../components/Menu.svelte";
	import List, { Item, Separator, Text } from "@smui/list";
	import Login from "../auth/login.svelte";
	import Wrapper from "@smui/tooltip/Wrapper.svelte";
	import Tooltip from "@smui/tooltip/Tooltip.svelte";

	let menu;
	let burger;
	let width;
	let menuToggle = false;
	function auth() {
		if ($user && Object.keys($user).length) {
			localStorage.removeItem("auth");
			$user = {};
		} else {
			$modal.title = "Login";
			$modal.component = Login;
		}
		// after every login or logout set the main content to show the table
		// "https://raw.githubusercontent.com/hperrin/svelte-material-ui/master/site/static/logo.png"
		$mainContent = "table";
	}
	function settings() {
		$mainContent = "settings";
	}
	function intro() {
		$mainContent = "intro";
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
			<Section
				on:click={() => ($mainContent = "table")}
			>
				<Wrapper>
					<Icon
						component={Img}
						style="height: 48px; width: 48px;"
						src="logo.png"
						class="cursor-pointer p-2"
					/>
					<Title class="cursor-pointer p-2">foodsight</Title>
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
						mail
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
						<li on:click={intro} class="cursor-pointer p-2">
							Los gehts
						</li>
						<li
							on:click={() => {
								$mainContent = "";
							}}
							class="cursor-pointer p-2"
						>
							Planung
						</li>
						<li on:click={settings} class="cursor-pointer p-2">
							Einstellungen
						</li>
						<li on:click={reportProblem} class="cursor-pointer p-2">
							Idee/Problem
						</li>
					</Menu>
				</div>
			</Section>
		</Row>
	</TopAppBar>
</header>
