<script>
	import ReportProblem from "./../Modals/ReportProblem.svelte";
	import { modal, user, mainContent, userSettings } from "../stores.js";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
	import Img from "@smui/common/Img.svelte";
	import Button, { Icon } from "@smui/button";
	import Menu from "@smui/menu";
	import List, { Item, Separator, Text } from "@smui/list";
	import Login from "../auth/login.svelte";
	import Wrapper from "@smui/tooltip/Wrapper.svelte";
	import Tooltip from "@smui/tooltip/Tooltip.svelte";

	let menu;
	let burger;
	let width;

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
		menu.setOpen(false);
		$mainContent = "settings";
	}
	function reportProblem() {
		$modal.title = "Problem Melden";
		$modal.component = ReportProblem;
	}
</script>

<svelte:window bind:outerWidth={width} />

<header>
	<TopAppBar variant="static">
		<Row>
			<Section
				on:click={() => ($mainContent = "table")}
				class="cursor-pointer"
			>
				<Wrapper>
					<Icon
						component={Img}
						style="height: 48px; width: 48px;"
						src="logo.png"
					/>
					<Title>ml4all</Title>
					<Tooltip>Hauptseite</Tooltip>
				</Wrapper>
			</Section>
			<Section align="end">
				<Wrapper>
					<IconButton class="material-icons" on:click={reportProblem}>
						report_problem
					</IconButton>
					<Tooltip>Report Problem</Tooltip>
				</Wrapper>

				<div class="sm:flex hidden">
					{$userSettings?.username || "DEMO"}
				</div>

				<Wrapper>
					<IconButton class="material-icons" on:click={auth}
						>{#if $user && Object.keys($user).length}logout{:else}login{/if}
						<!--
						form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
					-->
					</IconButton>
					<Tooltip
						>{#if $user && Object.keys($user).length}Logout{:else}Login{/if}</Tooltip
					>
				</Wrapper>
				<IconButton
					class="material-icons"
					on:click={() => menu.setOpen(true)}
					bind:id={burger}
					>menu
					<Menu
						bind:this={menu}
						bind:anchorElement={burger}
						anchorCorner="TOP_RIGHT"
					>
						<List>
							<Item on:SMUI:action={auth}>
								<Text
									>{#if $user && Object.keys($user).length}Logout{:else}Login{/if}</Text
								>
								<!--
									form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
								-->
							</Item>
							<Item on:SMUI:action={settings}>
								<Text>Einstellungen</Text>
								<!--
									form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
								-->
							</Item>
						</List>
					</Menu>
				</IconButton>
			</Section>
		</Row>
	</TopAppBar>
</header>
