<script>
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from '@smui/icon-button';
	import Img from "@smui/common/Img.svelte";
	import Button, { Icon } from "@smui/button";
	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';

	import Foodtable from "./Foodtable.svelte";
	import Tailwind from "./Tailwind.svelte";

	let menu;
	let burger;
	let login = "Login";
	let clicked = 'nothing yet';
</script>

<Tailwind />

<header >
	<TopAppBar variant="static">
		<Row>
			<Section>
				<Icon
					component={Img}
					style="height: 48px; width: 48px;"
					src="https://raw.githubusercontent.com/hperrin/svelte-material-ui/master/site/static/logo.png"
				/>
				<Title>ml4all</Title>
			</Section>
			<Section align="end">
				<IconButton class="material-icons">account_circle
					<!--
						form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
					-->
				</IconButton>
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
							<Item on:SMUI:action={() => (clicked = 'Cut')}>
								<Text>{login}</Text>
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
<div class="p-2 h-full">
	<Foodtable />
</div>
<footer >Here goes the footer</footer>

<svelte:head>
	<!-- Fonts -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>

	<!-- Material Typography -->
	<link
		rel="stylesheet"
		href="https://unpkg.com/@material/typography@11.0.0/dist/mdc.typography.css"
	/>

	<!-- SMUI -->
	<link rel="stylesheet" href="foodsight.css" />
	<link rel="stylesheet" href="bare.css" />
</svelte:head>

<style>
	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	*
		:global(.shaped-outlined
			.mdc-notched-outline
			.mdc-notched-outline__leading) {
		border-radius: 28px 0 0 28px;
		width: 28px;
	}
	*
		:global(.shaped-outlined
			.mdc-notched-outline
			.mdc-notched-outline__trailing) {
		border-radius: 0 28px 28px 0;
	}
	*
		:global(.shaped-outlined
			.mdc-notched-outline
			.mdc-notched-outline__notch) {
		max-width: calc(100% - 28px * 2);
	}
	* :global(.shaped-outlined) {
		width: 100px;
		height: 35px;
	}
</style>
