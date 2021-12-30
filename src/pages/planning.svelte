<script>
	import axios from "axios";
	import Paper, { Title, Content } from "@smui/paper";
	import { user, userSettings, backendURL } from "../components/stores";
	import Menu from "@smui/menu";
	import Button, { Group, GroupItem, Label, Icon } from "@smui/button";
	import List, { Item, Text } from "@smui/list";
	import { search } from "ss-search";
	import { blur, fade } from "svelte/transition";
	import Textfield from "@smui/textfield/Textfield.svelte";

	let data = { body: [], head: [] };
	let orderMenu;
	let searchInputText;
	let tableWhitelist = ["id", "product"]; // whitelist for table columns
	let labels = [
		{ key: "id", text: "ID" },
		{ key: "product", text: "Produkt" },
		{ key: "tomorrow_order_range", text: "Vorschlag Morgen" },
		{ key: "tomorrow_order_qty", text: "Bestellung Morgen" },
		{ key: "day_after_order_range", text: "Vorschlag Übermorgen" },
		{ key: "day_after_order_qty", text: "Bestellung Übermorgen" },
		{ key: "next7_order_range", text: "Vorschlag Woche" },
		{ key: "next7_order_qty", text: "Bestellung Woche" },
	]; // labels for the table columns
	let dataTypes = [
		{ key: "day_after_order_qty", type: "number" },
		{ key: "tomorrow_order_qty", type: "number" },
		{ key: "next7_order_qty", type: "number" },
	]; // deffines spection data types/input types
	let dataPromise = new Promise(() => {}); // empty Promise will change on dependency change/ on Mount
	let sortBy = { col: "id", ascending: true }; //sorting stuff
	let currentPage = 1;

	let section;

	// Submiting the Order
	async function order(option, data) {
		let orderUrl = `${backendURL}/api/order`;
		let resType;
		let filename = `Foodsight_Bestellung.${option}`;

		//setting type of returned file
		if (option === "xlsx") {
			resType = "arraybuffer";
		} else if (option === "csv") {
			resType = "text";
		}

		// setting order options
		let orderOption;
		if ($userSettings?.tomorrow) {
			orderOption = "tomorrow";
		} else if ($userSettings?.day_after_tomorrow) {
			orderOption = "day_after_tomorrow";
		} else if ($userSettings?.next_seven_days) {
			orderOption = "next_seven_days";
		}

		// getting file and open download link/ download item
		axios({
			url: orderUrl,
			method: "POST",
			responseType: resType,
			data: { option: option, order_option: orderOption, data: data },
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
		});
	}

	// changes the returned data from dataPromise into data var because otherwise bindings wouldnt work.
	function dataChanger(node, returnVal) {
		data = returnVal;
	}

	// caching data on change
	function autoCache(node, data) {
		return {
			update(data) {
				if (!Object.keys($userSettings)) return;
				let dataUrl;
				if ($user && Object.keys($user).length) {
					dataUrl = `${backendURL}/api/forecast/?store=${$userSettings.store}`;
				} else {
					dataUrl = `tableDataStore${$userSettings.store}.json`;
				}

				localStorage.setItem(
					dataUrl,
					JSON.stringify({
						user: $user,
						data: data,
					})
				);
			},
		};
	}

	//getting PageLength
	$: pageLength = $userSettings?.rows_per_page || 10;

	//setting dataPromise on dependencie change. gets cached data if it exists otherwise gets the data from the endpoint.
	$: dataPromise = new Promise(async (res, rej) => {
		if (
			!$userSettings ||
			!Object.keys($userSettings).length ||
			!$userSettings.store
		) {
			rej("userSettings Not Defined");
			return;
		}
		let dataUrl;
		let keys = [];

		try {
			if ($user && Object.keys($user).length) {
				dataUrl = `${backendURL}/api/forecast/?store=${$userSettings.store}`;
			} else {
				dataUrl = `tableDataStore${$userSettings.store}.json`;
			}
			let result;
			if (
				localStorage.getItem(dataUrl) &&
				JSON.stringify(
					JSON.parse(localStorage.getItem(dataUrl)).user
				) === JSON.stringify($user) &&
				new Date(
					JSON.parse(localStorage.getItem(dataUrl)).data.timestamp
				).getUTCDate() === new Date().getUTCDate()
			) {
				let searchedData = search(
					JSON.parse(localStorage.getItem(dataUrl)).data.body,
					["id", "product"],
					searchInputText
				);
				res({
					body: searchedData,
					head: JSON.parse(localStorage.getItem(dataUrl)).data.head,
					timestamp: JSON.parse(localStorage.getItem(dataUrl)).data
						.timestamp,
				});
			} else {
				result = await axios.get(dataUrl);

				result.data.forEach((val) => {
					Object.keys(val).forEach((ob) => {
						if (!keys.includes(ob)) {
							keys.push(ob);
						}
					});
				});
				localStorage.setItem(
					dataUrl,
					JSON.stringify({
						user: $user,
						data: {
							body: result.data,
							head: keys,
							timestamp: Date.now(),
						},
					})
				);
				let cachedStores =
					JSON.parse(localStorage.getItem("cachedStores")) || [];
				localStorage.setItem(
					"cachedStores",
					JSON.stringify([...cachedStores, dataUrl])
				);
				let searchedData = search(
					result.data,
					["id", "product"],
					searchInputText
				);
				res({ body: searchedData, head: keys, timestamp: Date.now() });
			}
		} catch (er) {
			console.log(er);
		}
	});

	// checks if the chached stores are assosiated with the current user and if there are no duplicates
	$: {
		let cachedStores =
			JSON.parse(localStorage.getItem("cachedStores")) || [];
		if (cachedStores.length) {
			cachedStores.forEach((key) => {
				let item = JSON.parse(localStorage.getItem(key));
				if (JSON.stringify(item?.user) != JSON.stringify($user)) {
					localStorage.removeItem(key);
					cachedStores = cachedStores.filter((item) => {
						return item != key;
					});
				}
			});
			localStorage.setItem(
				"cachedStores",
				JSON.stringify([...new Set(cachedStores)])
			);
		}
	}

	// setting the whitelist acording to the settings
	$: if ($userSettings?.next_seven_days) {
		tableWhitelist = [
			...tableWhitelist,
			"next7_order_range",
			"next7_order_qty",
		];
	} else {
		tableWhitelist.filter(
			(item) => !["next7_order_range", "next7_order_qty"].includes(item)
		);
	}
	$: if ($userSettings?.day_after_tomorrow) {
		tableWhitelist = [
			...tableWhitelist,
			"day_after_order_range",
			"day_after_order_qty",
		];
	} else {
		tableWhitelist.filter(
			(item) =>
				!["day_after_order_range", "day_after_order_qty"].includes(item)
		);
	}
	$: if ($userSettings?.tomorrow) {
		tableWhitelist = [
			...tableWhitelist,
			"tomorrow_order_range",
			"tomorrow_order_qty",
		];
	} else {
		tableWhitelist.filter(
			(item) =>
				!["tomorrow_order_range", "tomorrow_order_qty"].includes(item)
		);
	}

	//soring the data acording to the parameters
	$: sort = (data, column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}
		let sortModifier = sortBy.ascending ? 1 : -1;
		let sort = (a, b) =>
			a[column] < b[column]
				? -1 * sortModifier
				: a[column] > b[column]
				? 1 * sortModifier
				: 0;
		return data.sort(sort);
	};
</script>

<section class="flex flex-col gap-4 md:w-10/12 w-full mx-auto">
	<Paper elevation={1}>
		<Title><h1 class="text-2xl my-6">Vorhersage und Planung</h1></Title>
		<Content>
			<div class="flex flex-col gap-4 w-full">
				<input
					type="text"
					bind:value={searchInputText}
					placeholder="Suche..."
					class="p-2 rounded-md w-full"
				/>
				<!-- getting the data -->
				{#await dataPromise}
					<!-- on load -->
					<div
						class="w-full flex flex-col justify-center items-center h-96"
					>
						<span class="material-icons animate-spin">
							autorenew
						</span> Loading
					</div>
				{:then returnVal}
					<!-- getting the data and caching it -->
					<div use:dataChanger={returnVal} use:autoCache={data} />

					<!-- checks if data is defined -->
					{#if Object.keys(data).length}
						<section
							class="overflow-y-auto p-2"
							bind:this={section}
						>
							<table class="w-full" in:blur>
								<!-- table header -->
								<thead class="border-b border-black">
									{#each data.head as col}
										{#if tableWhitelist.includes(col)}
											<th
												on:click={() => {
													data.body = sort(
														data.body,
														col
													);
												}}
												style="background: var(--table-head-bg); color: var(--table-head-color)"
											>
												<div
													class="relative h-10 flex justify-center items-center px-[1.25rem] whitespace-nowrap"
												>
													{labels.find(
														(item) =>
															item.key === col
													)?.text || col}
													<div
														class="absolute -right-1 top-0 bottom-0"
													>
														<span
															class={`material-icons absolute right-0 top-0 `}
															class:text-gray-200={sortBy.col ==
																col &&
																!sortBy.ascending}
															class:text-gray-500={sortBy.col !=
																col ||
																sortBy.ascending}
														>
															arrow_drop_up
														</span>
														<span
															class="material-icons absolute right-0 bottom-0"
															class:text-gray-200={sortBy.col ==
																col &&
																sortBy.ascending}
															class:text-gray-500={sortBy.col !=
																col ||
																!sortBy.ascending}
														>
															arrow_drop_down
														</span>
													</div>
												</div>
											</th>
										{/if}
									{/each}
								</thead>

								<!-- table body -->
								<tbody>
									{#each data.body as item, i}
										<!-- checks if item is on the page -->
										{#if i < pageLength * currentPage && i >= pageLength * (currentPage - 1)}
											<tr
												style={`background: ${
													i % 2
														? "var(--table-body-odd-bg)"
														: "var(--table-body-even-bg)"
												};
									color: ${
										i % 2
											? "var(--table-body-odd-color)"
											: "var(--table-body-even-color)"
									}`}
											>
												{#each Object.keys(item) as field}
													<!-- checks if field is whitelisted -->
													{#if tableWhitelist.includes(field)}
														<td
															class="whitespace-nowrap"
														>
															<!-- checking if dataType is special can be edited to display difrent datatypes-->

															{#if dataTypes.find((item) => item.key === field)}
																{#if dataTypes.find((item) => item.key === field).type == "number"}
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
																		bind:value={item[
																			field
																		]}
																	/>
																{/if}
															{:else}
																<!-- just displying data -->
																{item[field]}
															{/if}</td
														>
													{/if}
												{/each}
											</tr>
										{/if}
									{:else}
										<!-- Promise Fallback -->
										<div class="h-96 relative">
											<div
												class="absolute top-0 left-0 -right-full bottom-0 flex justify-center items-center"
											>
												Keine Daten zum Suchbegriff "{searchInputText}"
												gefunden
											</div>
										</div>
									{/each}
								</tbody>
							</table>
						</section>
						<div
							class="w-full flex flex-col md:flex-row gap-2"
							in:fade
						>
							<!-- export stuff-->
							<Group>
								<Button
									on:click={() => order("xlsx", data.body)}
									variant="raised"
									style="background: {'var(--mdc-theme-callout)'}"
									class="whitespace-nowrap"
								>
									<Label>Bestellung abschliessen</Label>
								</Button>
								<div use:GroupItem>
									<Button
										on:click={() => orderMenu.setOpen(true)}
										variant="raised"
										style="padding: 0; min-width: 36px; background: {'var(--mdc-theme-callout)'}"
									>
										<Icon
											class="material-icons"
											style="margin: 0;"
											>arrow_drop_down</Icon
										>
									</Button>
									<Menu
										bind:this={orderMenu}
										anchorCorner="TOP_LEFT"
									>
										<List>
											<Item
												on:SMUI:action={() =>
													order("xlsx", data.body)}
											>
												<Text>excel</Text>
											</Item>
											<Item
												on:SMUI:action={() =>
													order("csv", data.body)}
											>
												<Text>csv</Text>
											</Item>
										</List>
									</Menu>
								</div>
							</Group>
							<!-- pagination stuff -->
							<div class="md:ml-auto ">
								<Group variant="raised">
									{#if currentPage > 1}
										<Button
											on:click={() => currentPage--}
											variant="raised"
										>
											<Label
												><span
													class="material-icons text-sm"
												>
													arrow_back_ios_new
												</span></Label
											>
										</Button>
									{/if}
									{#if currentPage - 1 > 0}
										<Button
											on:click={() =>
												(currentPage = currentPage - 1)}
											variant="raised"
										>
											<Label>{currentPage - 1}</Label>
										</Button>
									{/if}

									<Button
										on:click={() => {}}
										variant="raised"
									>
										<Label>{currentPage}</Label>
									</Button>
									{#if currentPage + 1 <= Math.floor(data.body.length / pageLength) + 1}
										<Button
											on:click={() => {
												currentPage = currentPage + 1;
											}}
											variant="raised"
										>
											<Label>{currentPage + 1}</Label>
										</Button>
									{/if}
									{#if data.body.length > pageLength * currentPage}<Button
											on:click={() => {
												currentPage++;
											}}
											variant="raised"
										>
											<Label
												><span
													class="material-icons p-0 text-sm flex justify-center item"
												>
													arrow_forward_ios
												</span></Label
											>
										</Button>{/if}
								</Group>
							</div>
						</div>
					{/if}
				{:catch error}{error}{/await}
			</div>
		</Content>
	</Paper>
</section>

<style global>
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
	:root {
		--table-head-bg: var(--mdc-theme-primary);
		--table-head-color: var(--mdc-theme-on-primary);
		--table-body-odd-bg: var(--mdc-theme-background);
		--table-body-odd-color: var(--mdc-theme-text-primary-on-background);
		--table-body-even-bg: var(--mdc-theme-2nd-background);
		--table-body-even-color: var(--mdc-theme-text-primary-on-background);
	}
</style>
