<script>
	import axios from "axios";
	import { search } from "ss-search";
	import Textfield from "@smui/textfield";
	import { user, backendURL, userSettings } from "../components/stores.js";
	import { writable } from "svelte/store";
	import Paper, { Title, Content } from "@smui/paper";
	// Send Order / "Bestellen" - button
	import Button, { Group, GroupItem, Label, Icon } from "@smui/button";
	import Menu from "@smui/menu";
	import List, { Item, Separator, Text } from "@smui/list";
	import { beforeUpdate, onMount } from "svelte";

	let orderMenu;

	async function order(option) {
		//console.log(option);
		//console.log(`${backendURL}${$userSettings.order_url}`);
		let orderUrl = `${backendURL}${$userSettings.order_url}`;
		let resType;
		let filename = `Foodsight_Bestellung.${option}`;
		// depending on option (csv or ecel for now) request different type of content
		if (option === "xlsx") {
			resType = "arraybuffer";
		} else if (option === "csv") {
			resType = "text";
		}
		// depending on what kind of forecast / order-planning is currently being done request differrent numbers
		let orderOption;
		if ($userSettings?.tomorrow) {
			orderOption = "tomorrow";
		} else if ($userSettings?.day_after_tomorrow) {
			orderOption = "day_after_tomorrow";
		} else if ($userSettings?.next_seven_days) {
			orderOption = "next_seven_days";
		}
		axios({
			url: orderUrl,
			method: "POST",
			responseType: resType, // important, 'blob' for excel and pdf I assume
			data: { option: option, order_option: orderOption, data: $data }, // TODO: FIXME: currently only the originally retrieved data is posted back, but should be the user-modified data
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
		});
	}

	//import HelperText from '@smui/textfield/helper-text/index';
	// intitial variable declaration

	let data = writable(
			localStorage.getItem("orderDataCache")
				? JSON.parse(localStorage.getItem("orderDataCache"))
				: []
		), //raw json data from source
		keys = writable([]), //all data keys in json objects in data
		blacklist = [], // colum blacklist
		blacklistFilter = [],
		labels = [
			{ key: "id", text: "ID" },
			{ key: "product", text: "Produkt" },
			{ key: "tomorrow_order_range", text: "Vorschlag Morgen" },
			{ key: "tomorrow_order_qty", text: "Bestellung Morgen" },
			{ key: "day_after_order_range", text: "Vorschlag Übermorgen" },
			{ key: "day_after_order_qty", text: "Bestellung Übermorgen" },
			{ key: "next7_order_range", text: "Vorschlag Woche" },
			{ key: "next7_order_qty", text: "Bestellung Woche" },
		], // coustom labels for colums filterd by colum key
		dataTypes = [
			{ key: "day_after_order_qty", type: "number" },
			{ key: "tomorrow_order_qty", type: "number" },
			{ key: "next7_order_qty", type: "number" },
		], // check if colum has a special type / is number input filterd by key
		pageLength = $userSettings?.rows_per_page || 10, // pagination page length can be coustomized
		currentPage = 1, // current Page from pagination
		searchInput, // data in the search Field / search text
		displayData, // sorted and filtered data
		searchKeys = ["id", "product"], // keys the search should use
		searchResults, // temporary search results (only temp var)
		sortBy = { col: "id", ascending: true }, // basic sorting data col = key sorted by params
		width, // width of the window;
		styling = {
			all: { bg: "", text: "" }, // overwirtes even and odd
			even: {
				bg: "var(--mdc-theme-2nd-background)",
				text: "var(--mdc-theme-text-primary-on-background)",
			}, //defines colors for even rows
			odd: {
				bg: "var(--mdc-theme-background)",
				text: "var(--mdc-theme-text-primary-on-background)",
			}, // var(--VARNAME) can be used to use the vars from foodsight.css
			head: {
				bg: "var(--mdc-theme-primary)",
				text: "var(--mdc-theme-on-primary)",
			}, // var(--VARNAME) can be used to use the vars from foodsight.css
		}; // a bit less horrible styling ;)

	// geting data from backend / .json file
	async function getData() {
		// if (typeof window === "undefined") return;
		// //dont ask why it works it works

		console.log(
			JSON.stringify(JSON.parse(localStorage.getItem("orderCacheUser"))),
			JSON.stringify($user),
			JSON.stringify(
				JSON.parse(localStorage.getItem("orderCacheUser"))
			) === JSON.stringify($user)
		);
		if (
			JSON.stringify(
				JSON.parse(localStorage.getItem("orderCacheUser"))
			) === JSON.stringify($user)
		)
			return;

		if (!$userSettings || !Object.keys($userSettings).length) return;

		//determine where to get data - local demo or remote with token
		let dataUrl;

		if ($user && Object.keys($user).length) {
			dataUrl = `${backendURL}${$userSettings.forecast_url}/?store=${$userSettings.store}`;
		} else {
			//use for demo-mode
			dataUrl = `tableDataStore${$userSettings.store}.json`;
		}

		//actually retrieve data
		let request = await axios.get(dataUrl);
		$data = request.data;
	}

	// geting the keys from json objects in data (raw)
	function getKeys() {
		let keys = [];
		$data.forEach((val) => {
			Object.keys(val).forEach((ob) => {
				if (!keys.includes(ob)) {
					keys.push(ob);
				}
			});
		});
		return keys;
	}

	//search if the search field is changed so it live reloads (svelte:use)
	function searchF(node, searchInput) {
		return {
			update(searchInput) {
				// the value of `bar` has changed
				searchResults = search($data, searchKeys, searchInput);
			},

			destroy() {
				// the node has been removed from the DOM
			},
		};
	}

	// runs if data in the function changes so resizing is dynamic and the displayed data is the searched data
	$: {
		displayData = searchResults ? searchResults : $data;

		if (width < 800) {
			blacklist = [
				...blacklist,
				"next7_order_qty",
				"next7_order_range",
				"day_after_order_range",
				"tomorrow_order_range",
			];
		} else {
			blacklist = blacklist.filter(
				(item) =>
					![
						"next7_order_qty",
						"next7_order_range",
						"day_after_order_range",
						"tomorrow_order_range",
					].includes(item)
			);
			if ($userSettings?.next_seven_days) {
				blacklistFilter = [
					...blacklistFilter,
					"next7_order_range",
					"next7_order_qty",
				];
			} else {
				blacklist = [
					...blacklist,
					"next7_order_range",
					"next7_order_qty",
				];
			}
			if ($userSettings?.tomorrow) {
				blacklistFilter = [
					...blacklistFilter,
					"tomorrow_order_range",
					"tomorrow_order_qty",
				];
			} else {
				blacklist = [
					...blacklist,
					"tomorrow_order_range",
					"tomorrow_order_qty",
				];
			}
			if ($userSettings?.day_after_tomorrow) {
				blacklistFilter = [
					...blacklistFilter,
					"day_after_order_range",
					"day_after_order_qty",
				];
			} else {
				blacklist = [
					...blacklist,
					"day_after_order_range",
					"day_after_order_qty",
				];
			}
			blacklist = blacklist.filter(
				(item) => !blacklistFilter.includes(item)
			);
		}

		if (styling.all.bg) {
			styling.even.bg = styling.all.bg;
			styling.odd.bg = styling.all.bg;
		}
		if (styling.all.text) {
			styling.even.text = styling.all.text;
			styling.odd.text = styling.all.text;
		}
	}

	// sorting stuff based on the sortBy var
	$: sort = (column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column]
				? -1 * sortModifier
				: a[column] > b[column]
				? 1 * sortModifier
				: 0;

		displayData = displayData.sort(sort);
	};

	user.subscribe(() => {
		getData();
	});

	onMount(() => {
		getData();
	});

	data.subscribe((val) => {
		$keys = getKeys();
	});

	//saving data in localstorage with current user so if the user changes the data can get fetched if user is the same the same data will be used could be done with date to check isf the date changes.
	beforeUpdate(() => {
		localStorage.setItem("orderDataCache", JSON.stringify($data));
		localStorage.setItem("orderCacheUser", JSON.stringify($user));
	});
</script>

<!-- Getting window width -->
<svelte:window bind:outerWidth={width} />

<section
	class="flex flex-col gap-4 justify-center items-center md:w-10/12 w-full mx-auto"
>
	<Paper elevation={1}>
		<Title><h1 class="text-2xl my-6">Vorhersage und Planung</h1></Title>
		<Content>
			<div class="flex flex-col gap-4">
				<!-- complete foodtable -->
				<!-- Search input field -->
				<input
					type="text"
					bind:value={searchInput}
					placeholder="Suche..."
					class="p-2 rounded-md w-full"
					use:searchF={searchInput}
				/>
				<!-- table itself defined in Datatable.svelte could be changed so its one file. exists because original plan was diferent -->
				<table class="w-full">
					<!-- Table header  -->
					<thead class="border-b border-black">
						<!-- checks every key in keys -->
						{#each $keys as key}
							<!-- checks if its blacklisted thus not displayed -->
							{#if !blacklist.includes(key)}
								<!-- th with onclick sort -->
								<th
									on:click={sort(key)}
									class=""
									style={`background: ${styling.head.bg};
							color:${styling.head.text};`}
								>
									<!-- div relative because arrow drop up from material ui are absolute relative to this div -->
									<div
										class="relative h-10 flex justify-center items-center"
									>
										<!-- check if column is renamed else key is displayed -->
										{labels.find((item) => item.key === key)
											?.text || key}
										<!-- sorting arrows each is checking if ith activated or not and styled acordingly -->
										<div
											class="absolute -right-1 top-0 bottom-0"
										>
											<span
												class={`material-icons absolute right-0 top-0 `}
												class:text-gray-200={sortBy.col ==
													key && !sortBy.ascending}
												class:text-gray-500={sortBy.col !=
													key || sortBy.ascending}
											>
												arrow_drop_up
											</span>
											<span
												class="material-icons absolute right-0 bottom-0"
												class:text-gray-200={sortBy.col ==
													key && sortBy.ascending}
												class:text-gray-500={sortBy.col !=
													key || !sortBy.ascending}
											>
												arrow_drop_down
											</span>
										</div>
									</div>
								</th>
							{/if}
						{/each}
					</thead>
					<tbody>
						<!-- table body in default slot every json object in filterd and sorted array is displayed, index is defined to check pagination  -->
						{#each displayData as dataRow, i}
							<!-- check if item is displayed on curent page -->
							{#if i < pageLength * currentPage && i >= pageLength * (currentPage - 1)}
								<!-- creating new row -->
								<tr
									style={`background: ${
										i % 2
											? styling.even?.bg
											: styling.odd?.bg
									};
						color:${i % 2 ? styling.even?.text : styling.odd?.text};
						`}
								>
									<!-- getting keys from json object -->
									{#each Object.keys(dataRow) as key}
										<!-- checking if key is blacklisted -->
										{#if !blacklist.includes(key)}
											<!-- creating cell -->
											<td>
												<!-- checking if dataType is special can be edited to display difrent datatypes-->
												{#if dataTypes.find((item) => item.key === key)}
													{#if dataTypes.find((item) => item.key === key).type == "number"}
														<!-- displaying number datatypes as input field 
											<input
												type="number"
												bind:value={dataRow[key]}
												class="min-w-24 w-24"
											/> -->
														<Textfield
															class="shaped-outlined"
															variant="outlined"
															type="number"
															bind:value={dataRow[
																key
															]}
														/>
													{/if}
												{:else}
													<!-- just displying data -->
													{dataRow[key]}
												{/if}
											</td>
										{/if}
									{/each}
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
				<!-- pagination stuff -->
				<div class="w-full flex">
					<!-- container to make it align right -->
					<div class="ml-auto rounded-lg overflow-hidden flex ">
						<!-- checking if page is first page and if not diplaying previous page button -->
						{#if currentPage > 1}
							<div
								style="background: {'var(--mdc-theme-primary)'}"
								class="px-4 py-2 h-full m-0 text-white"
								on:click={() => {
									currentPage--;
								}}
							>
								<span class="material-icons text-sm">
									arrow_back_ios_new
								</span>
							</div>
						{/if}
						<!-- checking and displaying previous page with number -->
						{#if currentPage - 1 > 0}
							<div
								style="background: {'var(--mdc-theme-primary)'}"
								class="px-4 py-2 m-0 h-full text-white"
								on:click={() => {
									currentPage = currentPage - 1;
								}}
							>
								{currentPage - 1}
							</div>
						{/if}
						<!-- curent pagenumber -->
						<div
							class="px-4 py-2 m-0 h-full text-white"
							style="background: {'var(--mdc-theme-primary)'}"
						>
							{currentPage}
						</div>
						<!-- next pagenumber -->
						{#if currentPage + 1 <= Math.floor(displayData.length / pageLength) + 1}
							<div
								style="background: {'var(--mdc-theme-primary)'}"
								class="px-4 py-2 m-0 h-full text-white"
								on:click={() => {
									currentPage = currentPage + 1;
								}}
							>
								{currentPage + 1}
							</div>
						{/if}
						<!-- next button -->
						{#if displayData.length > pageLength * currentPage}
							<div
								style="background: {'var(--mdc-theme-primary)'}"
								class="px-4 py-2 m-0 h-full text-white"
								on:click={() => {
									currentPage++;
								}}
							>
								<span class="material-icons m-0 p-0 text-sm">
									arrow_forward_ios
								</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<!-- Send Order / "Bestellen" - button -->
			<div class="w-full flex">
				<Group variant="raised">
					<Button
						on:click={() => order("xlsx")}
						variant="raised"
						style="background: {'var(--mdc-theme-callout)'}"
					>
						<Label>Bestellung abschliessen</Label>
					</Button>
					<div use:GroupItem>
						<Button
							on:click={() => orderMenu.setOpen(true)}
							variant="raised"
							style="padding: 0; min-width: 36px; background: {'var(--mdc-theme-callout)'}"
						>
							<Icon class="material-icons" style="margin: 0;"
								>arrow_drop_down</Icon
							>
						</Button>
						<Menu bind:this={orderMenu} anchorCorner="TOP_LEFT">
							<List>
								<!--
					  <Item on:SMUI:action={()=>order("pdf")}>
					  <Text>pdf</Text>
					  </Item>
					  <Separator />
					-->
								<Item on:SMUI:action={() => order("xlsx")}>
									<Text>excel</Text>
								</Item>
								<Item on:SMUI:action={() => order("csv")}>
									<Text>csv</Text>
								</Item>
							</List>
						</Menu>
					</div>
				</Group>
			</div>
		</Content>
	</Paper>
</section>

<!-- some styling -->
<style>
	th,
	td {
		@apply text-center;
		width: 20000px;
	}
	input {
		@apply py-2;
		@apply px-4;
		@apply rounded;
	}
</style>
